<template>
    <div class="alsBuild">
        <kanbanTitle class="titleStyle" :logo="logo" :title="titleName" :right="date"></kanbanTitle>
        <div class="kanban-body">
            <alsBuildInfo :info="info"></alsBuildInfo>
            <alsEntityList :list="list"></alsEntityList>
            
            <alsBuildChart :chartData="chartData"></alsBuildChart>
        </div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/alsBuild.scss";
/////////////////////////////
import alsBuildInfo from "./components/alsBuildInfo.vue";
import alsEntityList from "./components/alsEntityList.vue";
import alsBuildChart from "./components/alsBuildChart.vue";
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "alsWare",
  data() {
    return {
      titleName: "",
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: "",
        eachTime: 8000
      },
      info: {
        manager: {},
        attendance: {},
        andon: []
      },
      list:[],
      chartData:{
          xAxis:[],
          data:{
              plan:[],
              real:[],
          }
      }
    };
  },
  mounted() {
    this.mac_init();
    this.titleName_init();
    this.dateUpdate();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 20000);
  },
  methods: {
    //初始化标题
    titleName_init() {
      this.titleName = this.macInfo.line + "线生产看板";
    },
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.getShHaiAttenScheduleAndonData),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.info.manager = res.data.manager;
          this.info.attendance = res.data.attendance;
          this.info.andon = res.data.reaDataList;
          this.list = res.data.scheduleList;
          let xAxis = [];
          let plan = [];
          let real = [];
          for(let item of res.data.zhSchelist){
              xAxis.push(item.timeInterval);
              plan.push(item.plannedOutPut);
              real.push(item.actualOutPut);
          }
          this.chartData.xAxis =xAxis;
          this.chartData.data.plan =plan;
          this.chartData.data.real =real;
        } else {
          //   this.$message.error(res.msg);
        }
      });
    },
    //动态刷新时间
    dateUpdate() {
      setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss");
        let mydate = new Date();
        let myddy = mydate.getDay(); //获取存储当前日期
        let weekday = [
          "星期日","星期一","星期二","星期三","星期四","星期五","星期六"
        ];
        this.date = date + " " + weekday[myddy];
      }, 1000);
    },
    //获取机台信息
    mac_init() {
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  },
  components: {
    kanbanTitle,
    alsBuildInfo,
    alsEntityList,
    alsBuildChart
  }
};
</script>
