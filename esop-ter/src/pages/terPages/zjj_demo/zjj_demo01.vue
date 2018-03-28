<template>
  <div class="panel zjj_demo01">
    <panel-title :logoInfo="logoInfo.logo" :center="true" :right="true" :title="$route.meta.title" :rightContext="demo01_time"></panel-title>
    <div class="panel-body ">
      <zjjdemo01list :tableList="tableList" class="zjjdemo01list"></zjjdemo01list>
      <zjjdemo01chart ref="child" :chartData="chartData" class="zjjdemo01chart"></zjjdemo01chart>
      <div class="tips">
        <span>备注: 列表中</span>
        <span>
          <i class="fa fa-square havaBron"></i> = 已经生产
          <i class="fa fa-square onBron"></i> = 正在生产
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import zjjdemo01list from "./components/zjj_demo01_list";
import zjjdemo01chart from "./components/zjj_demo01_chart";
import { $dataFormat } from "common/filiter/index.js";
import { panelTitle } from "components";
import logo from "./img/logo.png";
import url from "api";
export default {
  name: "zjj_demo01",
  data() {
    return {
      logoInfo: {
        logoFlag: true,
        logo: logo
      },
      demo01_time: $dataFormat(new Date(), "yyyy年MM月dd hh:mm:ss"),
      tableList: {
        baseInfo: {
          line: 0, //拉线
          onlineNum: 0, //应出勤人数
          realOnlineNum: 0 //实际出勤人数
        },
        list: null
      },
      chartData: {
        chart01: {
          xAxis: [],
          data: []
        },
        chart02: {
          xAxis: [],
          data: []
        }
      },
      macInfo: {
        line: "",
        plant: "",
      }
    };
  },
  created() {
    this.mac_init();
    this.get_data();
  },
  mounted() {
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
        this.$refs.child.totalChart_init();
        this.$refs.child.hourChart_init();
      }, 6000);
    }, 6000);
  },
  methods: {
    get_data() {
      this.$get_noToken({
        url: this.$kanBanUrl(url.lxkanban),
        params: {
          strPlant: this.macInfo.plant,
          strLine: this.macInfo.line,
        }
      }).then(res => {
        console.log(res)
        this.tableList.baseInfo.line = res.LineDesc;
        this.tableList.baseInfo.onlineNum = res.Att_Person;
        this.tableList.baseInfo.realOnlineNum = res.Act_Person;
        let chart01_xAxis = ['总计划','总产量'];
        let chart01_data = [];
        let chart02_xAxis = [];
        let chart02_data = [];
        let list = [];
        let planTotal = 0;
        let realTotal = 0;
        for (let i = 0; i < 6; i++) {
          if (res.Plan[i]) {
            let obj = {
              orderNo:res.Plan[i].Order_No != undefined ? res.Plan[i].Order_No : "", //订单编号
              customer:res.Plan[i].Customer != undefined ? res.Plan[i].Customer : "", //客户名称
              prno: res.Plan[i].Part_No != undefined ? res.Plan[i].Part_No : "", //产品名称
              ptno:res.Plan[i].Order_No != undefined ? res.Plan[i].Order_No : "", //产品编号
              plantNo: res.Plan[i].Sch_Qty != undefined ? res.Plan[i].Sch_Qty : "", //计划产量
              realNo: res.Plan[i].Output_Qty != undefined? res.Plan[i].Output_Qty : "", //实际产量
              reachRate:res.Plan[i].Reach_Rate != undefined? res.Plan[i].Reach_Rate.substring(0,res.Plan[i].Reach_Rate.length - 1): "", //达成率
              notGoodNum:res.Plan[i].Reach_Rate!= undefined?res.Plan[i].Reach_Rate:"",//不良数
              notGood:res.Plan[i].Bad_Rate!= undefined?res.Plan[i].Bad_Rate.substring(0,res.Plan[i].Bad_Rate.length - 1): "", //不良率
            };
            planTotal+= res.Plan[i].Sch_Qty*1;
            realTotal+= res.Plan[i].Output_Qty*1;
            list.push(obj);
          } else {
            let obj = {
              line: "", //拉线
              orderNo: "", //订单编号
              customer: "", //客户名称
              prno: "", //产品名称
              ptno: "", //产品编号
              plantNo: "", //计划产量
              realNo: "", //实际产量
              reachRate: "", //达成率
              notGoodNum: "", //不良数
              notGood: "", //不良率
            };
            list.push(obj);
          }
        }
        chart01_data = [planTotal,realTotal];
        this.tableList.list = list;

        for (let item of res.Output) {
          chart02_xAxis.push(item.Time_Cycle);
          chart02_data.push(item.Output_Qty * 1);
        }
        this.chartData.chart01.xAxis = chart01_xAxis;
        this.chartData.chart01.data = chart01_data;
        this.chartData.chart02.xAxis = chart02_xAxis;
        this.chartData.chart02.data = chart02_data;
      });
    },
    mac_init() {
      this.macInfo.plant = this.$route.query.Plant;
      this.macInfo.line =this.$route.query.Line;
    }
  },
  components: {
    panelTitle,
    zjjdemo01list,
    zjjdemo01chart
  }
};
</script>

