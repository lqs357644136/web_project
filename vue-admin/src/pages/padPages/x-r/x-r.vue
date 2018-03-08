<template>
  <div class="x-r">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane>
        <span @click="chartInfoTabClick()" slot="label">基础信息</span>
        <baseInfo></baseInfo>
      </el-tab-pane>
      <el-tab-pane>
        <span @click="chartInfoTabClick()" slot="label">样本测定值</span>
        <checkTable></checkTable>
      </el-tab-pane>
      <el-tab-pane>
        <span @click="chartInfoTabClick('chart')" slot="label">x-bar管制图</span>
        <chartInfo v-if="chartShow"></chartInfo>
      </el-tab-pane>
    </el-tabs>
    <div class="backBtn">
      <el-button @click="backSpec()">返 回</el-button>
    </div>
  </div>
</template>

<script>
import baseInfo from "./component/baseInfo.vue";
import checkTable from "./component/checkTable.vue";
import chartInfo from "./component/chartInfo.vue";
export default {
  name: "x-r",
  props:['xBarInfo'],
  data() {
    return {
      showType: "",
      chartShow: false,
    };
  },
  mounted() {
  },
  methods: {
    //点击图表
    chartInfoTabClick(type) {
      if (type) {
        this.chartShow = true;
      } else {
        this.chartShow = false;
      }
    },
    //返回检测规范
    backSpec(){
      this.$emit("xBarChooseListen");
    },
  },
  components: {
    baseInfo,
    checkTable,
    chartInfo
  }
};
</script>