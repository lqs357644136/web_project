<template>
    <div class="panel batchEnter">
        <panel-title :back="true" :title="$route.meta.title"></panel-title>
        <div class="panel-body">
            <batchEnterComponent :batchType="batchType"></batchEnterComponent>
        </div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from 'vue'
import {
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Row,
  Col,
  MessageBox,
} from 'element-ui'

Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$confirm = MessageBox.confirm
/////////////////////////////
import { panelTitle } from "components";
import batchEnterComponent from "./batchEnterComponent/batchEnterComponent.vue";
export default {
  data() {
    return {
      batchType: 0
    };
  },
  components: {
    batchEnterComponent,
    panelTitle
  }
};
</script>
