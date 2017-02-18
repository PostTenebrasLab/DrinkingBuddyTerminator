#! /usr/bin/python3
# -*- coding: utf-8 -*-

#
#   Description : Server 
#
#
import json
import datetime
import time
import siphash
import binascii
import os
import sys
import datetime
from flask import Flask, request, jsonify, Response, g
from flask.ext.cors import CORS
from flask_restful import Resource, Api
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, joinedload, lazyload
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import class_mapper
from sqlalchemy.sql import func
from drinkingBuddyDB_declarative import Base, Category, Inventory, User, Transaction, TransactionSchema, Terminal, TerminalCategories, Card
from collections import OrderedDict
from random import randint
#from flask_simpleldap import LDAP
from pprint import pprint
#from flask.ext.basicauth import BasicAuth
from functools import wraps

__author__ = 'Sebastien Chassot'
__author_email__ = 'seba.ptl@sinux.net'

__version__ = "1.0.1"
__copyright__ = ""
__licence__ = "GPL"
__status__ = ""

key = b'0123456789ABCDEF'

engine = create_engine('sqlite://///home/pi/DrinkingBuddy/drinkingBuddy.db')

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()


app = Flask(__name__)

app.config['LDAP_BASE_DN'] = 'OU=users,dc=example,dc=org'
app.config['LDAP_USERNAME'] = 'CN=user,OU=Users,DC=example,DC=org'
app.config['LDAP_PASSWORD'] = 'password'

#ldap = LDAP(app)

def check_auth(username, password):
    return username == 'admin' and password == 'secret'

def authenticate():
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

app.debug = True


CORS(app)

api = Api(app)

@app.route("/music", methods=['GET'])
def music():
    if randint(0,9) == 0:
        print("OK")
    else:
        print("NOK")
    return randint(0,9).__str__()

@app.route("/sync", methods=['POST','GET'])
def sync():
    """ return drinks catalog


    :return: JSON request tous les capteurs de la classe
    """
    now = round(time.time())
    if request.method == "POST":
        dict_req = request.get_json(silent=True) #silent make get_json return None when no JSON is provided in POST
        if(dict_req is None):
            term_id = 0
        else:
            term_id = dict_req.get('terminal_id', 0)

    else:
        term_id = request.args.get('terminal_id', 0) 

    key = bytes(session.query(Terminal).filter(Terminal.id == term_id).one().key, 'utf-8')
    print(key)
    sip = siphash.SipHash_2_4(key)
#    sip = siphash.SipHash_2_4('0')

    elements = session.query(Inventory, Inventory.name, Inventory.price, Inventory.quantity, Inventory.id).filter(Inventory.quantity > 0).all()

    catalog = [{'name': e.name, 'price':e.price, 'quantity':e.quantity, 'id':e.id} for e in elements]
    response = {'header': "DrinkingBuddy", 'products': catalog,  'time': now}

    #hash_str = response['header'] + "".join(str(c) for c in catalog) + now.__str__()
    response['status'] = 0
    hash_str = response['header'] + now.__str__()
    print(hash_str)
    for c in hash_str:
        sip.update(binascii.a2b_qp(c))
    
    #reqHash = hex(sip.hash())[2:-1].upper()  #This change is not working on Coltello, but works on the RaspberryPi!!!
    reqHash = hex(sip.hash())[2:].upper()
    reqHash = reqHash.zfill(16)
   
    response['hash'] = reqHash
 
    print(response['hash'])
    
    return json.dumps(response)


