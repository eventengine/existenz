var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Users = new Schema({
	username: String,
	meta:{ 
		last_modified: { type: Date, default: Date.now },
		password: String,
		hdwallet: String,
		assets: Array // { asset_id: String, asset_name: String, asset_meta: {},project_name: String, amount: Number, total_shares: Number, percent_shares : Number, txhistory_id: Array}  
	},
	profile:{
		last_modified: { type: Date, default: Date.now },
		avatar_url: String,
		email: String,
		description: String	 
	}
});

module.exports = mongoose.model('users', Users);