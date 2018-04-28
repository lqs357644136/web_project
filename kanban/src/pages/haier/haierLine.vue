<template>
  <div class="haier_line">
    <kanbanTitle :logo="logo" title="L1线看板" :right="date"></kanbanTitle>
    <div class="kanban-body">
      <tables :tables="tablesList"></tables>
      <lineCanvas :lineCanvas="lineData"></lineCanvas>
      <news :newsData="newsState"></news>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/haier_line.scss";
import Vue from "vue";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import tables from "./component/tables.vue";
import lineCanvas from "./component/line_canvas.vue";
import news from "./component/news.vue";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "haier_line",
  data() {
    return {
      //date:$dataFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: ""
      },
      //列表数据
      tablesList: {
        table01: [],
        table02: {
          title: {
            titleKey: [],
            titleKeyCode: {}
          },
          data: []
        }
      },
      //生产线工位状态数据
      lineData: [],
      //生产信息数据
      newsState: "1"
    };
  },
  mounted() {
    this.mac_init();
    this.dateUpdate();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, 20000);
    }, 20000);
  },
  methods: {
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.haierkanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.newsState = res.data.lineStatue;
          //let maxRow = res.data.andonMaxNum;
          let maxRow = 8;
          //初始化左侧列表
          this.tablesList.table01 = [];
          for (let tables01 of res.data.scheduleDataList) {
            let obj = {
              statu: tables01.statu,
              orderNo: tables01.orderNo,
              partNo: tables01.partNo,
              schQty: tables01.schQty,
              finishQty: tables01.finishQty,
              reachRate: parseFloat(tables01.reachRate).toFixed(2) + "%",
              badNumber: tables01.badNumber,
              badRate: parseFloat(tables01.badRate).toFixed(2) + "%"
            };
            this.tablesList.table01.push(obj);
          }
          if (this.tablesList.table01.length < 7) {
            let needAdd = maxRow - this.tablesList.table01.length;
            let obj = {
              statu: "0",
              orderNo: "",
              partNo: "",
              schQty: "",
              finishQty: "",
              reachRate: "",
              badNumber: "",
              badRate: ""
            };
            for (let i = 0; i < needAdd; i++) {
              this.tablesList.table01.push(obj);
            }
          }
          //初始化右侧列表
          let table02Title_key = [];
          let table02Title_keyCode = {};
          let table02Data = [];
          // this.tablesList.table02.title = [];
          // this.tablesList.table02.data = [];
          let andonTableCol = {};
          let table02FinallyData = (num => {
            let arr = [];
            for (let i = 0; i < num; i++) arr.push({});
            return arr;
          })(maxRow);
          for (let i = 0; i < res.data.reasonAndData.reaDataList.length; i++) {
            let reasonId = res.data.reasonAndData.reaDataList[i].reasonId;
            let process = res.data.reasonAndData.reaDataList[i].process;
            let colorCode = res.data.reasonAndData.reaDataList[i].colorCode;
            for (let t = 0; t < table02FinallyData.length; t++) {
              if (!table02FinallyData[t][reasonId]) {
                table02FinallyData[t][reasonId] = {};
                table02FinallyData[t][reasonId].reasonId = reasonId;
                table02FinallyData[t][reasonId].process = process;
                table02FinallyData[t][reasonId].colorCode = colorCode;
                break;
              }
            }
            if (table02Title_key.indexOf(reasonId) == -1) {
              table02Title_key.push(reasonId);
              table02Title_keyCode[reasonId] = {
                name: res.data.reasonAndData.reaDataList[i].reasonId,
                title: res.data.reasonAndData.reaDataList[i].reasonDesc
              };
            }
          }
          table02Data = table02FinallyData;

          //最后赋值
          this.tablesList.table02.title.titleKey = table02Title_key;
          this.tablesList.table02.title.titleKeyCode = table02Title_keyCode;
          this.tablesList.table02.data = table02Data;

          //生产线工位处理
          let lineCanvasData = this.line_state();
          for (let i = 0; i < lineCanvasData.length; i++) {
            let processName = lineCanvasData[i].name;
            for (let item of res.data.reasonAndData.reaDataList) {
              if (processName == item.process) {
                if (lineCanvasData[i].colorLevel == 0) {
                  lineCanvasData[i].name = item.process;
                  lineCanvasData[i].title = item.process;
                  lineCanvasData[i].color = item.colorCode;
                  lineCanvasData[i].colorLevel = item.colorLevel;
                } else {
                  if (lineCanvasData[i].colorLevel > item.colorLevel) {
                    lineCanvasData[i].name = item.process;
                    lineCanvasData[i].title = item.process;
                    lineCanvasData[i].color = item.colorCode;
                    lineCanvasData[i].colorLevel = item.colorLevel;
                  }
                }
              }
            }
          }
          this.lineData = lineCanvasData;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    //处理安灯数据
    andonList_data_init() {},
    //动态刷新时间
    dateUpdate() {
      setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
        this.date = date;
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
    },
    //生产线状态灯
    line_state() {
      return [
        {
          name: "P01",
          title: "P01",
          color: "",
          xAxis: 4,
          colorLevel: 0
        },
        {
          name: "P02",
          title: "P02",
          color: "",
          xAxis: 10,
          colorLevel: 0
        },
        {
          name: "P03",
          title: "P03",
          color: "",
          xAxis: 16,
          colorLevel: 0
        },
        {
          name: "P04",
          title: "P04",
          color: "",
          xAxis: 22.5,
          colorLevel: 0
        },
        {
          name: "P05",
          title: "P05",
          color: "",
          xAxis: 29,
          colorLevel: 0
        },
        {
          name: "P06",
          title: "P06",
          color: "",
          xAxis: 35.5,
          colorLevel: 0
        },
        {
          name: "P07",
          title: "P07",
          color: "",
          xAxis: 59,
          colorLevel: 0
        },
        {
          name: "P08",
          title: "P08",
          color: "",
          xAxis: 64.5,
          colorLevel: 0
        },
        {
          name: "P09",
          title: "P09",
          color: "",
          xAxis: 76.5,
          colorLevel: 0
        },
        {
          name: "P10",
          title: "P10",
          color: "",
          xAxis: 96.5,
          colorLevel: 0
        }
      ];
    }
  },
  components: {
    kanbanTitle,
    tables,
    lineCanvas,
    news
  }
};
</script>
