<template>
  <div class="panel checkEntity">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <checkMain v-if="checkMainShow"></checkMain>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import checkMain from "./components/checkMain.vue";
import url from "api";
import { panelTitle } from "components";
import {
  Input,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Row,
  Col,
  Tabs,
  TabPane,
  MessageBox,
  Select,
  Option,
} from 'element-ui'
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$alert = MessageBox.alert
export default {
  name: "firstEntity",
  data() {
    return {
      checkMainShow:false,
      macInfo: {
        equipNo: "", //机台编号
        line: "", //线程
        plant: "" //机台
      }
    };
  },
  created() {
    this.mac_init();
    this.get_entityData();
  },
  methods: {
    //初始化机器信息
    mac_init() {
      let macInfo = Window.GETMACINFO();
      this.macInfo.equipNo = macInfo.equipNo;
      this.macInfo.line = macInfo.line;
      this.macInfo.plant = macInfo.plant;
    },
    get_entityData() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line,
        process: this.macInfo.equipNo
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.terFirstCheck_info),
        params: params
      }).then(res => {
        if (res.code == 1) {
          console.log(res);
          this.$store.dispatch("set_checklist", res.data).then(()=>{
            this.checkMainShow = true;
          })
        } else {
          this.$alert(res.msg, "错误", {
            confirmButtonText: "确定",
            callback: action => {
              try {
                window.android.finish();
              } catch (e) {
                console.log(e);
              }
            }
          });
        }
      });
    }
  },
  components: {
    checkMain,
    panelTitle
  }
};
</script>
