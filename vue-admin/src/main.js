import Vue from 'vue'
import App from './App'
import router from './router'
import request from 'js/request.js'
import store from './store'

//axios全局化
Vue.prototype.$http = request

// Vue.config.productionTip = false

//引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入公共样式
import 'sass/common.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){

console.log(this.$lin)
    this.checkLogin()
  },
  methods:{
    checkLogin(){
      if(true){
        router.push({name:'login'})
      }else{
        router.push({name:'home'})
      }
    }
  },
  render: h => h(App)
})
