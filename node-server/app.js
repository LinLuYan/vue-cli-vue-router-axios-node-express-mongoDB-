var express = require('express')
var bodyParser = require("body-parser");
var session = require('express-session');

var config = require('./config');
var utils = require('./utils/utils');
var mongoose = config.mongoose;
var session = config.session

var port = process.env.PORT || 3000;
var app = express();

var userModel = require('./router/userModel');
var exameModel = require('./router/exameModel');
var scoreModel = require('./router/scoreModel');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
//过期时间
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*20 //过期时间设置(单位毫秒)
    },
}));

app.use(function(req,res,next){
    var sessionID = req.body.ID;
    if(req.session.user){
        exameModel(app);
        scoreModel(app);
    }
    userModel(app);
    next();
})

console.log('edu started on port' + port);

app.use('/mvvm', express.static(__dirname + '/mvvm'));

app.listen(port)