@app.route("/buy", methods=['POST'])
def buy():
    """ buy request
    

    :return: JSON request tous les capteurs de la classe
    """
    nowDt = datetime.datetime.now()
    now = round(nowDt.timestamp())

    dict_req = request.get_json()

    term_id = dict_req.get('terminal_id', 0)
    key = bytes(session.query(Terminal).filter(Terminal.id == term_id).one().key, 'utf-8')

    sipout = siphash.SipHash_2_4(key)
    sipin = siphash.SipHash_2_4(key)

    badge = dict_req['badge']
    time_req = dict_req['time']
    print("Buying with Badge: " + badge)

    #hash_verif = badge + str(product) + str(time_req)
    hash_verif = badge +  str(time_req)
    for c in hash_verif:
        sipin.update(binascii.a2b_qp(c))

    #reqHash = hex(sipin.hash())[2:-1].upper();  #This change not working on coltello, works on raspberry
    reqHash = hex(sipin.hash())[2:].upper();
    reqHash = reqHash.zfill(16)

    if dict_req['hash'] == reqHash:
        print("Cool hash's OK")
    else:
        print("Hash pas Cool !!!!!!!!!!")
        #return json.dumps("ERROR")
    print(badge + " "  + str(time_req) + " " + dict_req['hash'])
    status = 0    
    badgeId = int(badge, 16) 
    currentCard = session.query(Card).filter(Card.id == badgeId).first();
    if(currentCard is None):
            session.rollback()
            print("unknown card  : " + badge + "(" + str(product) + ")")
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Invalid card'}, 'time': now}
            status = 1
    currentUser = session.query(User).filter(User.id == currentCard.user_id).first()
    if(currentUser is None):
            session.rollback()
            print("unknown user  : badge " + badge + "(" + str(product) + ")")
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Invalid user'}, 'time': now}
            status = 2
    hadDrink = False
    for element in dict_req['cart']:
        product = element['product_id']
        quantity = element.get('quantity', 1)
        if(quantity < 1 or not (type(quantity) is int)): 
            session.rollback()
            print("quantity is invalid : product=" + str(product) + " quantity " + str(quantity))
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Invalid quantity'}, 'time': now}
            status = 3
            break
        print("Buying " + str(quantity) + " of " + str(product)) 
        currentItem = session.query(Inventory).filter(Inventory.id == int(product)).first()
        if(currentItem is None):
            session.rollback()
            print("unknown item : " + str(product))
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Invalid item'}, 'time': now}
            status = 4
            break
        currentItem.quantity = currentItem.quantity - quantity
        currentUser.balance = currentUser.balance - (currentItem.price * quantity)
        if(currentItem.category == 1 or currentItem.category_id == 2):
            hadDrink = True
        if(currentItem.quantity < 0):
            session.rollback()
            print('product not in stock anymore : ' + str(currentItem.price) + " " + currentItem.name + "  " + str(currentItem.quantity))
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Not in stock'}, 'time': now}
            status = 5
            break
        elif(currentUser.balance  < 0):  
            session.rollback()
            print('not enough money in the account!')
            ret = {'melody': "b2c3b2", 'message': {'error':'ERROR', 'desc':'Too poor!'}, 'time': now}
            status = 6
            break
        else:
            print([currentUser.name, "{:.2f}".format(currentUser.balance/100)])
            new_transaction = Transaction(quantity = quantity, date = nowDt, value = (currentItem.price * quantity), user_id = currentUser.id, card_id = badgeId, element_id = product, terminal_id = term_id)
            session.add(new_transaction)

    if(status == 0):
        ret = {'melody': "a1b1c1d1e1f1g1", 'message': {'won':False, 'desc':'Successfull transaction, Have a nice day'}, 'time': now}
        if(hadDrink and randint(1,50) == 25): # (2% chance) then we give a free drink!
            for element in dict_req['cart']:
                product = element['product_id']
                currentItem = session.query(Inventory).filter(Inventory.id == int(product)).one()
                if(currentItem.category == 1 or currentItem.category_id == 2):
                    break
            
            currentUser.balance = currentUser.balance + currentItem.price #Give back the money
            ret = {'melody': 'a2d2a1f2c2d2a2d2c2f2d2', 'message': {'won':True, 'desc':'YOU WON, FREE DRINK!'}, 'time': now}
            print("FREE DRINK Offered " + str(currentItem.price) + " " + currentItem.name)
            os.system("mpplay-and-return drinkingBuddy/cheer.mp3")
        elif(currentItem.category_id == 3): #If food then we cheer!
            print("Food paid. Cheer!")
            os.system("mpplay-and-return drinkingBuddy/delicious.mp3")

        session.commit()

    ret['status'] = status 
    hash_str = ret['melody'] + str(ret['status']) + now.__str__()
    for c in hash_str:
        sipout.update(binascii.a2b_qp(c))
  
    #retHash = hex(sipout.hash())[2:-1].upper()  #This change not working on Coltello, works on Raspbbery
    retHash = hex(sipout.hash())[2:].upper()
    retHash = retHash.zfill(16)

    ret['hash'] = retHash

    return json.dumps(ret)

