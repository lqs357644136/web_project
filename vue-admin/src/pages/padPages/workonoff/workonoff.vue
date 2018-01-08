<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body workonoff">
      <div class="workonoff-list"></div>
      <div class="workonoff-list-goPage">
        <el-pagination background layout="prev, pager, next" :total="1000">
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
      curPage: 1,
      pageSize: 30,
      tableList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        curPage: this.curPage,
        pageSize: this.pageSize
      };
      this.$get({
        url: url.workonoffList,
        params: params
      }).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    panelTitle
  }
};
</script>

