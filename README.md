# DrinkingBuddyTerminator
Web client and RFID acces manager for the Drinking Buddy Project


# API reference
(cfr: A [link](http://example.com "Title").)

*sync
*balance
*buy

## sync
request: get to /sync
response: items available (with price and quantity)

## balance
request: badge id
response(message): error or  credit

## buy
request: badge + product_id
response(message): win + optional text 