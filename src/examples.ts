import Citi from './citi';

// Either pass your Citi client id as a parameter to examples.js. eg
// node examples.js client_id
//
// Or enter them below.
// WARNING never commit your client id or token into a public repository.
const clientId = process.argv[2] || 'your_client_id';
const token = process.argv[3] || 'your_authorisation_token';

const client = new Citi(clientId, token);

//// login using username and password
//client.login("rockground", "bTAC8tli8", function(err, token)
//{
//    console.log('error = ' + err + ', authentication token from login = ' + token);
//});

//// get corporate accounts
//client.getCorporateAccounts(function(err, accounts)
//{
//    console.log('error = ' + err + ' corporate accounts = ' + JSON.stringify(accounts) );
//});

//const newPayment = {
//    branch_name: "SYDNEY CITIBANK - CORPORATE",
//    //transaction_reference_number?: string,
//    value_date: "2015-11-10",
//    email: "nick@test.com.au",
//    //payment_method?: string,
//    payment_currency: "AUD",
//    payment_amount: "9999.99",
//    //payment_type?: string,
//    //beneficiary_id?: string,
//    //debit_account_name?: string,
//    //debit_account_number?: string,
//    //created_by?: string,
//    //created_on?: string,
//    customer_reference_number: "123456789"
//    //payment_details?: string,
//};

//client.addCorporatePayment(function(err, payment)
//{
//    console.log('error = ' + err + ' added corporate payment = ' + JSON.stringify(payment));
//}, newPayment);

//client.getCorporatePayments(function(err, payments)
//{
//    console.log('error = ' + err + ' corporate account payments = ' + JSON.stringify(payments));
//}, 10, 0);