<template>
  <div class="panel zjj_demo02">
     <panel-title :logoInfo="logoInfo.logo" :center="true" :right="true" :title="$route.meta.title" :rightContext="demo02_time"></panel-title>
    <div class="panel-body">
      <zjjdemo02list :tableList="tableList" class="zjjdemo02list"></zjjdemo02list>
      <zjjdemo02chart class="zjjdemo02chart"></zjjdemo02chart>
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
import logo from './img/logo.png'
import url from "api";
export default {
  name: "zjj_demo02",
  data() {
    function mock_tableList() {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        let obj = {
          line: "拉线L" + (i+1),//订单编号
          orderNo: "20180000" + i,//订单编号
          customer: Math.floor(Math.random() * 90000) + 10000,//客户名称
          prno: Math.floor(Math.random() * 90000) + 10000,//产品名称
          ptno: Math.floor(Math.random() * 90000) + 10000,//产品编号
          planNo: Math.floor(Math.random() * 9000) + 1000,//车间编号
          realNo: Math.floor(Math.random() * 9000) + 1000,//计划产量
          reachRate: parseInt(Math.random() * 100),//达成率
          lack:i==2?Math.floor(Math.random() * 90)+10:0,//缺料
          notGoodlack:0,//不良来料
          macError:0,//设备故障
          changeLine:i==3?Math.floor(Math.random() * 90)+10:0,//转线
          haveBron:i==0?40:10,//生成状态(生产 暂停 已生产)
        };
        arr.push(obj);
      }
      return arr;
    }
    return {
      demo02_time: $dataFormat(new Date(), "yyyy年MM月dd hh:mm:ss"),
      logoInfo:{
        logoFlag:true,
        logo:logo
      },
      tableList: {
        baseInfo: {
          plantNum: 12,
          onlineNum: 12,
        },
        list: mock_tableList()
      }
    };
  },
  created() {},
  methods: {},
  components: {
    panelTitle,
    zjjdemo02list,
    zjjdemo02chart
  }
};
</script>

