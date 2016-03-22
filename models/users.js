var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Users = new Schema({
	meta:{ 
		last_modified: Date,
		username: String,
		password: String,
		hdwallet: String
	},
	profile:{
		last_modified: Date,
		avatar_url: String,
		email: String,
		description: String	 
	}
});

module.exports = mongoose.model('users', Users);