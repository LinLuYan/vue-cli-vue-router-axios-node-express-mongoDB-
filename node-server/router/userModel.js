var userModel = require('../schema/userSchema');
var config = require('../config');
var utils = require('../utils/utils');
var moment = require('moment');

module.exports = function(app){
	//对应的路由方法
	//注册
	app.post('/user/register',function(req,res){
		if(!req.body.name || !req.body.passWord) return res.json({result:false,msg:'请输入需要注册的账号和密码！'});
        var name = req.body.name;
        var userName = req.body.userName;
        var passWord = req.body.passWord;
        var data = {
			name:utils.encrtpoHandler(name),
            userName:userName,
		    passWord:utils.encrtpoHandler(passWord),
		};
		userModel.find({name:data.name},function(error,doc){
			if(error){
				console.log(error);
			}else{
				if(doc.length){
					res.json({
						result:false,
						msg:'该账号已存在！'
					});
				}
				else{
					//账号不存在时,才会创建新的账号.
					userModel.create(data,function(error){
						if(error){
							console.log(res);
						}else{
							console.log('user creat success');
							res.json({result:true,msg:'注册成功',url:'/#/home/login'});
						}
					})
				}
			}
		});
	});
    //登陆
    app.post('/user/login',function(req,res){
    	var data = {
    		name:utils.encrtpoHandler(req.body.name),
    		passWord:utils.encrtpoHandler(req.body.passWord),
    	};

    	userModel.findOne({name:data.name},function(error,doc){
    		if(error){
    			console.log(error);
    		}
    		else{
                if(doc != null){
                	//账号存在时，才会继续验证密码
                    userModel.findOne(data,function(error,doc){
			    		if(error){
			    			console.log(error);
			    		}else{
			    			if(doc != null){
			    				var userName = doc.name;
			            		var _id = doc._id;
                                req.session.user = {
                                    name:userName,
                                    id:_id
                                }

                                res.json({result:true,url:'/#/home/index/exame'});

			    			}else{
			    				res.json({
			    					result:false,
			    					msg:'您的密码输入有误！'
			    				})
			    			}
			    		}
			    	})
                }else{
                	res.json({
                		result:false,
                		msg:'您的账号不存在！'
                	})
                }
    		}
    	})
    });
    //注销
    app.get('/user/loginOut',function(req,res){
    	if(!req.session.user) return res.json({result:false,url:'/#/home/login',msg:'登录已过时，请重新登录！'})
    	if(req.session.user){
    		// req.session.user = null;
            req.session.destroy();
	    	res.json({
	    		result:true,
	    		msg:'注销成功！',
	    		url:'/#/home/login',
	    	});
    	}
    	else{
    		res.json({
	    		result:true,
	    		msg:'已注销！',
	    		url:'/#/home/login',
	    	});
    	}
    });
    //修改密码
    app.post('/user/reSet',function(req,res){
    	if(!req.session.user) return res.json({result:false,url:'/#/home/login',msg:'登录已过时，请重新登录！'})
    	if(req.session.user){
            var data = {
                _id:req.session.user.id,
            	passWord:utils.encrtpoHandler(req.body.oldPassWord),
            };

            var setData = {
                passWord:utils.encrtpoHandler(req.body.newPassWord),
                userName:req.body.user
            };

            userModel.findOne(data,function(error,doc){
                if(error){
                    console.log(error);
                }else{
                    if(doc){
                        userModel.update(data, {$set:setData}, function(error,doc){
                            if(error){
                                console.log(error);
                            }else{
                                if(doc != null){
                                    res.json({
                                        result:true,
                                        msg:'修改成功！',
                                    });
                                }
                            }
                        })
                    }
                    else{
                        res.json({
                            result:false,
                            msg:'旧密码不正确！'
                        })
                    }
                }
            })
            
            
    	}
    	else{
    		res.json({
    			result:false,
                msg:'您还未登陆，无法修改密码！',
                url:'/#/home/login',
    		});
    	}
    });
    //获取用户信息
    app.post('/user/info',function(req,res){
    	if(!req.session.user) return res.json({result:false,url:'/#/home/login',msg:'登录已过时，请重新登录！'})
    	if(req.session.user){
    		var id = req.session.user.id;
    		userModel.findOne({_id:id},function(error,doc){
    			if(error){
    				console.log(error)
    			}
    			else{
    				var userName = doc.userName;
                    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    				res.json({
    					result:true,
    					json:userName,
                        time:time
    				})
    			}
    		})
    	}
    })
}