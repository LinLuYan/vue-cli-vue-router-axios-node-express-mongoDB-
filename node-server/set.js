//载入mongo模块
var mongoose = require('mongoose');
//载入session
var session = require('express-session');
//加密
var crypto = require('crypto');


//链接mongo
mongoose.connect('mongodb://localhost:27017/edu',{useMongoClient:true});


module.exports.mongoose = mongoose;
module.exports.session = session;
module.exports.crypto = crypto;