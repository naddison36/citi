var citi_1 = require('./citi');
// Either pass your Citi client id as a parameter to examples.js. eg
// node examples.js client_id
//
// Or enter them below.
// WARNING never commit your client id or token into a public repository.
var clientId = process.argv[2] || 'your_client_id';
var token = process.argv[3] || 'your_authorisation_token';
var client = new citi_1.default(clientId, token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBaUIsUUFBUSxDQUFDLENBQUE7QUFFMUIsb0VBQW9FO0FBQ3BFLDZCQUE2QjtBQUM3QixFQUFFO0FBQ0YsdUJBQXVCO0FBQ3ZCLHlFQUF5RTtBQUN6RSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO0FBQ3JELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQTBCLENBQUM7QUFFNUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRXpDLHNDQUFzQztBQUN0Qyw4REFBOEQ7QUFDOUQsR0FBRztBQUNILHFGQUFxRjtBQUNyRixLQUFLO0FBRUwsMkJBQTJCO0FBQzNCLHFEQUFxRDtBQUNyRCxHQUFHO0FBQ0gsMkZBQTJGO0FBQzNGLEtBQUs7QUFFTCxzQkFBc0I7QUFDdEIsaURBQWlEO0FBQ2pELDhDQUE4QztBQUM5QywrQkFBK0I7QUFDL0IsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0Qyw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDRDQUE0QztBQUM1QyxpQ0FBaUM7QUFDakMsSUFBSTtBQUVKLG1EQUFtRDtBQUNuRCxHQUFHO0FBQ0gsOEZBQThGO0FBQzlGLGlCQUFpQjtBQUVqQixxREFBcUQ7QUFDckQsR0FBRztBQUNILGtHQUFrRztBQUNsRyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENpdGkgZnJvbSAnLi9jaXRpJztcblxuLy8gRWl0aGVyIHBhc3MgeW91ciBDaXRpIGNsaWVudCBpZCBhcyBhIHBhcmFtZXRlciB0byBleGFtcGxlcy5qcy4gZWdcbi8vIG5vZGUgZXhhbXBsZXMuanMgY2xpZW50X2lkXG4vL1xuLy8gT3IgZW50ZXIgdGhlbSBiZWxvdy5cbi8vIFdBUk5JTkcgbmV2ZXIgY29tbWl0IHlvdXIgY2xpZW50IGlkIG9yIHRva2VuIGludG8gYSBwdWJsaWMgcmVwb3NpdG9yeS5cbmNvbnN0IGNsaWVudElkID0gcHJvY2Vzcy5hcmd2WzJdIHx8ICd5b3VyX2NsaWVudF9pZCc7XG5jb25zdCB0b2tlbiA9IHByb2Nlc3MuYXJndlszXSB8fCAneW91cl9hdXRob3Jpc2F0aW9uX3Rva2VuJztcblxuY29uc3QgY2xpZW50ID0gbmV3IENpdGkoY2xpZW50SWQsIHRva2VuKTtcblxuLy8vLyBsb2dpbiB1c2luZyB1c2VybmFtZSBhbmQgcGFzc3dvcmRcbi8vY2xpZW50LmxvZ2luKFwicm9ja2dyb3VuZFwiLCBcImJUQUM4dGxpOFwiLCBmdW5jdGlvbihlcnIsIHRva2VuKVxuLy97XG4vLyAgICBjb25zb2xlLmxvZygnZXJyb3IgPSAnICsgZXJyICsgJywgYXV0aGVudGljYXRpb24gdG9rZW4gZnJvbSBsb2dpbiA9ICcgKyB0b2tlbik7XG4vL30pO1xuXG4vLy8vIGdldCBjb3Jwb3JhdGUgYWNjb3VudHNcbi8vY2xpZW50LmdldENvcnBvcmF0ZUFjY291bnRzKGZ1bmN0aW9uKGVyciwgYWNjb3VudHMpXG4vL3tcbi8vICAgIGNvbnNvbGUubG9nKCdlcnJvciA9ICcgKyBlcnIgKyAnIGNvcnBvcmF0ZSBhY2NvdW50cyA9ICcgKyBKU09OLnN0cmluZ2lmeShhY2NvdW50cykgKTtcbi8vfSk7XG5cbi8vY29uc3QgbmV3UGF5bWVudCA9IHtcbi8vICAgIGJyYW5jaF9uYW1lOiBcIlNZRE5FWSBDSVRJQkFOSyAtIENPUlBPUkFURVwiLFxuLy8gICAgLy90cmFuc2FjdGlvbl9yZWZlcmVuY2VfbnVtYmVyPzogc3RyaW5nLFxuLy8gICAgdmFsdWVfZGF0ZTogXCIyMDE1LTExLTEwXCIsXG4vLyAgICBlbWFpbDogXCJuaWNrQHRlc3QuY29tLmF1XCIsXG4vLyAgICAvL3BheW1lbnRfbWV0aG9kPzogc3RyaW5nLFxuLy8gICAgcGF5bWVudF9jdXJyZW5jeTogXCJBVURcIixcbi8vICAgIHBheW1lbnRfYW1vdW50OiBcIjk5OTkuOTlcIixcbi8vICAgIC8vcGF5bWVudF90eXBlPzogc3RyaW5nLFxuLy8gICAgLy9iZW5lZmljaWFyeV9pZD86IHN0cmluZyxcbi8vICAgIC8vZGViaXRfYWNjb3VudF9uYW1lPzogc3RyaW5nLFxuLy8gICAgLy9kZWJpdF9hY2NvdW50X251bWJlcj86IHN0cmluZyxcbi8vICAgIC8vY3JlYXRlZF9ieT86IHN0cmluZyxcbi8vICAgIC8vY3JlYXRlZF9vbj86IHN0cmluZyxcbi8vICAgIGN1c3RvbWVyX3JlZmVyZW5jZV9udW1iZXI6IFwiMTIzNDU2Nzg5XCJcbi8vICAgIC8vcGF5bWVudF9kZXRhaWxzPzogc3RyaW5nLFxuLy99O1xuXG4vL2NsaWVudC5hZGRDb3Jwb3JhdGVQYXltZW50KGZ1bmN0aW9uKGVyciwgcGF5bWVudClcbi8ve1xuLy8gICAgY29uc29sZS5sb2coJ2Vycm9yID0gJyArIGVyciArICcgYWRkZWQgY29ycG9yYXRlIHBheW1lbnQgPSAnICsgSlNPTi5zdHJpbmdpZnkocGF5bWVudCkpO1xuLy99LCBuZXdQYXltZW50KTtcblxuLy9jbGllbnQuZ2V0Q29ycG9yYXRlUGF5bWVudHMoZnVuY3Rpb24oZXJyLCBwYXltZW50cylcbi8ve1xuLy8gICAgY29uc29sZS5sb2coJ2Vycm9yID0gJyArIGVyciArICcgY29ycG9yYXRlIGFjY291bnQgcGF5bWVudHMgPSAnICsgSlNPTi5zdHJpbmdpZnkocGF5bWVudHMpKTtcbi8vfSwgMTAsIDApOyJdfQ==