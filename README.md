# DrinkingBuddyTerminator
Web client and RFID acces manager for the Drinking Buddy Project  


# API reference
(see [API Interfaces](https://github.com/PostTenebrasLab/DrinkingBuddyTerminator/tree/master/src/app/model/api "API Interfaces").)

- sync
- balance
- buy
- credit

All reponses, except sync, share the same top level interface.  
Distincts properties can be found in the message object of the response.

## sync
Get the items list.  
request: requires the terminal id (response may vary for different type of terminal).  
response: array of availables items (with price and quantity).  

## balance
Get the user profile.  
request: badge id.  
response(message): error or  credit.  

## buy
Send the cart for purchase. Randomly a user win his cart.    
request: badge + cart (as an array of productId and quantity).  
response(message): won(boolean) + optional text.  

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
