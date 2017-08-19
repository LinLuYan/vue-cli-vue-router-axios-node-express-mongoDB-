import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建路由实例并配置路由映射  
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router = new VueRouter({
  routes:[
      {
	      path:'*',redirect:'/web'
	  },
	  {
	      path: '/home', component: require('../home/home.vue'),
	  },
	  {
	      path: '/web', component: require('../web/web.vue')//进入首页
	  },
	  {
	      path: '/home/login', component: require('../home/components/login.vue')
	  },
	  {
	      path: '/home/register', component: require('../home/components/register.vue')
	  },
	  {
	      path: '/home/index', component: require('../home/components/index.vue'),children:[
		      {
		          path: '/home/index/exame', component: require('../home/components/base/exame.vue')
		      },
		      {
		          path: '/home/index/exameList', component: require('../home/components/base/exameList.vue')
		      },
		      {
			      path: '/home/index/score', component: require('../home/components/base/score.vue')
			  },
		  ]
	  },
	  {
	      path: '/hello', component: require('../components/Hello.vue')
	  },
  ]
})

// 输出router
export default router;