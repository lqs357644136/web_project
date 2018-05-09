<template>
    <div class="panel">
        <panel-title :back="true" :title="$route.meta.title"></panel-title>
        <div class="panel-body inspecRcord">
            <rcordList v-if="showList" v-on:choiceListen="choiceListen"></rcordList>
            <rcordInfo v-else v-on:choiceListen="choiceListen"></rcordInfo>
        </div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Input,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Row,
  Col,
  Pagination,
  DatePicker,
} from "element-ui";
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(DatePicker);
/////////////////////////////
import { panelTitle } from "components";
import url from "api";
import imageView from "vue-imageview";
import rcordList from "./components/rcordList.vue";
import rcordInfo from "./components/rcordInfo.vue";
export default {
  name: "inspecRecord",
  data() {
    return {
      showList: true
    };
  },
  created() {},
  methods: {
    choiceListen(flag) {
      this.showList = flag;
    }
  },
  components: {
    panelTitle,
    rcordList,
    rcordInfo
  }
};
</script>