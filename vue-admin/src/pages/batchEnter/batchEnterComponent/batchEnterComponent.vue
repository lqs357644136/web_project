<template>
    <div class="batchEnter">
        <!-- 巡迴管理 -->
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
                        <el-form-item label="粉号" class="" prop="input01">
                            <el-input type="text" v-model="inputs.input01" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="10" :lg="8">
                        <el-form-item label="批次号" class="" prop="input02">
                            <el-input type="text" v-model="inputs.input02" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="10" :lg="8">
                        <el-form-item label="数量" class="" prop="input03">
                            <el-input type="text" v-model="inputs.input03" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-card>
        </el-form>

        <!-- 巡检列表 -->
        <el-card class="tableBox">
            <div slot="header" class="clearfix detectionFrom-header">
                <span>批次录入清单</span>
            </div>

            <el-table :stripe="true" :data="tableData" height="100%" border style="width: 100%">
                <el-table-column prop="fId" label="粉号"></el-table-column>
                <el-table-column prop="pId" label="批次号"></el-table-column>
                <el-table-column prop="num" label="数量"></el-table-column>
                <el-table-column prop="date" label="时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="edit">
                            <el-button @click="deteleBatchEnter(scope)" type="danger" size="mini">删除</el-button>
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

export default {
  data() {
    var mockData = function() {
      let arr = [];
      for (var i = 0; i < 4; i++) {
        let obj = {
          fId: "3243245",
          pId: "4354353",
          num: "12321",
          date: "2016-01-01",
        };
        arr.push(obj);
      }
      return arr;
    };
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        callback();
      }
    };
    return {
      tableData: mockData(),
      inputs: {
        input01: "",
        input02: "",
        input03: ""
      },
      rules: {
        input01: [{ validator: checkStep, trigger: "blur" }],
        input02: [{ validator: checkStep, trigger: "blur" }],
        input03: [{ validator: checkStep, trigger: "blur" }]
      },
    };
  },
  created() {},
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push({
            fId: this.inputs.input01,
            pId: this.inputs.input02,
            num: this.inputs.input03,
            date: "2016-01-01"
          });
          this.$notify({
            title: "成功",
            message: "批次录入成功",
            type: "success"
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
    deteleBatchEnter(scope){
        let selectNum = scope.$index;
        this.tableData.splice(selectNum,1)
    }
  }
};
</script>

