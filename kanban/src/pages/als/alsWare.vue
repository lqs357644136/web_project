<template>
  <div class="alsWare">
    <kanbanTitle class="titleStyle" :logo="logo" title="原料仓货位电子看板" :right="date"></kanbanTitle>
    <div class="kanban-body">
      <div class="ware_list">
        <table class="ware_list" border="1" cellspacing="0">
          <thead>
            <tr>
              <td>货架</td>
              <td colspan="24">货位号</td>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(rowItem,rowIndex) of 32" :key="rowIndex">
                <td v-if="rowIndex%4==0||rowIndex==0" rowspan="4">{{'01A0'+rowItem}}</td>
                <td :style="ramdonColor()" v-for="(item,index) of 24" :key="index">012</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="msg"></div>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/alsWare.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "alsWare",
  data() {
    return {
      //date:$dataFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: ""
      }
    };
  },
  mounted() {
    this.mac_init();
    this.dateUpdate();
    //this.get_data();
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
    //动态刷新时间
    dateUpdate() {
      //setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss");
        let mydate=new Date();
        let myddy = mydate.getDay(); //获取存储当前日期
        let weekday = [
          "星期日","星期一","星期二","星期三","星期四","星期五","星期六"
        ];
        this.date = date + " " + weekday[myddy];
      //}, 1000);
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
    //随机颜色
    ramdonColor(){
      let num = Math.random();
      let color = '';
      if(0.2>num){
        color = 'red';
      }else if(0.2<num&&0.4>num){
        color = 'green';
      }else if(0.4<num&&0.6>num){
        color = 'blue';
      }else if(0.8<num&&1>num){
        color = 'none';
      }
      return 'background:'+color;
    }
  },
  components: {
    kanbanTitle
  }
};
</script>
