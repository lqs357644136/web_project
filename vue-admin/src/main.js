

//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入主视图文件
import App from './App'
//导入过滤器
import 'common/filiter'
//导入axios请求方法
import { $get,$post,$get_file,$post_noToken,$get_noToken } from 'common/fetch/index.js'
//导入工具
import { getMacINfo,api_baseurl,getQueryString } from 'common/uitl.js'

//导入国际化设置
import i18n from 'common/i18n'

//按需引入图表
import VeLine from 'v-charts/lib/line'
Vue.component(VeLine.name, VeLine)

//使用element-ui
Vue.use(ElementUI)
//使用api
Vue.use(api)
//发布后是否显示提示
Vue.config.productionTip = false
//注册全局请求方法
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;
Vue.prototype.$get_noToken = $get_noToken;
Vue.prototype.$post_noToken = $post_noToken;
Vue.prototype.$get_file = $get_file;
//注册接口地址生成方法
Vue.prototype.$api_baseurl = api_baseurl;
//终端获取机器信息注册到全局
Window.GETMACINFO = getMacINfo;

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  i18n,
  ...App
}).$mount('mainbody')
