// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose = require('mongoose');


exports.index = function (req, res) {
	var username = "Not logged in";
    if(req.user) {
    	username = req.user.username;
    }
    var data = {
        title: " Existenz - Equity Crowdfunding on the Blockchain",
        username: username
    };
    res.render('index/index', data);
};