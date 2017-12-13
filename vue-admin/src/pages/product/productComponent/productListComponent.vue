<template>

    <el-table :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="date" label="发生日期"></el-table-column>
        <el-table-column prop="proType" label="履历类型"></el-table-column>
        <el-table-column prop="noGoodC" label="不良内容"></el-table-column>
        <el-table-column prop="noGoodNum" label="不良数目"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <div class="edit">
                    <el-button size="mini" @click="goInfo()">编辑</el-button>
                    <el-button size="mini" type="danger" >删除</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
export default {
  data() {
    var mockData = function() {
      let arr = [];
      for (var i = 0; i < 30; i++) {
        let obj = {
          id: "1",
          name: "XXXFD",
          date: "2017-01-01",
          proType: "初发",
          noGoodC: "尺寸超差",
          noGoodNum: "30"
        };
        arr.push(obj);
      }
      return arr;
    };
    return {
      tableData: mockData()
    };
  },
  methods:{
      goInfo(){
          this.$emit('chioceListen','edit')
      }
  }
};
</script>

