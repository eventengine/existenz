var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Txs = new Schema({
	meta:{ 
		server_private_seed: String,
		date: { type: Date, default: Date.now },
		confirmed: Boolean
	},
	tx:{		    
		"from":String,
		    "to": [{
		        "address":String,
		        "amount": Number,
		        "assetId": String
		    }],
		    "metadata":{
		        "userData":{
		            "meta":[{
		                "key":String,
		                "value": {},
		                "type":String
		            },{
		                "key":String,
		                "value": {},
		                "type":String
		            },{
		                "key":String,
		                "value": {} ,
		                "type":String
		            },{
		                "key":String,
		                "value": {},
		                "type":String
		            },{
		                "key":String,
		                "value": {},
		                "type":String
		            }]
		        }
		    }
		}
});

module.exports = mongoose.model('txs', Txs);