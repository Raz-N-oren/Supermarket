const expressJwt = require('express-jwt');
const config = require('../config/config.json');

// Extracting the text from the secret's JSON
let { secret } = config;


function authenticateJwtRequestToken() {
    
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        // console.log("Method = " + request.method);
        // console.log("request.url = " + request.url);

        if (request.method == 'POST' && request.url.endsWith('/users/')) {
            console.log("Returned true")
            return true;
        };

        if (request.method == 'POST' && request.url.endsWith('/users/login')) {
            console.log("Returned true")
            return true;
        };

        if (request.method == 'GET' && request.url.endsWith('/products/')) {
            console.log("Returned true")
            return true;
        };
        if (request.method == 'GET' && request.url.endsWith('/orders/amount_of_orders')) {
            console.log("Returned true")
            return true;
        };


        return false;

    });
};

module.exports = authenticateJwtRequestToken;