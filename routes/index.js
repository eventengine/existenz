// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose = require('mongoose');
var Server = require('../models/server');
var api   = require('../scripts/coluApi-client.js'); // get our colu-api method library
var htmlfactory   = require('../scripts/htmlfactory.js'); // get our html factory method library

exports.index = function (req, res) {
	var username = "Not logged in";
	var private_seed = "";
	var server_name = "test_server";
	var isAlreadyLoggedin = false;
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    	isAlreadyLoggedin = true;
    }
    // load the server details
    // if server is not existant create it
	
	var _cb = function(body){
    var data = {
            title: " Existenz - Equity Crowdfunding on the Blockchain",
            username: username,
            private_seed : body.private_seed,
            server_name : body.server_name,
            isAlreadyLoggedin:isAlreadyLoggedin
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
		var _fb = function(response){
		    var data = {
		            title: " Existenz - My Wallet",
		            username: username,
		            private_seed : body.private_seed,
		            server_name : body.server_name,
		            hdwallet: response.hdwallet
		        };
		        res.render('index/mywallet', data);		
		};
		// fetch the html snippet for th current user in mywallet page
        htmlfactory.getMyWallet(username, _fb);   
	};
	api.getServer(server_name, _cb);
};

exports.mycompanies = function (req, res) {
	var username = "Not logged in";
	var private_seed = "";
	var server_name = "No server loaded";
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect("/");
    }
	var _cb = function(body){
		var _fb = function(response){ 
			console.log("exports.myprojects response.links: "+ response.links)
		var data = {
            title: " Existenz - My Companies",
            username: username,
            private_seed : body.private_seed,
            server_name : body.server_name,
            projectlinks: response.links
        };
        res.render('index/mycompanies', data);
		};
		// fetch the html snippet for th current user in myprojects page
        htmlfactory.getMyCompanies(username, _fb);
	};
    // load the server details
    // if server is not existant create it
	api.getServer(server_name, _cb);
};
exports.newcompany = function (req, res) {
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect("/");
    }
	var data = {
            title: " Existenz - Create a New Company",
            username: username
        };
        res.render('index/newcompany', data);	
};
exports.newasset = function (req, res) {
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    }else{
    	res.redirect("/");
    }
	var data = {
            title: " Existenz - Create a New Asset",
            username: username
        };
        res.render('index/newasset', data);	
};