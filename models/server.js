var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Server = new Schema({
	server_name: String,
	meta:{ 
		private_seed: String,
		hdwallet: String
	},
	admins:{
		admin: Array
	}
});

module.exports = mongoose.model('server', Server);