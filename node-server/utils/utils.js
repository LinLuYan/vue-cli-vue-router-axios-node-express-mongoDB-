var config = require('../config');
var crypto = config.crypto;
var jwt = config.jsonwebtoken;

module.exports = {
	encrtpoHandler:function(str){
        var md5 = crypto.createHash('md5').update(str);
        return md5.digest('hex');
	},
	jwtHandler:function(){
		return jwt;
	},
	cookieHandler:function(name, val, opt){
		var pairs = [name + '=' + val];
		opt = opt || {};
		if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
		if (opt.domain) pairs.push('Domain=' + opt.domain);
		if (opt.path) pairs.push('Path=' + opt.path);
		if (opt.expires) pairs.push('Expires=' + opt.exppires.toUTCString());
		if (opt.httpOnly) pairs.push('HttpOnly');
		if (opt.secure) pairs.push('Secure');

		return pairs.join(';');
	},
	cookieFilter:function(cookie){
		var cookie = cookie || "";
	    var args = {};
	    if(!!cookie && cookie.indexOf("token") > -1){
	        var temp = cookie.split(";");
	        for(var i=0;i<temp.length;i++){
	            var item = temp[i];
	            if(item.indexOf("token") <= -1) continue;
	            else{
	                var ops = item.indexOf("=");
	                args[item.substring(0,ops).replace(/(^\s*)|(\s*$)/g, "")] = item.substring(ops+1,item.length).replace(/(^\s*)|(\s*$)/g, "");
	            }
	        }
	    }
	    return args;
	},
	sessionFail:function(){
		return {result:false,url:'/#/home/login',msg:'登录已过时，请重新登录！'}
	}()
}