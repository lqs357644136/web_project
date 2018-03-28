//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import store from 'store'
//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
//导入主视图文件
import App from './App'

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
import {Card} from 'element-ui'
Vue.use(Card)

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
