// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Existenz - Equity Crowdfunding on the Blockchain
// Version : 0.0.1
// License: 
//

var mongoose = require('mongoose');


exports.index = function (req, res) {
    var data = {
        title: " Existenz - Equity Crowdfunding on the Blockchain"
    };
    res.render('index/index', data);
};