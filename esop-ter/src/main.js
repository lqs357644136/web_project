//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
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
import {$get_file,$post_noToken,$get_noToken } from 'common/fetch/index.js'
//导入工具
import { getMacINfo,api_baseurl,kanBanUrl } from 'common/uitl.js'
//导入国际化设置
import i18n from 'common/i18n'

//导入element组件
//import ElementUI from 'element-ui'
//使用element-ui
//Vue.use(ElementUI)
// import {
//   Input,
//   InputNumber,
//   Select,
//   Option,
//   Button,
//   ButtonGroup,
//   Table,
//   TableColumn,
//   DatePicker,
//   Form,
//   FormItem,
//   Tabs,
//   TabPane,
//   Alert,
//   Icon,
//   Row,
//   Col,
//   Card,
//   MessageBox,
//   Message,
//   Notification
// } from 'element-ui'

// Vue.use(Input)
// Vue.use(InputNumber)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Button)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Alert)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Card)

// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
import {Message,Card} from 'element-ui'
Vue.use(Card)
Vue.prototype.$message = Message

//发布后是否显示提示
Vue.config.productionTip = false
//注册全局请求方法
Vue.prototype.$get_noToken = $get_noToken;
Vue.prototype.$post_noToken = $post_noToken;
Vue.prototype.$get_file = $get_file;
//注册接口地址生成方法
Vue.prototype.$api_baseurl = api_baseurl;
Vue.prototype.$kanBanUrl = kanBanUrl;
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
