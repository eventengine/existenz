var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Projects = new Schema({
	username: String,
	projectname: String,
	meta:{ 
		last_modified: { type: Date, default: Date.now },
		admin: {
			username: String,
			firstname: String,
			lastname: String,
			email : String,
			administrators:Array
			
		},
		hdwallet: String,
		asset: Array
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