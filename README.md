# citi
Citi Mobile Challenge Javascript API client

===============

This is a node.js wrapper to the [Citi® Mobile Challenge APIs](http://citimobilechallenge-api-docs.anypresenceapp.com/).
An API Key is needed to access the Citi® Mobile Challenge APIs. Selected participants may access their unique client_id from the Profile page on www.citimobilechallenge.com website (requires login).

### Install

`npm install citi`

### Compile

The following will compile TypeScript to JavaScript
`tsc`

The compiler settings are configured in the `tsconfig.json` file

### Examples

```js
const client = new Citi('your_client_id');

// login using username and password
client.login("rockground", "bTAC8tli8", function(err, token)
{
    console.log('error = ' + err + ', authentication token from login = ' + token);
});

// get corporate accounts
client.getCorporateAccounts(function(err, accounts)
{
    console.log('error = ' + err + ', corporate accounts = ' + JSON.stringify(accounts) );
});

const newPayment = {
    branch_name: "SYDNEY CITIBANK - CORPORATE",
    value_date: "2015-11-10",
    email: "nick@test.com.au",
    payment_currency: "AUD",
    payment_amount: "9999.99",
    customer_reference_number: "123456789"
};

client.addCorporatePayment(function(err, payment)
{
    console.log('error = ' + err + ' added corporate payment = ' + JSON.stringify(payment));
}, newPayment);

client.getCorporatePayments(function(err, payments)
{
    console.log('error = ' + err + ' corporate account payments = ' + JSON.stringify(payments));
}, 10, 0);
```