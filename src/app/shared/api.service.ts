import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { IbalanceRequest } from '../model/api/balance-request';
import { IcreditRequest } from '../model/api/credit-request';
import { IsyncRequest } from '../model/api/sync.request';
import { IsyncResponse } from '../model/api/sync-response';
import { IcartItem } from '../model/api/cart-item';
import { IbuddyItem } from '../model/buddy-item';
import { IbuyRequest } from '../model/api/buy-request';
import { IbuddyUser } from '../model/buddy-user';
import {
  ADD_PRODUCT,
  API_BALANCE,
  API_ERROR,
  API_ERROR_CLEAN,
  BUY_MSG,
  ADD_CREDIT,
  MSG_NO_BADGE,
  PROFILE_LOGIN,
} from '../model/action-names';

const TERMINAL_ID = 0;
const siphash = require('siphash');
const key = [0xdeadbeef, 0xcafebabe, 0x8badf00d, 0x1badb002];

@Injectable()
export class ApiService {

  private BASE_URL: string;
  private syncUrl = 'sync';
  private balanceUrl = 'balance';
  private buyUrl = 'buy';
  private creditUrl = 'credit';

  public main: Observable<any>;
  public products: Observable<any>;
  public profile: Observable<any>;
  private sync_request: IsyncRequest;
  private badge_key: any;
  private user: IbuddyUser;


  constructor(private _http: Http, private _store: Store<any>) {

    this.BASE_URL = environment.base_url;
    this.main = _store.select('main');
    this.products = _store.select('products');
    this.profile = _store.select('profile');

    this.profile.subscribe((u: IbuddyUser) => {
      if (u && this.user && u.badge && u.badge !== this.user.badge) {
        this.postBalance(u.badge);
      }
      this.user = u;
    });

    this.sync_request = {
      terminal_id: TERMINAL_ID,
    };

    if (!environment.production) {
      this.badge_key = environment.fakeKey;
    }

  }






  /***************************************
  **  PUBLIC ZONE
  **  Preparation of the API calls.
  **
  ****************************************/

  /*
  *   LOGIN
  *   Simulates the RFID input
  *
  */

  public login(badge: string) {
    this._store.dispatch({ type: PROFILE_LOGIN, payload: badge });
  }


  /*
  *   SYNC
  *   Ask the server for synchronize:
  *   _ Products still availables
  *   _ hash key
  *   _ time (??)
  *
  */

  public sync() {
    if (environment.mock) {
      return this.getSync();
    }
    return this.postSync();
  }



  /*
  *   BALANCE
  *   Get the balance of the current user account.
  *
  */

  public postBalance(badge?: any) {

    if (!badge) {
      badge = this.user.badge;
    }

    const balanceRequest = {
      badge: badge,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
    };

    if (environment.mock) {
      return this.getMessage(this.balanceUrl, this.hashAll(balanceRequest), API_BALANCE);
    }
    return this.postMessage(this.balanceUrl, this.hashAll(balanceRequest), API_BALANCE);
  }




  /*
  *   CREDIT
  *   Credit some money on the current user account.
  *
  */
  public postCredit(amount = 0) {
    if (!this.user || !this.user.badge) {
      return this._store.dispatch({ type: MSG_NO_BADGE, payload: null });
    };

    // this.credit_request.badge = this.user.badge;
    // this.credit_request.credit = amount * 100;

    const creditRequest = {
      badge: this.user.badge,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
      credit: Math.round(amount * 100),
    };

    if (environment.mock) {
      return this.getMessage(this.creditUrl, creditRequest, ADD_CREDIT);
    }
    return this.postMessage(this.creditUrl, this.hashAll(creditRequest), ADD_CREDIT);

  }

  /*
  *   BUY
  *   Tell the server what do you want to drink.
  *
  */
  // todo: filter IbuddyItems to IcartItem
  public postBuy(items: IbuddyItem[]) {

    if (!this.user || !this.user.badge) {
      return this._store.dispatch({ type: MSG_NO_BADGE, payload: null });
    };

    const buyRequest = {
      badge: this.user.badge,
      cart: items,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
    };

    if (environment.mock) {
      return this.getMessage(this.buyUrl, this.hashAll(buyRequest), BUY_MSG);
    } else {
      return this.postMessage(this.buyUrl, this.hashAll(buyRequest), BUY_MSG);
    }
  }



