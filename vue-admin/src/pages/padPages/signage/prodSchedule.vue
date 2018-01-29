<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body signage">
      <el-table :highlight-current-row="false" :data="tableList" height="100%" border style="width:100%">
          <el-table-column align="center" prop="process" label="机台型号"></el-table-column>
          <el-table-column align="center" prop="partNo" label="产品编号"></el-table-column>
          <el-table-column align="center" prop="schQty" label="计划生产总数PCS"></el-table-column>
          <el-table-column align="center" prop="finishQty" label="完工数"></el-table-column>
          <el-table-column prop="schEnd" width="240px" label="预计完成时间">
            <template slot-scope="scope">
              <div>
                <i class="el-icon-time"></i>
                <span>{{ scope.row.schEnd | dataFormat('yyyy-MM-dd') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="nextPartNo" label="下一顺位"></el-table-column>
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
        url: url.prodSchedule_list
      }).then(res => {
        if (res.code == 1) {
          console.log(res);
          for (let item of res.data) {
            let obj = {
              finishQty : item.finishQty , //完工数
              nextPartNo : item.nextPartNo , //下一顺位
              partNo : item.partNo , //产品编码
              process: item.process, //机台型号
              schEnd : item.schEnd , //预计完成时间
              schQty : item.schQty , //计划生产总数
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

