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
var Server = require('../models/server');
var Projects = require('../models/projects');
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
				//return callback(error);
				return this.error(error, callback);
			}
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			return callback(null, body);
		});
},	
"error": function(err, errback){
// here will be a midlleware handling error response 
// and action that must be canceled or something like that
console.log("colu answered with an error : "+err);
errback("colu answered with an error : "+err);
},
"createProject": function(username, project_data, wallet_adress, callback){
	// create a sample project
	console.log("Create Project received project_data: "+JSON.stringify(project_data));
	var project = new Projects({
		meta:{ 
		projectname: project_data.projectname,
		admin: {
			username: username,
			firstname: project_data.firstname,
			lastname: project_data.lastname,
			email : project_data.email
		},
		hdwallet: wallet_adress
	},
	profile:{
		header:{ 
			banner_url: "",
			title: project_data.projectname
			},
		body:{
			website: project_data.website,
			description: project_data.description					
			},
		footer: {
			copyrigth: ""
			}
	},
	admins:{
		admin: [username]
	}
		});	
	project.save(function(err,_id) {
		if (err) throw err;
		console.log("Project was created. Name: "+ project_data.projectname+ " Admin : "+username);
	});	
	callback();
},
"getServer": function(server_name, callback){
	var private_seed ="";
	Server.findOne({
		server_name: server_name
	},function(err, server) {
		console.log("Server response = "+ server);
		if (server != null){
			private_seed = server.meta.private_seed;
		}else{
			private_seed = "c619c575d28a0ab6777d6f971441b24f9ca202358361529f798b159c66bbcee9";
			// create a sample server
			var server = new Server({
				server_name: server_name ,
				meta:{ 
				private_seed: private_seed,
				hdwallet: "mhKD2JLXCz8UU2MtnNHnwBQJwpNCobHvGf"
			},
			admins:{
				admin: ["jp","jp2"]
			}
				});	
			server.save(function(err,_id) {
				if (err) throw err;
				console.log("Server was created. Name: "+ server_name+ " Private seed : "+private_seed);
			});
		}
		var response = {};
		response.private_seed = private_seed;
		response.hdwallet = "mhKD2JLXCz8UU2MtnNHnwBQJwpNCobHvGf";
		response.server_name = server_name
		callback(response);
	});

},
"coluapi_object_method" : function (arg1, arg2, callback, errback){

	callback("null");	    
	}

};// end of module.exports