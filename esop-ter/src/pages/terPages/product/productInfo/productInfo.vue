<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body" style="padding:0">
      <productListComponent v-on:chioceListen="chioceList" v-if="chioce"></productListComponent>
      <productComponent v-on:chioceListen="chioceList" v-else productType="Info"></productComponent>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from 'vue'
import {
  Input,
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
  DatePicker,
  Tabs,
  TabPane,
} from 'element-ui'

Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(TabPane)
/////////////////////////////
import { panelTitle } from "components";
import productListComponent from "../productComponent/productListComponent.vue";
import productComponent from "../productComponent/productComponent.vue";

export default {
  data() {
    return {
      productList: null,
      chioce: true,
    };
  },
  components: {
    panelTitle,
    productListComponent,
    productComponent
  },
  created() {
  },
  methods: {
    chioceList(obj) {
      this.chioce = obj.type == "edit" ? false : true;
    }
  }
};
</script>
