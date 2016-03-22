// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose = require('mongoose');
var Server = require('../models/server');
var api   = require('../scripts/coluApi-client.js'); // get our colu-api method library

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
	
	var _cb = function(body){
    var data = {
            title: " Existenz - Equity Crowdfunding on the Blockchain",
            username: username,
            private_seed : body.private_seed,
            server_name : body.server_name
        };
        res.render('index/index', data);
	};
	api.getServer(server_name, _cb);
};

exports.mywallet = function (req, res) {
	var username = "Not logged in";
	var private_seed = "";
	var server_name = "test_server";
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect("/");
    }
    // load the server details
    // if server is not existant create it
	
	var _cb = function(body){
    var data = {
            title: " Existenz - My Wallet",
            username: username,
            private_seed : body.private_seed,
            server_name : body.server_name
        };
        res.render('index/mywallet', data);
	};
	api.getServer(server_name, _cb);
};

exports.myprojects = function (req, res) {
	var username = "Not logged in";
	var private_seed = "";
	var server_name = "test_server";
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect("/");
    }
    // load the server details
    // if server is not existant create it
	
	var _cb = function(body){
    var data = {
            title: " Existenz - My Projects",
            username: username,
            private_seed : body.private_seed,
            server_name : body.server_name
        };
        res.render('index/myprojects', data);
	};
	api.getServer(server_name, _cb);
};