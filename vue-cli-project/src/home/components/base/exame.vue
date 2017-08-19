<template>
    <div class="exame">
        <div>
            <center class="title">{{params}}</center>
        </div>
        <div class="btnCon">
            <el-button type="primary" size="small" @click="dataAjaxHandler">保存</el-button>
        </div>
        <div class="content">
            <table class="exameTable">
                <tr>
                    <td class="tdTitle">考试：</td>
                    <td>
                        <el-input v-model="form.exameTitle" placeholder="请输入内容" size="small"></el-input>
                    </td>
                    <td class="tdManage">
                        <el-button type="primary" size="small" @click="addQuestion()">新增题目</el-button>
                    </td>
                </tr>
                <template v-for="(item,index) in form.datas">
                    <tr>
                        <td :rowspan="item.points.length + 1" class="tdTitle">题目{{index+1}}：</td>
                        <td>
                            <el-input v-model="item.question" placeholder="请输入内容" size="small"></el-input>
                        </td>
                        <td class="tdManage">
                            <el-button type="primary" size="small" @click="addPoint(index)">新增考点</el-button>
                            <el-button type="danger" size="small" @click="delQuestion(index)">删除本题</el-button>
                        </td>
                    </tr>
                    <template v-for="(pt,$index) in item.points">
                        <tr>
                            <td>
                                <div class="pointDiv">
                                    <table>
                                        <tr>
                                            <td width="50">考点{{$index+1}}：</td>
                                            <td>
                                                <textarea rows="3" v-model="pt.name"></textarea>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <el-form :inline="true">
                                    <el-form-item>
                                        <el-button type="danger" size="small" @click="delPoint(index,$index)">删除考点</el-button>
                                    </el-form-item>
                                </el-form>
                            </td>
                        </tr>
                    </template>
                </template>
            </table>
        </div>
        <template>
            <el-button :plain="true" class="message"></el-button>
        </template>
    </div>    
</template>

<script>
    import utils from '../../../utils/utils'
export default {
    name: 'exame',
    props:['params'],
    data () {
        return {
            form:{
                exameTitle:"",
                datas:[
                    {
                        question:"",
                        points:[
                            {name:""},
                        ]
                    },
                ]
            },
            utils:utils
        }
    },
    created:function(){
        var that = this,
            id = that.utils.getParams(location.href).id;
        if(id){
            that.$http({
                url:"/exame/one",
                method:"get",
                params:{
                    id:id
                }
            }).then(function(res){
                if(res.status == 200){
                    if(res.data.result){
                        res.data.json.exameTitle?that.form.exameTitle = res.data.json.exameTitle:that.form.exameTitle = "";
                        res.data.json.datas?that.form.datas = res.data.json.datas:that.form.datas;
                    }
                }
            })
        }
    },
    methods:{
        addQuestion:function(){
            this.form.datas.push({
                question:"",
                points:[
                    {name:""},
                ]
            });
        },
        delQuestion:function(index){
            this.form.datas.splice(index,1);
        },
        addPoint:function(index){
            this.form.datas[index].points.push({
                name:""
            });
        },
        delPoint:function(index,$index){
            this.form.datas[index].points.splice($index,1);
        },
        dataAjaxHandler:function(){
            var that = this,
                id = that.utils.getParams(location.href).id;
            if(id){
                URL = "exame/edit";
                var data = {
                    datas:JSON.stringify(that.form),
                    exameTitle:that.exameTitle,
                    id:id
                }
            }
            else{
                URL = "/exame/add";
                var data = {
                    datas:JSON.stringify(that.form),
                    exameTitle:that.exameTitle
                }
            }
            that.$http({
                url:URL,
                method:"post",
                data:data
            }).then(function(res){
                if(res.status == 200){
                    if(res.data.result){
                        that.$message.success(res.data.msg);
                    }
                    else{
                        that.$message.error(res.data.msg);
                        if(res.data.url) location.href = res.data.url;
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.exame{
    position:relative;
    .btnCon{
        position:absolute;
        right:15px;
        top:5px;
    }
    .title{
        font-size:16px;
        padding-top:8px;
        color:#1f2f3d;
        margin-bottom:15px;
    }
    .content{
        
        .exameTable{
            width:99%;
            height:100%;
            border-collapse:collapse;
            margin:0px auto;

            .tdTitle{
                font-size:14px;
                text-align:right;
                width:100px;
            }

            .tdManage{
                width:153px;
                padding-left:3px;
            }

            td{
                border:1px solid #999;
            }

            .pointDiv{
                width:100%;
                
                table{
                    width:100%;
                    td{
                        border:none;
                    }
                }
                textarea{
                    width:90%;
                    border:1px solid #999;
                    border-radius:3px;
                    padding:2px;
                }
            }
        }
    }
    .message{
        display:none;
    }
}
</style>