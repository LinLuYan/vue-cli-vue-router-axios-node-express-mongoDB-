<template>
    <div class="login-bg">
        <div class="login-text">
            <span class="title">欢迎登陆</span>
        </div>
        <div class="login-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.passWord"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox  v-model="form.checked">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">登陆</el-button>
                    <el-button><router-link to="/home/register">注册</router-link></el-button>
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
                name:"",
                passWord:"",
                checked:false
            },
            utils:utils
        }
    },
    created:function(){  
        this.form.name = this.utils.getCookie("name");
        this.form.passWord = this.utils.getCookie("passWord");
        this.form.checked = !!this.utils.getCookie("checked")?true:false;
        this.$watch("form.checked",this.watchChecked);
    },
    methods:{
        submit:function(){
            var that = this;
            that.$http({
                method: 'post',
                url: '/user/login',
                data:{
                    name:that.form.name,
                    passWord:that.form.passWord
                },
            }).then(function(res){
                if(res.status == 200){
                    if(res.data.result){
                        location.href = res.data.url;
                    }
                    else{
                        that.$message.error(res.data.msg);
                    }
                }
            })
        },
        register:function(){
            this.$message.error("功能未开放");
        },
        watchChecked:function(){
            if(this.form.checked){
                this.utils.setCookie("name",this.form.name,7);
                this.utils.setCookie("passWord",this.form.passWord,7);
                this.utils.setCookie("checked",toString(this.form.checked),7);
            }
            else{
                this.utils.clearCookie("name");
                this.utils.clearCookie("passWord");
                this.utils.clearCookie("checked");
            }
        }
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