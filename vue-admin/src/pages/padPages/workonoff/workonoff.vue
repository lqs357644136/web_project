<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body workonoff">
      <div class="workonoff-list">
        <el-table :highlight-current-row="false" :data="tableList" height="100%" border style="width: 100%">
          <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" prop="empNo" label="工号"></el-table-column>
          <el-table-column align="center" prop="plant" label="车间"></el-table-column>
          <el-table-column align="center" prop="line" label="制程"></el-table-column>
          <el-table-column align="center" prop="process" label="工序"></el-table-column>
          <el-table-column width="230px" prop="onWork" label="上岗时间">
            <template slot-scope="scope">
              <div>
                <i class="el-icon-time"></i>
                <span>{{ scope.row.onWork | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="230px"  prop="offWork" label="下岗时间">
            <template slot-scope="scope">
              <div>
                <i class="el-icon-time"></i>
                <span>{{ scope.row.offWork | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="esop-goPage workonoff-list-goPage ">
        <el-pagination @current-change="goPage" :page-size="pageSize" background layout="prev, pager, next" :total="count">
        </el-pagination>
      </div>
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
      curPage: 8,
      pageSize: 15,
      count: 0,
      tableList: []
    };
  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  created() {
    this.list_init();
  },
  methods: {
    list_init() {
      this.getList(1);
    },
    getList(page) {
      let params = {
        curPage: page,
        pageSize: this.pageSize
      };
      this.$get({
        url: url.workonoffList,
        params: params
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.count = res.data.count;
          this.tableList = [];
          for (let item of res.data.resultList) {
            let obj = {
              id: item.id, //id
              empNo: item.empNo, //工号
              line: item.line, //制程
              plant: item.plant, //车间
              process: item.process, //工序
              offWork: item.offWork, //下岗时间
              onWork: item.onWork //上岗时间
            };
            this.tableList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    goPage(curPage) {
      this.getList(curPage);
    }
  },
  components: {
    panelTitle
  }
};
</script>

