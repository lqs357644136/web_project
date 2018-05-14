<template>
  <div class="ksd_build_hz">
    <kanbanTitle :logo="logo" :title="titleName" ></kanbanTitle>
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
import url from "api";
export default {
  name: "ksd_build_hz",
  data() {
    return {
      titleName:'车间生产管理看板',
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "1000",
        eachTime: 8000
      },
      list:{
        info:null,
        list:[],
      },
      charts: {
        xAxis:[],
        data01:[],
        data02:[],
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
    //初始化标题名字
    titleName_init() {
      this.titleName = this.macInfo.plant + "车间生产管理看板";
    },
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKeShiDarPlantKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.list.info = res.data.attStaff;
          this.list.list = res.data.list;
          let data01 = [];
          let data02 = [];
          let xAxis = [];
          for(let item of res.data.list){
            console.log(item)
            data01.push(item.actulQty);
            data02.push(this.takenNum(item.rentPercent));
            xAxis.push(item.lineDesc);
          }
          this.charts.xAxis = xAxis;
          this.charts.data01 = data01;
          this.charts.data02 = data02;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //处理百分数
    takenNum(str){
      let num = str.split('%')[0]*1;
      return num.toFixed(2);
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
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
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
