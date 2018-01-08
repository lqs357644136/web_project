<template>
  <div class="batchEnter">
    <!-- 批次录入 -->
    <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="detectionFrom">
      <el-card class="box-card">

        <div slot="header" class="clearfix detectionFrom-header">
          <div class="name">批次录入</div>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('inputs')">提交</el-button>
          </el-form-item>
        </div>

        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="10" :lg="8">
            <el-form-item :label="materialNo" class="" prop="materialNo">
              <el-input type="text" v-model="inputs.materialNo" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="8">
            <el-form-item label="批次号" class="" prop="batchNo">
              <el-input type="text" v-model="inputs.batchNo" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="8">
            <el-form-item label="数量" class="" prop="quantity">
              <el-input-number v-model="inputs.quantity" :min="1" label="请输入数量"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

      </el-card>
    </el-form>

    <!-- 批次录入列表 -->
    <el-card class="tableBox">
      <div slot="header" class="clearfix detectionFrom-header">
        <span>批次录入清单</span>
      </div>

      <el-table :stripe="true" :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="materialNo" :label="materialNo"></el-table-column>
        <el-table-column prop="batchNo" label="批次号"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="createDate" label="时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createDate | dataFormat('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="deteleBatchEnter(scope.$index,scope.row.id)" type="danger" size="mini">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
import check from "components/check/check.vue";
import { panelTitle } from "components";
import url from "api";
import { server_base_url } from "common/config/index.js";

export default {
  props: ["batchType"],
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        callback();
      }
    };
    return {
      materialNo: null,
      tableData: null,
      inputs: {
        materialNo: "",
        batchNo: "",
        quantity: 1
      },
      rules: {
        materialNo: [{ validator: checkStep, trigger: "blur" }],
        batchNo: [{ validator: checkStep, trigger: "blur" }],
        quantity: [{ validator: checkStep, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.materialNo = this.batchType == 0 ? "粉号" : "批次号";
  },
  created() {
    this.get_batchList();
  },
  components: {
    check,
    panelTitle
  },
  comouted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    submitForm(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            batchNo: self.inputs.batchNo,
            materialNo: self.inputs.materialNo,
            quantity: self.inputs.quantity,
            type: self.batchType
          };
          console.log(params)
          this.$post_noToken({
            url: url.terBatch_List_add,
            data: params
          }).then(res => {
            if (res.code == 1) {
              this.get_batchList();
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "录入失败,请检查表单"
          });
          return false;
        }
      });
    },
    //删除批次清单
    deteleBatchEnter(index, id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$get_noToken({
            url: url.terBatch_List_delete,
            params: { id: id }
          }).then(res => {
            if (res.code == 1) {
              this.tableData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
    },
    //获取清单数据
    get_batchList() {
      this.$get_noToken({
        url: url.terBatch_List,
        params: { type: this.batchType }
      }).then(res => {
        if (res.code == 1) {
          this.tableData = res.data;
        }
      });
    }
  }
};
</script>

