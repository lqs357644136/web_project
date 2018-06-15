<template>
  <div class="rcordInfo  animated slideInRight">
    <checkMain></checkMain>
    <div class="backBtn">
      <el-button type="primary" plain @click="backBtn()">返回</el-button>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Tabs,
  TabPane,
  Select,
  Option,
} from "element-ui";
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
/////////////////////////////
import checkMain from "./info/checkMain.vue";
export default {
  name:'rcordInfo',
  data(){
    return {}
  },
  methods:{
    backBtn(){
      console.log(123123)
      this.$emit("choiceListen", true);
    }
  },
  components: {
    checkMain
  }
}
</script>

