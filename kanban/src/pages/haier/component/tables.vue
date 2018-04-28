<template>
  <div class="haier-line-list">
    <el-table class="table01" :highlight-current-row="true" :row-class-name="tableRowClassName" :data="tables.table01" border>

      <el-table-column align="center" prop="orderNo " label="计划单号">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.orderNo }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="partNo" label="产品型号">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.partNo }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="schQty " label="计划产量">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.schQty }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="finishQty " label="实际数量">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.finishQty }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="reachRate" label="达成率">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.reachRate }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="badNumber " label="不良数">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.badNumber }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="badRate " label="不良率">
        <template slot-scope="scope">
          <div class="td_text">{{ scope.row.badRate }}</div>
        </template>
      </el-table-column>

    </el-table>
    <el-table class="table02" :highlight-current-row="true" :row-class-name="tableRowClassName" :data="tables.table02.data" border>
      <!-- 动态列,待设计 start -->
      <!-- 动态列,待设计 start -->
      <el-table-column v-for="(item,index) in tables.table02.title.titleKey" :key="index" align="center" :prop="item" :label="titleKeyCode(item)">
        <template slot-scope="scope">
          <div class="andon" v-if="scope.row[item]" :style="'background-color:'+scope.row[item].colorCode">{{scope.row[item].process}}</div>
        </template>
      </el-table-column>
      <!-- 动态列,待设计 end -->
      <!-- 动态列,待设计 end -->
    </el-table>
  </div>

</template>
<script>
export default {
  name: "haier-line-list",
  props: ["tables"],
  data() {
    return {
      list: []
    };
  },
  mounted() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.statu == 1) {
        return "onLine";
      } else {
        return "";
      }
    },
    //根据titleKey 找到对应中文
    titleKeyCode(key){
      return this.tables.table02.title.titleKeyCode[key].title;
    }
  }
};
</script>