import Vue from 'vue'
import App from './App'
import router from './router'
import request from 'js/request.js'
import store from './store'
import 'js/permission.js'
import { addRoleRouter } from 'js/util.js'

//axios全局化
Vue.prototype.$http = request

Vue.config.productionTip = false

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
  },
  methods:{
    
  },
  render: h => h(App)
})
