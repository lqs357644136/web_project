<template>
  <div class="panel zjj_demo01">
    <panel-title :logoInfo="logoInfo.logo" :center="true" :right="true" :title="$route.meta.title" :rightContext="demo01_time"></panel-title>
    <div class="panel-body ">
      <zjjdemo01list :tableList="tableList" class="zjjdemo01list"></zjjdemo01list>
      <zjjdemo01chart class="zjjdemo01chart"></zjjdemo01chart>
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
import logo from './img/logo.png'
import url from "api";
export default {
  name: "zjj_demo01",
  data() {
    function mock_tableList() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        let obj = {
          orderNo: "20180000" + i,
          customer: Math.floor(Math.random() * 90000) + 10000,
          prno: Math.floor(Math.random() * 90000) + 10000,
          ptno: Math.floor(Math.random() * 90000) + 10000,
          plantNo: Math.floor(Math.random() * 9000) + 1000,
          realNo: Math.floor(Math.random() * 9000) + 1000,
          reachRate: parseInt(Math.random() * 100),
          haveBron: i==0?0.8:i==1?0.6:0.3,
          notGoodNum: Math.floor(Math.random() * 9000) + 1000,
          notGood: parseInt(Math.random() * 100),
        };
        arr.push(obj);
      }
      return arr;
    }
    return {
      logoInfo:{
        logoFlag:true,
        logo:logo
      },
      demo01_time: $dataFormat(new Date(), "yyyy年MM月dd hh:mm:ss"),
      tableList: {
        baseInfo: {
          line: "1",
          onlineNum: 12,
          realOnlineNum: 10
        },
        list: mock_tableList()
      }
    };
  },
  created() {},
  methods: {},
  components: {
    panelTitle,
    zjjdemo01list,
    zjjdemo01chart
  }
};
</script>

