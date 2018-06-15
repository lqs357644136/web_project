<template>
  <div class="x-r">
    <template v-if="!showDialog">
      <el-tabs type="border-card" class="tabs">
        <el-tab-pane>
          <span @click="chartInfoTabClick()" slot="label">基础信息</span>
          <baseInfo></baseInfo>
        </el-tab-pane>
        <el-tab-pane>
          <span @click="chartInfoTabClick()" slot="label">样本测定值</span>
          <checkTable></checkTable>
        </el-tab-pane>
        <el-tab-pane>
          <span @click="chartInfoTabClick('chart')" slot="label">x-bar管制图</span>
          <chartInfo v-if="chartShow"></chartInfo>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="backBtn">
        <el-button @click="backSpec()">返 回</el-button>
      </div> -->
    </template>
    <template v-else>
      <el-dialog title="请输入Xbar查询条件" class="xbarDialog" :visible.sync="showDialog" width="50%">
        <span>
          <el-select v-model="searchXbarInput.processInput" placeholder="请选择机台">
            <el-option v-for="item in searchSelect.processOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model="searchXbarInput.dates" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xbarSearch()" type="primary">确 定</el-button>
          <el-button @click="xbarSearchDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </template>

  </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Input,
  Select,
  Option,
  Button,
  ButtonGroup,
  Row,
  Col,
  Tabs,
  TabPane,
  MessageBox,
  Dialog,
  Tooltip,
  DatePicker,
  Form,
  FormItem,
} from "element-ui";

Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$alert = MessageBox.alert;
/////////////////////////////
import baseInfo from "./component/baseInfo.vue";
import checkTable from "./component/checkTable.vue";
import chartInfo from "./component/chartInfo.vue";
import url from "api";
export default {
  name: "x-r",
  data() {
    return {
      showDialog: true,
      chartShow: false,
      searchXbarInput: {
        id: "",
        processInput: "",
        line: "",
        dates: []
      },
      searchSelect: {
        processOption: []
      },
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.data_init();
  },
  mounted() {},
  methods: {
    //点击图表
    chartInfoTabClick(type) {
      if (type) {
        this.chartShow = true;
      } else {
        this.chartShow = false;
      }
    },
    //返回检测规范
    backSpec() {
      this.$emit("xBarChooseListen");
    },
    //初始化工位
    get_processSelect() {
      this.searchSelect.processOption = [];
      this.$get_noToken({
        url: this.$api_baseurl(url.check_getProcess),
        params: {
          line: this.searchXbarInput.line
        }
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.process + "-" + opt.processname,
              value: opt.process
            };
            this.searchSelect.processOption.push(option);
          }
        }
      });
    },
    //获取url中的id
    get_urlId() {
      this.searchXbarInput.id = this.$route.query.id;
    },
    //初始化数据
    data_init() {
      this.get_processSelect();
      this.get_urlId();
    },
    //查询xBar
    xbarSearch() {
      let params = {
        id: this.searchXbarInput.id
        // process:this.searchXbarInput.processInpu,
        // startTime:this.searchXbarInput.dates[0],
        //endTime:this.searchXbarInput.dates[0],
      };
      this.$get_noToken({
        url:this.$api_baseurl(url.get_xBar),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.xBarInfo = res.data;
          this.$store.dispatch("set_xbar", res.data);
          this.xbarSearchDialog = false;
          this.showDialog = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  components: {
    baseInfo,
    checkTable,
    chartInfo
  }
};
</script>