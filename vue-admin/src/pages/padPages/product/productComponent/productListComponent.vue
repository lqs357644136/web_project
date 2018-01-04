<template>

    <el-table :data="productList" align="center" height="100%" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="70px"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="happenDate" label="发生日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span >{{ scope.row.happenDate | dataFormat('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="resumeType" label="履历类型"></el-table-column>
        <el-table-column prop="badContent" label="不良内容"></el-table-column>
        <el-table-column prop="badNumber" label="不良数目"></el-table-column>
        <el-table-column align="center" label="操作" width="70px">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="goInfo(scope)" type="primary" size="mini">详情</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>

</template>

<script>
import url from "api";

export default {
  data() {
    return {
      productList: null,
    };
  },
  created() {
    this.productList_init();
  },
  methods: {
    productList_init() {
      this.$get({
        url: url.product_list
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.productList = [];
          for (let item of res.data) {
            let obj = {
              caseNo:item.caseNo,//案号
              resumeType:item.resumeType,//履历类型
              badNumber: item.badNumber, //不良数
              happenDate:item.happenDate,//发生日期
              happenFrequency:item.happenFrequency,//发生频度
              badContent: item.badContent, //不良内容
              productName: item.productName, //品名
              customerName:item.customerName,//客户
              badContent:item.badContent,//不良内容
              happenReason:item.happenReason,//发生原因
              outputReason: item.outputReason, //输出原因
              reason:item.reason,//原因
              countermeasure:item.countermeasure,//对策
              progress:item.progress,//对策进度
              afterContent: item.afterContent, //改善后数据
              effectiveDate:item.effectiveDate,//有效日期
              improvePicture:item.improvePicture,//改善后写真
              badPicture:item.badPicture,//不良写真
            };
            this.productList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    goInfo(scope) {
      this.$store.dispatch('set_productinfo',scope.row)
      this.$emit("chioceListen",{
          type:'edit'
      });
    }
  }
};
</script>

