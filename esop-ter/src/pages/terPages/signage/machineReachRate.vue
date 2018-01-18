<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body signage">
      <el-table :highlight-current-row="false" :data="tableList" height="100%" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="process" label="机台型号"></el-table-column>
        <el-table-column align="center" prop="partNo" label="产品编号"></el-table-column>
        <el-table-column align="center" width="160px" prop="schQty" label="计划生产总数"></el-table-column>
        <el-table-column align="center" width="150" prop="unitProd" label="单位生产(S)"></el-table-column>
        <el-table-column align="center" width="150px" prop="prodMinute" label="量产分钟数(M)"></el-table-column>
        <el-table-column align="center" prop="idealQty" width="150px" label="理想量产/8HR"></el-table-column>
        <el-table-column align="center" prop="actualQty" width="150px" label="实际产数/8HR"></el-table-column>
        <el-table-column align="center" prop="reachRate" label="达成率%"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import url from "api";
export default {
  name: "workonooff",
  data() {
    return {
      tableList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$get_noToken({
        url: url.machineReachRate_list
      }).then(res => {
        if (res.code == 1) {
          for (let item of res.data) {
            let obj = {
              actualQty: item.actualQty, //实际产数
              idealQty: item.idealQty, //理想量产
              partNo: item.partNo, //产品编码
              process: item.process, //机台型号
              prodMinute: item.prodMinute, //量产分钟数
              reachRate: item.reachRate + "%", //达成率
              recordQty: item.recordQty, //生产报工数
              schQty: item.schQty, //计划生产总数
              unitProd: item.unitProd //单位生产
            };
            this.tableList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  components: {
    panelTitle
  }
};
</script>

