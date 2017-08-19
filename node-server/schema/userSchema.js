var moment = require('moment');

var config =require('../config');
var mongoose = config.mongoose;

var defaultTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

// Schema 结构
var userSchema = new mongoose.Schema({
    userName : {type : String},
    name     : {type : String},
    passWord : {type : String},
    time     : {type : String, default: defaultTime},
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;