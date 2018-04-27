//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
import "assets/css/animate.min.css";
//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入主视图文件
import App from './App'
//导入过滤器
import 'common/filiter'
//导入axios请求方法
import {
  $get,
  $post,
  $get_file,
  $post_noToken,
  $get_noToken
} from 'common/fetch/index.js'
//导入工具
import {
  mainLoadingShow,
  mainLoadingClose
} from 'common/uitl.js'
//注册全局请求方法
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;
Vue.prototype.$get_noToken = $get_noToken;
Vue.prototype.$post_noToken = $post_noToken;
Vue.prototype.$get_file = $get_file;

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'
//发布后是否显示提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
