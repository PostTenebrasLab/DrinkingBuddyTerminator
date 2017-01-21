# DrinkingBuddyTerminator
Web client and RFID acces manager for the Drinking Buddy Project


# API reference
(see [API Interfaces](https://github.com/PostTenebrasLab/DrinkingBuddyTerminator/tree/master/src/app/model/api "API Interfaces").)

- sync
- balance
- buy

## sync
request: get to /sync.
response: items available (with price and quantity).

## balance
request: badge id.
response(message): error or  credit.

## buy
request: badge + product_id.
response(message): win + optional text.


# Environments

## mock
ng serve --env=mock
The API are mocked with [InMemoryWebApiModule](https://github.com/angular/in-memory-web-api "InMemoryWebApiModule").
Responses data can be found in the [generators folder](https://github.com/PostTenebrasLab/DrinkingBuddyTerminator/tree/master/src/app/model/generators "generators").

## dev
ng serve or ng serve --env=dev
Uses the server API.
The server URL is defined in the respective [environment file](https://github.com/PostTenebrasLab/DrinkingBuddyTerminator/tree/master/src/environments "env files").

## prod
ng serve --env=prod
ng build --env=prod
Same of dev at the time.


