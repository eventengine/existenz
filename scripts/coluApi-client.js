// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var request = require('request');

// Each call to colu api will be done througth the api object 
// and will fire a callback if succesful or an errback if failed 
// (useful for transaction were you want to be able to delete the transaction if it failed)
module.exports= {
"postToApi" : function (api_endpoint, json_data, callback) {
	console.log(api_endpoint+': ', JSON.stringify(json_data));
	request.post({
		url: 'http://localhost:8091/'+api_endpoint,
		headers: {
		          'Content-Type': 'application/json', 
		          'Accept': 'application/json',
		          'Content-Length': Buffer.byteLength(JSON.stringify(json_data), 'utf8')
		      },
		      body: JSON.stringify(json_data)
		}, 
		function (error, response, body) {
			if (error) {
				return callback(error);
			}
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			return callback(null, body);
		});
},	
"error": function(err, errback){
console.log("colu answered with an error : "+err);
errback("colu answered with an error : "+err);
},
"coluapi_object_method" : function (arg1, arg2, callback, errback){

	callback("null");	    
	}

};// end of module.exports