  /***************************************
  **   API calls
  **   The two kind of API server calls.
  **
  ****************************************/


  /*
  *   SYNC
  *   Ask the server for synchronize:
  *   _ Products still availables
  *   _ hash key
  *   _ time (??)
  *
  */

  private postSync() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      this.BASE_URL + this.syncUrl,
      this.hashAll(this.sync_request),
      options)
      .map(res => res.json())
      .map((response: IsyncResponse) => ({ type: ADD_PRODUCT, payload: response.products }))
      .subscribe(
      (action) => this._store.dispatch(action),
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }


  /*
  *   MESSAGE
  *   Any other communication with the server.
  *   url: api url.
  *   request: the request object.
  *   actionName: the action type to dispatch back.
  *
  */

  private postMessage(url: string, request: any, actionName: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('POST MESSAGE');
    console.log(request);
    

    this._http.post(
      this.BASE_URL + url,
      request,
      options)
      .map(res => res.json())
      .map((json_resp: any) => ({ type: actionName, payload: json_resp }))
      .subscribe(
      (action) => this._store.dispatch(action),
      error => this._apiErrorHandler(url, error),
      () => {
        console.log('complete: ' + url);
        this.sync();
        if (url === this.buyUrl) {
          this.postBalance();
        }
      }
      );
  }


  /***************************************
  **   Mocked API calls
  **   Like(hopefully) the real API calls
  **   but only for dev.
  **   Note: InMemoryWebApi return a proper
  **    response for the post request
  **    ours API require a POST instead of a GET
  **
  ****************************************/
  private getSync() {

    this._http.get(
      this.BASE_URL + this.syncUrl,
      this.hashAll(this.sync_request))
      .map(res => res.json().data)
      .map((data: any) => ({ type: ADD_PRODUCT, payload: data }))
      .subscribe(
      (action) => {
        console.log(action);
        return this._store.dispatch(action);
      },
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }

  private getMessage(url: string, request: any, actionName: any) {

    this._http.get(
      this.BASE_URL + url,
      request)
      .map(res => res.json().data)
      .map((resp: any) => ({ type: actionName, payload: resp }))
      .subscribe(
      (action) => {
        console.log(action);
        this._store.dispatch(action);
      },
      error => this._apiErrorHandler(url, error),
      () => {
        console.log('complete: ' + url);
        this.sync();
        if (url === this.buyUrl) {
          this.postBalance();
        }
      });

  }


  /***************************************
  **   TOOLS
  **   Utility funcs.
  **
  ****************************************/

  // ERROR HANDLER
  private _apiErrorHandler(label: string, response) {
    console.log('API ERROR: ' + label);
    console.log(response);
    this._store.dispatch({ type: API_ERROR, payload: { error: label, desc: response } });
  }


  /*
  *   SIP Hash
  *   https://github.com/jedisct1/siphash-js
  *
  */

  private hashAll(x: any) {
    if (x === undefined || x === null) return null;

    if (typeof x !== 'object') {
      return siphash.hash_hex(key, x);
    }

    Object.keys(x).forEach((k, i) => {
      if (typeof x === 'object') {
        x[k] = this.hashAll(x[k]);
      } else {
        x[k] = siphash.hash_hex(key, x[k]);
      }
    });

    console.log('HASHALL');
    console.log(x);

    return x;

  }

  // private hashIt(message: any) {
  //   //   const siphash = require("siphash");
  //   //   const key = siphash.string16_to_key("qqeqwdaasd31441.d3!");
  //   //   const message = "Short test message";
  //   //   this.hash_hex = siphash.hash_hex(key, message);

  //   const siphash = require("siphash");
  //   const key = [0xdeadbeef, 0xcafebabe, 0x8badf00d, 0x1badb002];
  //   return siphash.hash_hex(key, message);
  // }



}

