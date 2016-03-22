// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var index = require('../routes/index');
var api = require('../routes/api');
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Users = require('../models/users');
var coluapi   = require('../scripts/coluApi-client.js'); // get our colu-api method library
module.exports = function (app) {
	
	//Main routes
	///////////////////////////
	app.get('/', index.index);
	app.get('/mywallet', index.mywallet);	
	app.get('/myprojects', index.myprojects);
	// Colu-Api Routes
	/////////////////////////////
	app.post('/createproject', api.createProject);
	app.get('/getPrivateSeed', api.getPrivateSeed);
	app.get('/getAdress', api.getAdress);
	app.get('/issueAsset', api.issueAsset);
	app.get('/sendAsset', api.sendAsset);
	
	// auth routes
	/////////////////////////////
	app.get('/login', function(req, res) {
	    res.render('index/login', {title:" Login" });
	});
	app.get('/register', function(req, res) {
	    res.render('index/register', {title:" Register" });
	});
	app.post('/register', function(req, res, next) {
      Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("index/register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
               if (err) {
                    return next(err);
                }
               // if registering is a success create a user document in the users collection
               // and attribute a hdwallet address to the user
               var _cb = function(err, response){
                   var user = new Users({
               		meta:{ 
              				username: req.body.username,
              				password: req.body.password,
              				hdwallet: response.result // get a hdwallet adress
              				},
              			profile:{
              				avatar_url: "",
              				email: "",
              				description: ""	 
              					}
                  });
      				user.save(function(err,_id) {
      					if (err) throw err;
      					console.log("User was created. Name: "+ req.body.username+ " Hdwallet: "+response.result);
      				});
            	   res.redirect('/'); 
               };
           		var json_data = {
        		    jsonrpc: "2.0", // mandatory
        		    method: "hdwallet.getAddress",
        		    // mandatory
        		    id: "1" // mandatory if response is needed
        		};
        		coluapi.postToApi('', json_data, _cb);  
           });
        });
   });
   });

	app.post('/login', passport.authenticate('local'), function(req, res, next) {
	    req.session.save(function (err) {
	        if (err) {
	            return next(err);
	        }
	        res.redirect('/');
	    });
	});

	app.get('/logout', function(req, res, next) {
      req.logout();
      req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
    });	
	
	// error handlers
	/////////////////////////////////
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('index/error', {
	            message: err.message,
	            error: err
	        });
	    });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('index/error', {
	        message: err.message,
	        error: {}
	    });
	});
	
};
