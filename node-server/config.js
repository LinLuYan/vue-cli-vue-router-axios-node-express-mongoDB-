//载入mongo模块
var mongoose = require('mongoose');
//载入session
var session = require('express-session');
//加密
var crypto = require('crypto');
//jwt签名
var jsonwebtoken = require('jsonwebtoken');
//key
var secretKey = 'yangeweiwu!'//焱哥威威


//链接mongo
mongoose.connect('mongodb://localhost:27017/edu',{useMongoClient:true});


module.exports.mongoose = mongoose;
module.exports.session = session;
module.exports.crypto = crypto;
module.exports.jsonwebtoken = jsonwebtoken;
module.exports.secretKey = secretKey;