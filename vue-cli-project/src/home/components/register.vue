<template>
    <div class="login-bg">
        <div class="login-text">
            <span class="title">欢迎注册</span>
        </div>
        <div class="login-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="帐号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.passWord"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <template>
            <el-button :plain="true" class="message"></el-button>
        </template>
    </div>    
</template>

<script>
    import utils from '../../utils/utils'
export default {
    name: 'home',
    data () {
        return {
            form:{
                userName:"",
                name:"",
                passWord:"",
                checked:false
            },
            utils:utils
        }
    },
    created:function(){  
    },
    methods:{
        register:function(){
            var that = this;
            that.$http({
                method: 'post',
                url: '/user/register',
                data:{
                    name:that.form.name,
                    userName:that.form.userName,
                    passWord:that.form.passWord
                },
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
                        that.$message.error(res.data.msg);
                    }
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
.login-bg{
    width:100%;
    height:100%;
    position:absolute;
    background:#FFFAFA;
}
.login-text{
    width:100%;
    background:url(../img/keyboard.jpg) center no-repeat;
    height:200px;
    line-height:200px;
    text-align:center;
    .title{
        color:#fff;
        font-size:24px;
    }
}

.login-box{
    width:450px;
    margin:20px auto;
    background:#fff;
    padding:20px 20px 0 0;
    border:1px solid #bfcbd9;
    border-radius:5px;
}

.message{
    display:none;
}
</style>