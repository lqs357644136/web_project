<template>
  <div class="ksd_line_hz">
    <kanbanTitle :logo="logo" :title="titleName"></kanbanTitle>
    <div class="kanban-body">
      <lineHzList :list="listData"></lineHzList>
      <lineHzChart :chartData="chartData"></lineHzChart>
      <div class="msg"></div>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_line_hz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import lineHzList from "./component/lineHzList.vue";
import lineHzChart from "./component/lineHzChart.vue";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "ksd_build_hz",
  data() {
    return {
      logo: logoPng,
      titleName: "车间每日生产进度看板",
      date: "",
      macInfo: {
        plant: "1000",
        line: "BC1",
        eachTime: 8000
      },
      listData: {
        lineDesc: "",
        photo: "",
        empName: "",
        empNo: "",
        attPersonQty: "",
        actPersonQty: "",
        date: "",
        list: []
      },
      chartData: {
        xAxis: [],
        data: []
      }
    };
  },
  mounted() {
    this.mac_init();
    this.titleName_init();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 10000);
  },
  methods: {
    //初始化标题名字
    titleName_init() {
      this.titleName = this.macInfo.plant + "车间每日生产进度看板";
    },
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKStarLineKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.listData.lineDesc = res.data.lineDesc;
          this.listData.photo = res.data.photo;
          this.listData.empName = res.data.empName;
          this.listData.empNo = res.data.empNo;
          this.listData.attPersonQty = res.data.attPersonQty;
          this.listData.actPersonQty = res.data.actPersonQty;
          this.listData.date = res.data.date;
          this.listData.list = res.data.list;

          let xAxis = [];
          let chartData = [];
          for (let item of res.data.list) {
            let reachRate = 0;
            if (item.reachRate) {
              reachRate = parseInt(
                item.reachRate.substr(0, item.reachRate.length - 1)
              );
              chartData.push(reachRate);
            }else{
               chartData.push(reachRate);
            }
            xAxis.push(item.timeCycle);
          }
          this.chartData.xAxis = xAxis;
          this.chartData.data = chartData;
        } else {
          this.$message.error(res.msg);
        }
      });
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
    lineHzList,
    lineHzChart
  }
};
</script>
