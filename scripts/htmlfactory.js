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

module.exports= {

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
