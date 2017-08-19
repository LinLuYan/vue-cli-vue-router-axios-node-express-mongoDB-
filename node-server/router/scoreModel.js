var scoreModel = require('../schema/scoreSchema');

module.exports = function(app){
	//对应的路由方法
	//添加成绩
	app.post('/score/add',function(req,res){
        if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
        var reqData = JSON.parse(req.body.data);
        if(!reqData.studentName || !reqData.exameTitle) return res.json({result:false,msg:'考试名称或学生名字必填！'})
        var data = {
        	exameTitle:reqData.exameTitle,
        	exameTime:reqData.exameTime,
        	studentName:reqData.studentName,
        	exame_id:reqData.exame_id,
        	scores:reqData.scores,
        };
        scoreModel.create(data,function(error){
            if(error){
            	console.log(error);
            }else{
            	res.json({result:true,msg:'添加成功！'})
            }
        })
	})

	//编辑
	app.post('/score/edit',function(req,res){
		if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
		var reqData = JSON.parse(req.body.data);
	    if(!reqData.id) return res.json({result:false,msg:'此记录不存在！'})
	    var data = {
        	studentName:reqData.studentName,
        	scores:reqData.scores,
	    }
	    scoreModel.update({_id:reqData.id},{$set:{scores:data.scores,studentName:data.studentName}},function(error,doc){
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

	//删除
	app.post('/score/del',function(req,res){
		if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
		if(!req.body.id) return res.json({result:false,msg:'此记录不存在！'})
	    scoreModel.remove({_id:req.body.id},function(error,doc){
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

	//所有学生成绩
	app.get('/score/list',function(req,res){
		if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
		var records = req.query.records;   //请求条数
        var pages = req.query.pages;       //页码
	    scoreModel.find(function(error,docs){
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
	                    res.json({result:true,json:{list:outArr, total:total}});
	                }
	                //无请求页码
	                else{
	                    res.json({result:true,json:{list:docs, total:total}});
	                }
        		}
        		
        	}
        })		
	})

	//获取单个学生成绩
	app.get('/score/one',function(req,res){
		if(!req.session.user) return res.json({result:false,msg:'登录已过时，请重新登录！'})
		if(!req.query.id) return res.json({result:false,msg:'该考试不存在！'})
		scoreModel.find({_id:req.query.id},function(error,doc){
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