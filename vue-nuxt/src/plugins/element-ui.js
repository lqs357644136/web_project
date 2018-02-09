import Vue from 'vue'

// if (process.BROWSER_BUILD) {
//   Vue.use(require('element-ui'))
// }

// import Element from 'element-ui'
// Vue.use(Element)

import {
    Input,
    InputNumber,
    Select,
    Option,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Card,
    MessageBox,
    Message,
    Notification
  } from 'element-ui'
  
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button)
  Vue.use(ButtonGroup)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(DatePicker)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Alert)
  Vue.use(Icon)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Upload)
  Vue.use(Card)
  
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message

  