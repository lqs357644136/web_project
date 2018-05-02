<template>
  <div class="ksd_build_hz">
    <kanbanTitle :logo="logo" title="车间生产管理看板" :right="date"></kanbanTitle>
    <div class="kanban-body">
      <buildHzList :tableList="list"></buildHzList>
      <buildHzChart :chartData="charts"></buildHzChart>
      <div class="msg"></div>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_build_hz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import logoPng from "./img/logo.png";
import buildHzList from "./component/buildHzList.vue";
import buildHzChart from "./component/buildHzChart.vue";
export default {
  name: "ksd_build_hz",
  data() {
    return {
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: ""
      },
      list: [],
      charts: []
    };
  },
  mounted() {
    this.mac_init();
    this.dateUpdate();
    this.get_data();
    // setTimeout(() => {
    //   setInterval(() => {
    //     this.get_data();
    //   }, 20000);
    // }, 20000);
  },
  methods: {
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      // this.$get_noToken({
      //   url: this.$api_baseurl(url.getAttendanceScheduleList),
      //   params: params
      // }).then(res => {
      //   console.log(res);
      //   if (res.code == 1) {

      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
    },
    //动态刷新时间
    dateUpdate() {
      setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss");
        let mydate=new Date();
        let myddy=mydate.getDay();//获取存储当前日期
        let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        this.date = date+' '+weekday[myddy];
      }, 1000);
    },
    //获取机台信息
    mac_init() {
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      } else {
        this.macInfo.plant = Window.GETMACINFO().plant;
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      } else {
        this.macInfo.line = Window.GETMACINFO().line;
      }
    }
  },
  components: {
    kanbanTitle,
    buildHzList,
    buildHzChart
  }
};
</script>
