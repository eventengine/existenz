var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Users = new Schema({
	meta:{ 
		last_modified: { type: Date, default: Date.now },
		username: String,
		password: String,
		hdwallet: String
	},
	profile:{
		last_modified: { type: Date, default: Date.now },
		avatar_url: String,
		email: String,
		description: String	 
	}
});

module.exports = mongoose.model('users', Users);