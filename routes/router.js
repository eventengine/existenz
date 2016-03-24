// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var coluapi   = require('../scripts/coluApi-client.js'); // get our colu-api method library
var htmlfactory   = require('../scripts/htmlfactory.js'); // get our html factory method library

exports.manageCompany= function (req, res) {

		// if the user is logged in 
	    if(req.user) {
	    	username = req.user.username;
	    }else{
	    	res.redirect("/");
	    }
	    var companyname = req.params.company_name;
	    var _fb = function(isAuthorized){	
	    if(isAuthorized){ 
			var _cb = function(err, body){ 
			console.log( "htmlfactory.getMyCompany(companyname, _cb) _cb responded with body: "+JSON.stringify(body));
	    	companyname = companyname.replace("+"," ");
	    	var data = {
	    		title: " Existenz - "+ companyname,
	    		username: username,
	    		companyname: companyname,
	    		companyhdwallet: body.meta.hdwallet,
	    		adminfirstname: body.meta.admin.firstname,
	    		adminlastname: body.meta.admin.lastname,
	    		adminemail: body.meta.admin.email,
	    		description: body.profile.body.description,
	    		website: body.profile.body.website,
	    		lastmodified: body.meta.lastmodified
	    	};
		res.render('index/managecompany', data);
		};
        htmlfactory.getMyCompany(companyname, _cb);
	    }else{
	    	res.redirect('mycompanies');
	    }
	    };
		
		coluapi.checkProjectIfAdmin(req.params.company_name, username, _fb);

};