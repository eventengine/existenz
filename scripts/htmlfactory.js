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
	console.log("getProjectLinks has initialized...");
	var data = {};
	//var response = ['<ul class="list-group">'];
	var response = [];
	Projects.find({
		username: username
	},function(err, projects) {
		console.log("getProjectLinks projects is: "+ JSON.stringify(projects));
		for (i = 0; i < projects.length; i++) {
			console.log("getProjectLinks received "+projects[i]+" for iteration nb: "+i)
			var link = 'a href="manageproject/'+projects[i].meta.projectname.replace(" ","+")+'">'+projects[i].meta.projectname+'</a';
			//var link = projects[i].meta.projectname;
			//response.push('<li class="list-group-item">'+link+'</li>');
			response.push(link);
		}
		//response.push("</ul>");
		//res = response.join(['']);
		console.log("getProjectLinks response: "+ response);
		data.links =response;			
		console.log("getMyProject data: "+ JSON.stringify(data));		
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
