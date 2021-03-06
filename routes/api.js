// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//
var request = require('request');
var api   = require('../scripts/coluApi-client.js'); // get our colu-api method library


exports.createCompany = function (req, res) {
    console.log("createCompany initiated..");
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect('/');
    }
	var _cb = function(err, body){
		if (err) console.log('error: ',err);				
		   console.log("GetAdress for Create Company body : "+JSON.stringify(body.result));
		   // Create the project with a new assigned hdwallet address
		   var _fb = function(){
			   // think about a redirect instead
			   //res.redirect('manageproject/'+req.body.projectname);
			   res.redirect('mycompanies/');
		   };
		   var company_data = {
				companyname: req.body.companyname || "No Name",
				description: req.body.description || "",
				firstname: req.body.firstname || "John Doe",
				lastname: req.body.lastname,
				email: req.body.email || "",
				website: req.body.website || ""			
		   };
		   if (typeof project_data === 'string') {
			   project_data = JSON.parse(project_data);
		   }
		   api.createCompany(username, company_data, body.result, _fb); 
		};
		
		var json_data = {
			  jsonrpc: "2.0", // mandatory			    
			  method: "hdwallet.getAddress",
			  // mandatory
			  id: "1" // mandatory if response is needed
			};
		api.postToApi('', json_data, _cb);       
};

exports.getPrivateSeed = function (req, res) {
    console.log("getPrivateSeed initiated..");
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    }
	var _cb = function(err, body){
		if (err) console.log('error: ',err);
	    var data = {
	            title: " Existenz - Equity Crowdfunding on the Blockchain",
	            coluPrivateSeed : body.result,
	            username : username
	        };				
		   console.log("GetPrivateSeed body : "+JSON.stringify(body.result));
		   // think about a redirect instead
		   res.render('index/index', data);
		};
		
	var json_data = {
		    jsonrpc: "2.0", // mandatory
		    
		  method: "hdwallet.getPrivateSeed",
		 // mandatory
		    id: "1" // mandatory if response is needed
		}
		api.postToApi('', json_data, _cb);       
};

exports.getAdress = function(req, res){
    console.log("GetAdress initiated..");
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    }
	var _cb = function(err, body){
		if (err) console.log('error: ',err);
	    var data = {
	            title: " Existenz - Equity Crowdfunding on the Blockchain",
	            colugetAdress : body.result,
	            username : username
	        };				
		   console.log("GetAdress body : "+JSON.stringify(body.result));
		   // think about a redirect instead
		   res.render('index/index', data);
		};	
	
	var json_data = {
		    jsonrpc: "2.0", // mandatory
		    
		  method: "hdwallet.getAddress",
		 // mandatory
		    id: "1" // mandatory if response is needed
		};

		api.postToApi('', json_data, _cb);
};

exports.issueAsset = function (req, res){
	// Form POST will need args:(in req.body)
	// amount
	// divisilility
	// reissueable
	// transfer(int amount)
	// all metadata 
    console.log("issueAsset initiated..");
    console.log("issueAsset received req.body: "+JSON.stringify(req.body));
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    }
	var _fb = function(err, userHdadress){
	var _cb = function(err, body){
		if (err) console.log('error: ',err);
	    var data = {
	       title: " Existenz - Equity Crowdfunding on the Blockchain",
	       coluIssueAssetResults : JSON.stringify(body.result),
	       username : username
	       };				
		console.log("GetAdress body : "+JSON.stringify(body.result));
		// think about a redirect instead
		res.render('index/index', data);
		};	
			
	function _GetExtension(url) {
	   var ext = url.match(/\.(jpeg|jpg|gif|png)$/);
	   if (ext !=null){return "image/"+ext;}else{
	    	return null;
	   }	
	};
	var icon = "";
	if (req.body.icon == ""){
		if (req.body.iconupload != ""){
			var icon = req.body.iconupload;
		}
	}else{
		var icon =	req.body.icon;
	}

	var icontype = 	_GetExtension(icon);
	var asset = {
		    'amount': Number(req.body.amount),
		    'divisibility': req.body.divisibility[1],
		    'reissueable': false,
		    'transfer': [{
		    	'amount': Number(req.body.amount)
		    }],
		    'metadata': {
		        'assetName': req.body.assetname,
		        'issuer': userHdadress,
		        'description': req.body.description,
		        'urls': [{name:'icon', url: icon , mimeType: icontype, dataHash: ''}],
		        'userData': {
		            'meta' : [
		                {key: 'Item ID', value: 2, type: 'Number'},
		                {key: 'Item Name', value: req.body.assetname, type: 'String'},
		                {key: 'Company', value: 'My Company', type: 'String'},
		                {key: 'Address', value: 'San Francisco, CA', type: 'String'}
		            ]
		        }
		    }
		};

		var json_data = {
		    jsonrpc: "2.0", // mandatory
		    
		  method: "issueAsset",
		 // mandatory
		    id: "1", // mandatory if response is needed
		    params: asset // asset json object
		};

		api.postToApi('', json_data, _cb);	
	};
	api.getUserHdaddress(username, _fb);
};

exports.sendAsset = function (req, res){
    console.log("sendAsset initiated..");
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    } 
    // test adress 
    var address = "mx8vKfuhj2vWaNd7xzMK3F7uJKoF32HQu6";
    var address1 = "mmLd3FMKq7LwmxbU6UPWeyoXgYx6TStdyq";
    var assetId = "LEvxcnrvaZzN34MmGpogPvQPG1NunMUXMXqgs";
	var _cb = function(err, body){
		if (err) console.log('error: ',err);
	    var data = {
	            title: " Existenz - Equity Crowdfunding on the Blockchain",
	            coluSendAssetResults  : JSON.stringify(body.result),
	            username : username
	        };				
		   console.log("sendAsset body : "+JSON.stringify(body.result));
		   // think about a redirect instead
		   res.render('index/index', data);
		};    
	var sendAsset = {
		    "from":[address],
		    "to": [{
		        "address":address1,
		        "amount":0,
		        "assetId":assetId
		    }],
		    "metadata":{
		        "userData":{
		            "meta":[{
		                "key":"ID",
		                "value":100,
		                "type":"Number"
		            },{
		                "key":"Issuer Name",
		                "value":"My Name",
		                "type":"String"
		            },{
		                "key":"Address",
		                "value":"San Francisco, CA",
		                "type":"String"
		            },{
		                "key":"Name",
		                "value":"WF Shares",
		                "type":"String"
		            },{
		                "key":"Description",
		                "value":"Dummy WF Shares",
		                "type":"String"
		            }]
		        }
		    }
		}

		var json_data = {
		    jsonrpc: "2.0", // mandatory
		    
		  method: "sendAsset",
		 // mandatory
		    id: "1", // mandatory if response is needed
		    params: sendAsset // asset json object
		};

		api.postToApi('', json_data, _cb);
};
