# DrinkingBuddyTerminator
Web client and RFID acces manager for the [Drinking Buddy Project](https://github.com/PostTenebrasLab/DrinkingBuddyServer "Drinkng Buddy Server").  

# Install
Install [angular-cli](https://github.com/angular/angular-cli#installation "angluar-cli").  
```
git clone https://github.com/PostTenebrasLab/DrinkingBuddyTerminator.git
cd DrinkingBuddyTerminator
npm install
ng serve --env=mock
```

# API reference
(see [API Interfaces](https://github.com/PostTenebrasLab/DrinkingBuddyTerminator/tree/master/src/app/model/api "API Interfaces").)

- sync
- balance
- buy
- credit

All responses, except sync, share the same top level interface.  
Distincts properties can be found in the message object of the response.  
Backend errors are detected with a status not equal 0.  
Error detail can be found in the message object of the response.   

## sync
Get the items list.  
request: requires the terminal id (response may vary for different types of terminals).  
response: array of availables items (with price and quantity).  

## balance
Get the user profile and his actual balance.  
request: badge id.  
response(message): error or profile info.  

## buy
Send the cart for purchase. Randomly a user win his cart.    
request: badge + cart (as an array of productId and quantity).  
response(message): error or won(boolean) + optional text.  

## credit
Add credit to the user account.  
request: requires badge and credit (numeric, in cents).  
response(message): same as balance.  


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

# End
