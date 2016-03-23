// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var Server = require('../models/server');
var Projects = require('../models/projects');
var Users = require('../models/users');

module.exports= {
"getWallet": function(username, callback){
	var data = {};
	Users.findOne({
		username: username
	},function(err, user) {
        data.hdwallet = user.meta.hdwallet;
        // for all assets which the user has share in , display
		for (i = 0; i < user.meta.assets.length; i++) {
			data.assets.push(user.meta.assets);
			data.asset_name[i].push(user.meta.assets.asset_name);
		}
		// will add more data here
		callback(data);
	});	
},
"getMyProject": function(username, callback){
	var data = {};
	var response = [];
	Projects.find({
		username: username
	},function(err, projects) {
		for (i = 0; i < projects.length; i++) {
			var link = 'a href="manageproject/'+projects[i].meta.projectname.replace(" ","+")+'">'+projects[i].meta.projectname+'</a';
			response.push(link);
		}
		data.links =response;
		// will add more data here
		callback(data);
	});
},
"getProjectProfile": function(projectname, callback){
	Projects.findOne({
		projectname: projectname
	},function(err, project) {
		
	});
}
};
