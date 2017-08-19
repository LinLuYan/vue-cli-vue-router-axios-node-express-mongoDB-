import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios
Vue.use(ElementUI);


new Vue({
    el: '#app',
    router,
    render:(function(h){
        return h(App);
    }),
})