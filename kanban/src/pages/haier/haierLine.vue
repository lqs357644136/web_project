<template>
  <div class="haier_line">
    <kanbanTitle :logo="logo" :title="titleName+'线看板'" :right="date"></kanbanTitle>
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
      titleName: "",
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: "",
        eachTime: 8000
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
    this.titleInit();
    this.mac_init();
    this.dateUpdate();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 20000);
  },
  methods: {
    titleInit() {
      if (this.$route.query.line) {
        this.titleName = this.$route.query.line;
      } else {
        this.titleName = Window.GETMACINFO().line;
      }
    },
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
          if (res.data.reasonAndData.reaDataList.length>0) {
            for (let i = 0;i < res.data.reasonAndData.reaDataList.length;i++) {
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
          }else{
            for (let i = 0;i < res.data.reasonTypes.length;i++) {
              let reasonId = res.data.reasonTypes[i].reasonid;
              let reasonDesc = res.data.reasonTypes[i].reasondesc;
              table02Title_key.push(reasonId);
              table02Title_keyCode[reasonId] = {
                name: reasonId,
                title: reasonDesc
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
        let date = $dataFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss");
        let mydate = new Date();
        let myddy = mydate.getDay(); //获取存储当前日期
        let weekday = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
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
    },
    //生产线状态灯
    line_state() {
      return [
        {
          name: "SC01",
          title: "SC01",
          color: "",
          xAxis: 0.5,
          colorLevel: 0
        },
        {
          name: "SC02",
          title: "SC02",
          color: "",
          xAxis: 3.5,
          colorLevel: 0
        },
        {
          name: "SC03",
          title: "SC03",
          color: "",
          xAxis: 7,
          colorLevel: 0
        },
        {
          name: "SC04",
          title: "SC04",
          color: "",
          xAxis: 10,
          colorLevel: 0
        },
        {
          name: "SC05",
          title: "SC05",
          color: "",
          xAxis: 13.5,
          colorLevel: 0
        },
        {
          name: "SC06",
          title: "SC06",
          color: "",
          xAxis: 16.5,
          colorLevel: 0
        },
        {
          name: "SC07",
          title: "SC07",
          color: "",
          xAxis: 20,
          colorLevel: 0
        },
        {
          name: "SC08",
          title: "SC08",
          color: "",
          xAxis: 23,
          colorLevel: 0
        },
        {
          name: "YJ01",
          title: "YJ01",
          color: "",
          xAxis: 26.5,
          colorLevel: 0
        },
        // {
        //   name: "HD01",
        //   title: "HD01",
        //   color: "",
        //   xAxis: 29.5,
        //   colorLevel: 0
        // },
        {
          name: "HD01",
          title: "HD01",
          color: "",
          xAxis: 44.5,
          colorLevel: 0
        },
        {
          name: "HD02",
          title: "HD02",
          color: "",
          xAxis: 53.5,
          colorLevel: 0
        },
        {
          name: "HD03",
          title: "HD03",
          color: "",
          xAxis: 69.5,
          colorLevel: 0
        },
        {
          name: "HD04",
          title: "HD04",
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
