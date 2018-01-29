<template>

  <div class="productList">
    <el-form class="listForm">
      <!-- 报工信息 -->
      <el-card :class="formShow?'box-card':'box-card card-body-hidden'">
        <div slot="header" class="clearfix">
          <span>筛选信息</span>
          <span class="card-hidden-btn" @click="formShow=!formShow">
            <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
          </span>
        </div>
        <el-row class="" :gutter="20">
          <el-col :xs="24" :sm="24" :md="6" :lg="6">
            <el-form-item label="产品编码">
              <el-input :disabled="true" v-model="macInfo.ptno" placeholder="产品编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <el-table :data="productList" align="center" height="100%" border class="listTable">
      <el-table-column prop="productName" sortable label="产品名称"></el-table-column>
      <el-table-column prop="happenDate" sortable label="发生日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.happenDate | dataFormat('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resumeType" sortable label="履历类型"></el-table-column>
      <el-table-column prop="badCode" sortable label="不良代码"></el-table-column>
      <el-table-column prop="badContent" label="不良内容"></el-table-column>
      <el-table-column prop="badNumber" label="不良数目"></el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <div class="edit">
            <el-button @click="goInfo(scope)" type="primary">详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import url from "api";

export default {
  data() {
    return {
      formShow: true,
      macInfo:{
        ptno:''
      },
      productList: null
    };
  },
  created() {
    this.productList_init();
  },
  methods: {
    productList_init(){
      let macInfo = Window.GETMACINFO();
      this.macInfo.ptno = macInfo.ptno;
      this.get_list();
    },
    get_list() {
      this.$get({
        url: url.terProduct_list,
        params:{
          product:this.macInfo.ptno
        }
      }).then(res => {
        if (res.code == 1) {
          this.productList = [];
          for (let item of res.data) {
            let obj = {
              caseNo: item.caseNo, //案号
              resumeType: item.resumeType, //履历类型
              badNumber: item.badNumber, //不良数
              happenDate: item.happenDate, //发生日期
              happenFrequency: item.happenFrequency, //发生频度
              badContent: item.badContent, //不良内容
              badCode: item.badCode, //不良代码
              productName: item.productName, //品名
              customerName: item.customerName, //客户
              badContent: item.badContent, //不良内容
              happenReason: item.happenReason, //发生原因
              outputReason: item.outputReason, //输出原因
              reason: item.reason, //原因
              countermeasure: item.countermeasure, //对策
              progress: item.progress, //对策进度
              afterContent: item.afterContent, //改善后数据
              effectiveDate: item.effectiveDate, //有效日期
              improvePicture: item.improvePicture, //改善后写真
              badPicture: item.badPicture //不良写真
            };
            this.productList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    goInfo(scope) {
      this.$store.dispatch("set_productinfo", scope.row);
      this.$emit("chioceListen", {
        type: "edit"
      });
    }
  }
};
</script>

