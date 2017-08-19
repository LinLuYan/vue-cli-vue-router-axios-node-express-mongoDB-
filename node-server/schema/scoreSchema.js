var moment = require('moment');

var config =require('../config');
var mongoose = config.mongoose;

var defaultTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

// Schema 结构
var scoreSchema = new mongoose.Schema({
	studentName : {type : String},
	exameTitle  : {type : String},
	exameTime   : {type : String},
    exame_id    : {type : String},
    time        : {type : String, default: defaultTime},
    scores      : {type:Array,default:[]}
});

var scoreModel = mongoose.model('score', scoreSchema);
module.exports = scoreModel;