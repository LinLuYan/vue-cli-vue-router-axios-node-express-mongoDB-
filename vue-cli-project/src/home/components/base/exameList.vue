<template>
    <div class="exameList">
        <div>
            <center class="title">{{params}}</center>
        </div>
        <div>
            <template>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="exameTitle" label="试卷"></el-table-column>
                    <el-table-column prop="time" label="添加时间" width="180"></el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button size="small" type="primary" @click="editExame(scope.row.id)">编辑</el-button>
                            <el-button size="small" type="primary" @click="delExame(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="pag">
            <el-pagination :page-size="records" :total="total" @current-change="handleCurrentChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>
<script>
export default{
	name:'exameList',
	props:['params'],
	data() {
        return{
            tableData:[
                {exameTitle:'333',time:'2017-05-11 14:32:39'},
            ],
            records:14,
            pages:1,
            total:14
        }
	},
	created:function(){
        this.requestExame();
	},
	methods:{
		requestExame:function(){
			var that = this;
	        that.$http({
	        	url:"/exame/list",
	        	method:"get",
	        	params:{
	        		records:that.records,
	        		pages:that.pages
	        	}
	        }).then(function(res){
	        	if(res.status == 200){
	        		if(res.data.result){
	        			that.tableData.splice(0,that.tableData.length);
	        			that.total = res.data.json.total;
	        			res.data.json.list.forEach(function(item){
	                        that.tableData.push({
	                        	exameTitle:item.exameTitle,
	                        	time:item.time,
	                        	id:item._id
	                        })
	        			})
	        		}
	        	}
	        })
		},
		handleCurrentChange:function(val){
			this.pages = val;
			this.requestExame();
		},
		editExame:function(id){
			location.href = "/#/home/index/exame?id=" + id;
		},
		delExame:function(id){
			var that = this;
			that.$http({
				url:"/exame/del",
				method:"post",
				data:{
					id:id
				}
			}).then(function(res){
				if(res.status == 200){
					if(res.data.result){
						that.$message.success(res.data.msg);
						that.requestExame();
					}else{
						if(that.data.url) location.href = res.data.url;
						that.$message.error(res.data.msg);
					}
				}
			})
		}
	}
}
</script>
<style lang='scss' scoped>
.exameList{
	.title{
        font-size:16px;
        padding-top:8px;
        color:#1f2f3d;
        margin-bottom:15px;
    }
}
</style>