<template>
  <div class="x-r">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane>
        <span @click="chartInfoTabClick()" slot="label">{{langPackage.xr_pad.base}}</span>
        <baseInfo :langPackage="langPackage"></baseInfo>
      </el-tab-pane>
      <el-tab-pane>
        <span @click="chartInfoTabClick()" slot="label">{{langPackage.xr_pad.measValue}}</span>
        <checkTable :langPackage="langPackage"></checkTable>
      </el-tab-pane>
      <el-tab-pane>
        <span @click="chartInfoTabClick('chart')" slot="label">{{langPackage.xr_pad.xrChart}}</span>
        <chartInfo v-if="chartShow" :langPackage="langPackage"></chartInfo>
      </el-tab-pane>
    </el-tabs>
    <div class="backBtn">
      <el-button @click="backSpec()">{{langPackage.common_pad.back}}</el-button>
    </div>
  </div>
</template>

<script>
import baseInfo from "./component/baseInfo.vue";
import checkTable from "./component/checkTable.vue";
import chartInfo from "./component/chartInfo.vue";
import { mapGetters } from "vuex";
export default {
  name: "x-r",
  props:['xBarInfo'],
  data() {
    return {
      showType: "",
      chartShow: false,
    };
  },
  computed: {
    ...mapGetters({
      langPackage:'get_langpackage'
    })
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