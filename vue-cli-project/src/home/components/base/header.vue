<template>
    <div class="header">
        <center class="title"></center>
        <div class="user">
            <a class="userInfo">
                用户名：{{user}}
            </a>
            <a class="userInfo">
                <i class="el-icon-star-on" title="登陆时间"></i>
                <span>{{time}}</span>
            </a>
            <a class="userInfo" @click="dialogFormVisible = true">
                <i class="el-icon-setting"></i>
                <span>设置用户信息</span>
            </a>
            <a class="userInfo" @click="loginOut">
                <i class="el-icon-circle-close"></i>
                <span>注销</span>
            </a>
        </div>
        <template>
            <el-button :plain="true" class="message"></el-button>
        </template>
        <el-dialog title="用户信息设置" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="user" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input v-model="oldPassWord" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="newPassWord" type="password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ajaxDataHandler">确 定</el-button>
            </div>
        </el-dialog>
    </div>    
</template>

<script>
    import utils from '../../../utils/utils'
export default {
    name: 'home',
    data () {
        return {
            user:"",
            time:"",
            oldPassWord:"",
            newPassWord:"",
            dialogFormVisible: false,
            formLabelWidth:'120px',
            utils:utils,
        }
    },
    created:function(){
        var that = this;
        that.$http({
            url:"/user/info",
            method:"post"
        }).then(function(res){
            if(res.status == 200){
                if(res.data.result){
                    that.user = res.data.json;
                    that.time = res.data.time;
                }
                else{
                    that.utils.eleMessageCallback({
                        target:that,
                        message:res.data.msg,
                        type:'error',
                        callback:function(){
                            location.href = res.data.url;
                        }
                    })
                }
            }
        })
    },
    methods:{
        loginOut:function(){
            var that = this;
            that.$http({
                url:"/user/loginOut",
                method:"get",
            }).then(function(res){
                if(res.status == 200){
                    if(res.data.result){
                        that.utils.eleMessageCallback({
                            target:that,
                            message:res.data.msg,
                            type:'success',
                            callback:function(){
                                location.href = res.data.url;
                            }
                        })
                    }
                    else{
                        that.utils.eleMessageCallback({
                            target:that,
                            message:res.data.msg,
                            type:'error',
                            callback:function(){
                                location.href = res.data.url;
                            }
                        })
                    }
                }
            })
        },
        ajaxDataHandler:function(){
            var that = this;
            that.$http({
                url:"/user/reSet",
                method:"post",
                data:{
                    user:that.user,
                    oldPassWord:that.oldPassWord,
                    newPassWord:that.newPassWord
                }
            }).then(function(res){
                if(res.status == 200){
                    if(res.data.result){
                        that.$message.success(res.data.msg);
                        that.dialogFormVisible = false
                    }
                    else{
                        that.$message.error(res.data.msg);
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.header{
    background:url(../../img/keyboard.jpg) no-repeat;
    height:60px;
    position:relative;
    color:#fff;

    .title{
        font-size:20px;
        color:#fff;
    }

    .user{
        position:absolute;
        right:30px;
        top:20px;

        .userInfo{
            margin-right:15px;
            color:#fff;
        }
    }

    .message{
        display:none;
    }
}
</style>