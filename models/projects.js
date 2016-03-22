var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Projects = new Schema({
	meta:{ 
		last_modified: { type: Date, default: Date.now },
		projectname: String,
		admin: {
			username: String,
			firstname: String,
			lastname: String,
			email : String	
		},
		hdwallet: String
	},
	profile:{
		last_modified: { type: Date, default: Date.now },
		header:{ 
			banner_url: String,
			title: String
			},
		body:{
			website: String,
			description: String					
			},
		footer: {
			copyrigth: String
			}
	}
});

module.exports = mongoose.model('projects', Projects);