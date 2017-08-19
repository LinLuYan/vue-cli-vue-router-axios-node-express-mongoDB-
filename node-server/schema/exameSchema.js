var moment = require('moment');

var config = require('../config');
var mongoose = config.mongoose;
var defaultTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

// Schema 结构
var exameSchema = new mongoose.Schema({
    exameTitle  : {type : String},
    time        : {type : String, default: defaultTime},
    datas       : {type:Array,default:[]}
});

var exameModel = mongoose.model('exame', exameSchema);
module.exports = exameModel;