@app.route("/balance", methods=['POST'])
def getBalance():
    """ Get balance request
    

    :return: JSON request tous les capteurs de la classe
    """

    now = round(time.time())

    dict_req = request.get_json()

    term_id = dict_req.get('terminal_id', 0)
    key = bytes(session.query(Terminal).filter(Terminal.id == term_id).one().key, 'utf-8')

    sipout = siphash.SipHash_2_4(key)
    sipin = siphash.SipHash_2_4(key)

    badge = dict_req['badge']
    time_req = dict_req['time']

    hash_verif = str(badge) + str(time_req)
    for c in hash_verif:
        sipin.update(binascii.a2b_qp(c))

    #reqHash = hex(sipin.hash())[2:-1].upper() #This change does not work on Coltello
    reqHash = hex(sipin.hash())[2:].upper()
    reqHash = reqHash.zfill(16)

    if dict_req['hash'] == reqHash:
        print("Cool hash's OK")
    else:
        print("Pas Cool !!!!!!!!!!")

    try: 
         badgeId = int(badge, 16)
    except ValueError:
        badgeId = -1

    user = session.query(Card, Card.user_id).filter(Card.id == badgeId)
    if user.count() == 0:
        messages = {'error':'ERROR', 'desc':'UNKNOWN CARD'}
        ret = {'melody': "c5", 'message': messages, 'time': now, 'status':1}
    else:
        userId = user.first().user_id
        user = session.query(User, User.name, User.balance, User.id).filter(User.id == userId).first()
        if user is None:
            messages = {'error':'ERROR', 'desc':'UNKNOWN USER'}
            ret = {'melody': "c5", 'message': messages, 'time': now, 'status':1} 
        else:
            messages = {'name': user.name, 'credit':user.balance, 'id':user.id}
            ret = {'melody': "a1c1a1c1a1c1a1c1", 'message': messages, 'time': now, 'status':0}
    
    
    hash_str = ret['melody'] + str(ret['status']) + now.__str__()
    print(hash_str)
    for c in hash_str:
        sipout.update(binascii.a2b_qp(c))

    #retHash = hex(sipout.hash())[2:-1].upper()  #This change does not work on Coltello works on PI
    retHash = hex(sipout.hash())[2:].upper()
    retHash = retHash.zfill(16)

    ret['hash'] = retHash

    return json.dumps(ret)

@app.route("/credit", methods=['POST'])
def addCredit():
    """ add credit request


    :return: JSON request tous les capteurs de la classe
    """
    nowDt = datetime.datetime.now()
    now = round(nowDt.timestamp())

    dict_req = request.get_json()

    term_id = dict_req.get('terminal_id', 0)
    key = bytes(session.query(Terminal).filter(Terminal.id == term_id).one().key, 'utf-8')

    sipout = siphash.SipHash_2_4(key)
    sipin = siphash.SipHash_2_4(key)

    badge = dict_req['badge']
    time_req = dict_req['time']

    hash_verif = str(badge) + str(time_req)
    for c in hash_verif:
        sipin.update(binascii.a2b_qp(c))

    #reqHash = hex(sipin.hash())[2:-1].upper() #This change does not work on Coltello
    reqHash = hex(sipin.hash())[2:].upper()
    reqHash = reqHash.zfill(16)

    if dict_req['hash'] == reqHash:
        print("Cool hash's OK")
    else:
        print("Pas Cool !!!!!!!!!!")

    credit = dict_req.get('credit', 0)
    
    badgeId = int(badge, 16)
    user = session.query(Card, Card.user_id).filter(Card.id == badgeId)
    if user.count() == 0:
        messages = {'error':'ERROR', 'desc':'UNKNOWN CARD'}
        ret = {'melody': "c5", 'message': messages, 'time': now, 'status':1}
        session.rollback()
    else:
        userId = user.first().user_id
        user = session.query(User).filter(User.id == userId).first()
        if user is None:
            messages = {'error':'ERROR', 'desc':'UNKNOWN USER'}
            ret = {'melody': "c5", 'message': messages, 'time': now, 'status':2}
            session.rollback()
        else:
            if(not (type(credit) is int) or credit <= 0 or credit > 100000):
                messages = {'error':'ERROR', 'desc':'INVALID CREDIT VALUE'}
                ret = {'melody': "c5", 'message': messages, 'time': now, 'status':3}
                session.rollback()
            else:
                print("adding " + str(credit) + " to user " + user.name + " (" + str(user.id) + ", " + str(user.balance) +  ")")
                user.balance = user.balance + credit
                new_transaction = Transaction(quantity = 1, date = nowDt, value = credit, user_id = user.id, card_id = badgeId, element_id = 999, terminal_id = term_id)
                session.add(new_transaction)
                session.commit()
                messages = {'name': user.name, 'credit':user.balance, 'id':user.id}
                print("new balance = " + str(user.balance))
                ret = {'melody': "a1c1a1c1a1c1a1c1", 'message': messages, 'time': now, 'status':0}


    hash_str = ret['melody'] + "".join(messages) + now.__str__()
    for c in hash_str:
        sipout.update(binascii.a2b_qp(c))

    #retHash = hex(sipout.hash())[2:-1].upper()  #This change does not work on Coltello works on PI
    retHash = hex(sipout.hash())[2:].upper()
    retHash = retHash.zfill(16)

    ret['hash'] = retHash

    return json.dumps(ret)


