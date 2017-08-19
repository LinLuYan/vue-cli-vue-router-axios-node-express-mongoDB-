var exameModel = require('../schema/exameSchema');
var utils = require('../utils/utils')

module.exports = function(app){
	//对应的路由方法
	//添加考试
	app.post('/exame/add',function(req,res){
		if(!req.session.user) return res.json(utils.sessionFail);
		var reqData = JSON.parse(req.body.datas);
        if(!reqData.exameTitle) return res.json({result:false,msg:'考试名称必填！'});
        var data = {
        	exameTitle:reqData.exameTitle,
        	datas:reqData.datas,
        };
        exameModel.create(data,function(error){
            if(error){
            	console.log(error);
            }else{
            	res.json({result:true,msg:'添加成功！'})
            }
        })
	});

	//编辑考试
	app.post('/exame/edit',function(req,res){
		if(!req.session.user) return res.json(utils.sessionFail);
		var reqData = JSON.parse(req.body.datas);
		if(!req.body.id) return res.json({result:false,msg:'此记录不存在！'})
	    var data = {
	    	exameTitle:reqData.exameTitle,
	    	datas:reqData.datas,
	    }
	    exameModel.update({_id:req.body.id},{$set:{datas:data.datas}},function(error,doc){
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
	})

	//删除考试
	app.post('/exame/del',function(req,res){
		if(!req.session.user) return res.json(utils.sessionFail);
		if(!req.body.id) return res.json({result:false,msg:'此记录不存在！'})
	    exameModel.remove({_id:req.body.id},function(error,doc){
	    	if(error){
	    		console.log(error);
	    	}else{
	    		if(doc != null){
	    			res.json({
	    				result:true,
	    				msg:'删除成功！'
	    			})
	    		}
	    	}
	    })
	})

	//所有考试
	app.get('/exame/list',function(req,res){
		if(!req.session.user) return res.json(utils.sessionFail);
		var records = req.query.records;   //请求条数
        var pages = req.query.pages;       //页码
        exameModel.find(function(error,docs){
        	if(error){
        		console.log(error,docs);
        	}else{
        		if(docs != null){
        			//请求页码
        			var total = docs.length;
	                if(records && pages){
	                    var count = Math.ceil(total/records);               //总页码数
	                    var pointer = (pages-1)*records;                    //数组指针
	                    var outArr = docs.slice(pointer,parseInt(pointer) + parseInt(records));   //从全部列表截取
	                    res.json({
	                    	result:true,
	                    	json:{
	                    		list:outArr, total:total
	                    	}
	                    });
	                }
	                //无请求页码
	                else{
	                    res.json({result:true,json:{list:docs, total:total}});
	                }
        		}
        		
        	}
        });
	})

	//获取单个考试
	app.get('/exame/one',function(req,res){
		if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
		if(!req.query.id) return res.json({result:false,msg:'该考试不存在！'})
		exameModel.find({_id:req.query.id},function(error,doc){
			if(error){
				console.log(error);
			}else{
				if(doc != null){
					res.json({
						result:true,
						json:doc[0]
					})
				}
			}
		})
	})
}