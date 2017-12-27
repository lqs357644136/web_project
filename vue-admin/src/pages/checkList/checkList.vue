<template>
  <div class="panel checkList">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" style="padding:0">

      <el-table :stripe="true" :data="tableData" height="100%" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="70px"></el-table-column>
        <el-table-column align="center" prop="company" label="公司"></el-table-column>
        <el-table-column align="center" prop="plantdesc" label="车间"></el-table-column>
        <el-table-column align="center" prop="processname" label="机台"></el-table-column>
        <el-table-column align="center" prop="ptno" label="产品编码"></el-table-column>
        <el-table-column align="center" prop="startTime" label="发出时间"></el-table-column>
        <el-table-column align="center" width="120px" prop="duration" label="时长(分钟)"></el-table-column>
        <el-table-column align="center" label="操作" width="70px">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="goDeteCheck(scope)" type="primary" size="mini">检测</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>


<script>
import check from "components/check/check.vue";
import { panelTitle } from "components";
import { $dataFormat } from "common/filiter/index.js";
import url from "api/index.js";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.get_checklist();
  },
  components: {
    panelTitle
  },
  methods: {
    //获取检查清单
    get_checklist() {
      this.$get({
        url: url.check_list
      }).then(res => {
        if (res.code == 1) {
          this.tableData = [];
          for (let item of res.data) {
            let obj = {
              company: item.company, //公司
              plant: item.plant.plant, //车间代号
              plantdesc: item.plant.plantdesc, //车间
              process: item.process.process, //机台代号
              processname: item.process.processname, //机台
              ptno: item.ptno, //产品编码
              startTime: $dataFormat(item.startTime, 'yyyy-MM-dd') , //发出时间 
              duration: item.duration, //时长
              type: item.type, //类型:0首检，1巡检
              line: item.line.line, //制程代号
              linedesc: item.line.linedesc //制程
            };
            this.tableData.push(obj);
          }
        }
      });
    },
    goDeteCheck(scope) {
      let path = scope.row.type == "0" ? "/firstEntity" : "/tourEntity";
      this.$store.dispatch("set_fromchecklist", true);
      let info = {
        plant: scope.row.plant,
        line: scope.row.line,
        process: scope.row.process,
        type: scope.row.type
      };
      if (scope.row.type == "1") {
        info.ptno = scope.row.ptno;
      }
      this.$router.push({
        path: path,
        query: {
          fromCheckList: true,
          info: info
        }
      });
    }
  }
};
</script>

