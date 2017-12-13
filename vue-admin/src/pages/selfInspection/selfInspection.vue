<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <check :checkList="checkList"></check>
    </div>
  </div>
</template>
<script>
import check from "components/check/check.vue";
import { panelTitle } from "components";

export default {
  data() {
    return {
      checkList: {
        checkInfo:[
          {title: "编号",value: "A3800000"},//编号
          {title: "制程",value: "成型"},//制程
          {title: "车间",value: "ZSA800-1"},//车间
          {title: "人员",value: "张三"},//人员
          {title: "单号",value: "M0000001"},//工令单号
          {title: "调合",value: "ABC00002"},//调合
          {title: "数量",value: "ABC00002"},//生产数量
        ],
        selectOption:[
          {value: '目测',label: '目测'},
          {value: '目测',label: '目测'},
          {value: '目测',label: '目测'},
          {value: '目测',label: '目测'},
        ],
        deviation:{
          min:10,
          max:30
        },
        checkTypes: [
          //检查项目名称列表
          "压力",
          "重量",
          "尺寸",
          "高度",
          "内经"
        ]
      }
    };
  },
  created() {},
  components: {
    panelTitle,
    check
  }
};
</script>

