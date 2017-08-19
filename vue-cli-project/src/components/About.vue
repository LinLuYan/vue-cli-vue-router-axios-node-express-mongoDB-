<template>
    <div>
        这是About
        <input type="text" v-model="name"/>
        <input type="password" v-model="passWord"/>
        <button @click="logRequestHandler">登陆</button>
        <button @click="test">请求</button>
    </div>
</template>

<script>
    import utils from '../utils/utils'
export default {
    name: 'home',
    data () {
        return { 
            name:"",
            passWord:"",
            utils:utils,
        }
    },
    created:function(){
        // this.logRequestHandler();
        // this.test();
    },
    methods:{
    	logRequestHandler:function(){
            debugger;
    		var that = this;
    		that.$http.post('/api/user/login',{
    			name: that.name,
                passWord: that.passWord,
                //ID:this.utils.getCookie('ID')
    		},{ 
                headers: {
                    "Content-Type":"application/json;charset=utf-8"
                },
                withCredentials : true,
    			emulateJSON:true,
    		}).then(function(res){
                debugger
    			//var user = res.data.json.user
                // this.ID = user.ID
                //this.utils.setCookie('ID',user.ID,7);
    		})
    	},
    	test:function(){
    		var that = this;
	    	that.$http.post('/api/exame/list',{
	            headers: {
                    "Content-Type":"application/json;charset=utf-8"
                },
                withCredentials : true,
                emulateJSON:true,
	    	}).then(function(res){
	    		debugger;
	    	})
    	},
    }
}
</script>

<style scoped>

</style>