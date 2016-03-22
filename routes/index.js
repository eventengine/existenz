// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose = require('mongoose');
var Server = require('../models/server');

exports.index = function (req, res) {
	var username = "Not logged in";
	var private_seed = "";
	var server_name = "test_server";
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }
    // load the server details
    // if server is not existant create it
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
	    var data = {
	            title: " Existenz - Equity Crowdfunding on the Blockchain",
	            username: username,
	            private_seed : private_seed,
	            server_name : server_name
	        };
	        res.render('index/index', data);		
	});	

};