@app.route("/total", methods=['GET'])
def total():

    date_from = request.args['from']
    date_to = request.args['to']

    query = session.query(
        #func.month(Transaction.date).label("period"),  #sql only        
        func.sum(Transaction.value).label("transaction_value"), 
        func.count(Transaction.id).label("transaction_count"),
    ).filter(Transaction.date.between(date_from, date_to))

    #query.group_by(func.month(Transaction.date)) #sql only

    results = [str(e.transaction_value) + " " + str(e.transaction_count) for e in query.all()]

    return json.dumps(results)


@app.route("/auth", methods=['GET','POST'])
@requires_auth
def authTest():
    return "Hello world"

@app.route("/beverages", methods=['GET'])
def getBeverages():
    beverages =  [
        serialize(beverage)
        for beverage in session.query(Inventory).all()
    ]
    return json.dumps(beverages)

@app.route("/beverages", methods=['POST'])
@requires_auth
def postBeverages():
    data = request.get_json(force=True)
    pprint(json)
    beverage = Inventory(name = data['name'], quantity = data['quantity'])
    session.add(beverage)
    session.commit()        
    return json.dumps(serialize(beverage))

#class Resource(restful.Resource):
#    smethod_decorators = [basic_auth.required]

#class BeverageListResource(Resource):
#
#	def get(self):
#		beverages =  [
#			serialize(beverage)
#			for beverage in session.query(Inventory).all()
#		]
#		return beverages
#
#	def post(self):
#		beverage = Inventory(name = request.json['name'], quantity = request.json['quantity'])
#		session.add(beverage)
#		session.commit()		
#		return serialize(beverage)



class BeverageResource(Resource):
	method_decorators = [requires_auth]
	def get(self, beverage_id):		
		beverage = serialize(session.query(Inventory).filter(Inventory.id == beverage_id).one())	
		return beverage

	def post(self, beverage_id):		
		beverage = session.query(Inventory).filter(Inventory.id == beverage_id).first()
		for (field, value) in request.json.items():
			setattr(beverage,field,value)
	
		session.commit()
		return serialize(beverage)


class UserListResource(Resource):
	method_decorators = [requires_auth]	
	def get(self):				

		users = session.query(User, User.id, User.name, User.balance).all()

		users = [
			serialize(user)
			for user in session.query(User).all()
		]
		return users

class UserResource(Resource):
	method_decorators = [requires_auth]
	def get(self, user_id):
		user = serialize(session.query(User).filter(User.id == user_id).one())
		return serialize(user)

	def post(self, user_id):
		user = session.query(User).filter(User.id == user_id).first()
		for (field, value) in request.json.items():
			setattr(user,field,value)

		session.commit()
		return serialize(user)

class TransactionListResource(Resource):
	method_decorators = [requires_auth]
	def get(self):
		transactions = session.query(Transaction).options(lazyload('*')).all()
		result, error = TransactionSchema(many=True).dump(transactions)
		return result



def serialize(model):
	columns = [c.key for c in class_mapper(model.__class__).columns]
	return dict((c, getattr(model, c)) for c in columns)

#api.add_resource(BeverageListResource, '/beverages')



api.add_resource(BeverageResource, '/beverages/<beverage_id>')
api.add_resource(UserListResource, '/users')
api.add_resource(UserResource, '/users/<user_id>')
api.add_resource(TransactionListResource, '/transactions')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
    
