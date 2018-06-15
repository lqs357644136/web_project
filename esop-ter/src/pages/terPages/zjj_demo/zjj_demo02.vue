<template>
  <div class="panel zjj_demo02">
    <panel-title :logoInfo="logoInfo.logo" :center="true" :right="true" :title="$route.meta.title" :rightContext="demo02_time"></panel-title>
    <div class="panel-body">
      <zjjdemo02list :tableList="tableList" class="zjjdemo02list"></zjjdemo02list>
      <zjjdemo02chart ref="child" :chartData="chartData" class="zjjdemo02chart"></zjjdemo02chart>
      <!-- <div class="tips">
        <span>备注: 列表中</span>
        <span>
          <i class="fa fa-square havaBron"></i> = 已经生产
          <i class="fa fa-square onBron"></i> = 正在生产
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
import zjjdemo02list from "./components/zjj_demo02_list";
import zjjdemo02chart from "./components/zjj_demo02_chart";
import { $dataFormat } from "common/filiter/index.js";
import { panelTitle } from "components";
import logo from "./img/logo.png";
import url from "api";
export default {
  name: "zjj_demo02",
  data() {
    return {
      demo02_time: $dataFormat(new Date(), "yyyy年MM月dd hh:mm:ss"),
      logoInfo: {
        logoFlag: true,
        logo: logo
      },
      tableList: {
        baseInfo: {
          plantNum: 0, //车间人数
          onlineNum: 0 //应出勤
        },
        list: null
      },
      chartData: {
        xAxis: [],
        planNum: [],
        realNum: []
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
        this.$refs.child.plantChart_init();
      }, 6000);
    }, 6000);
  },
  methods: {
    get_data() {
      this.$get_noToken({
        url: this.$kanBanUrl(url.plantkanban),
        params: {
          strPlant: this.macInfo.plant
        }
      }).then(res => {
        this.tableList.baseInfo.onlineNum = res.Act_Person;
        this.tableList.baseInfo.plantNum = res.Att_Person;
        let list = [];
        for (let i = 0; i < 6; i++) {
          if (res.Plan[i]) {
            let obj = {
              line: res.Plan[i].Line != undefined ? res.Plan[i].Line : "", //拉线
              orderNo:
                res.Plan[i].Order_No != undefined ? res.Plan[i].Order_No : "", //订单编号
              customer:
                res.Plan[i].Customer != undefined ? res.Plan[i].Customer : "", //客户名称
              prno: res.Plan[i].Part_No != undefined ? res.Plan[i].Part_No : "", //产品名称
              ptno:
                res.Plan[i].Order_No != undefined ? res.Plan[i].Order_No : "", //产品编号
              planNo:
                res.Plan[i].Sch_Qty != undefined ? res.Plan[i].Sch_Qty : "", //计划产量
              realNo:
                res.Plan[i].Output_Qty != undefined
                  ? res.Plan[i].Output_Qty
                  : "", //实际产量
              reachRate:
                res.Plan[i].Reach_Rate != undefined
                  ? res.Plan[i].Reach_Rate.substring(
                      0,
                      res.Plan[i].Reach_Rate.length - 1
                    )
                  : "", //达成率
              lack: res.Plan[i].Mat_Min != undefined ? res.Plan[i].Mat_Min : "", //缺料
              notGoodlack:
                res.Plan[i].Bad_Min != undefined ? res.Plan[i].Bad_Min : "", //不良来料
              macError:
                res.Plan[i].Equip_Min != undefined ? res.Plan[i].Equip_Min : "", //设备故障
              changeLine:
                res.Plan[i].Line_Min != undefined ? res.Plan[i].Line_Min : "", //转线
              haveBron:
                res.Plan[i].Prod_Status != undefined
                  ? res.Plan[i].Prod_Status
                  : "" //生成状态(生产 暂停 已生产)
            };
            list.push(obj);
          } else {
            let obj = {
              line: "", //拉线
              orderNo: "", //订单编号
              customer: "", //客户名称
              prno: "", //产品名称
              ptno: "", //产品编号
              planNo: "", //计划产量
              realNo: "", //实际产量
              reachRate: "", //达成率
              lack: "", //缺料
              notGoodlack: "", //不良来料
              macError: "", //设备故障
              changeLine: "", //转线
              haveBron: "" //生成状态(生产 '')
            };
            list.push(obj);
          }
        }
        this.tableList.list = list;

        let chart_xAxis = [];
        let chart_planNums = [];
        let chart_realNums = [];
        for (let item of res.Output) {
          chart_xAxis.push(item.Line);
          chart_planNums.push(item.Sch_Qty * 1);
          chart_realNums.push(item.Output_Qty * 1);
        }
        this.chartData.xAxis = chart_xAxis;
        this.chartData.planNum = chart_planNums;
        this.chartData.realNum = chart_realNums;
      });
    },
    mac_init() {
      this.macInfo.plant = this.$route.query.Plant;
      this.macInfo.line =this.$route.query.Line;
    }
  },
  components: {
    panelTitle,
    zjjdemo02list,
    zjjdemo02chart
  }
};
</script>

