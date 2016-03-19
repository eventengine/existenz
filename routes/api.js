// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//
var request = require('request');
var api   = require('../scripts/coluApi-client.js'); // get our colu-api method library


exports.getAdress = function (req, res) {
    console.log("GetAdress initiated..");
	var _cb = function(err, body){
		if (err) console.log('error: ',err);
	    var data = {
	            title: " Existenz - Equity Crowdfunding on the Blockchain",
	            coluadress : body
	        };				
		   console.log("GetAdress body : "+body);
		   // think about a redirect instead
		   res.render('index/index', data);
		};
		
	var json_data = {
		    jsonrpc: "2.0", // mandatory
		    
		  method: "hdwallet.getAddress",
		 // mandatory
		    id: "1" // mandatory if response is needed
		}
		api.postToApi('', json_data, _cb);
	
       
};
