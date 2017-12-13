<template>
  <div class="panel detection">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <!-- 巡检录入 -->

      <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="detectionFrom">
        <el-card class="box-card">

          <div slot="header" class="clearfix detectionFrom-header">
            <div class="name">巡检录入</div>
            <el-form-item class="btn">
              <el-button type="primary" @click="submitForm('inputs')">提交</el-button>
            </el-form-item>
          </div>

          <div class="text item">
            <div class="">
              <el-form-item label="车间" class="" prop="input01">
                <el-input type="text" v-model="inputs.input01" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="机台" class="" prop="input02">
                <el-input type="text" v-model="inputs.input02" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品编号" class="" prop="input03">
                <el-input type="text" v-model="inputs.input03" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </div>

        </el-card>
      </el-form>

      <!-- 巡检列表 -->
      <div class="tableBox">
        <el-table :data="tableData" height="100%" border style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="company" label="公司"></el-table-column>
          <el-table-column prop="macNum" label="机器号"></el-table-column>
          <el-table-column prop="goodsNo" label="产品号"></el-table-column>
          <el-table-column prop="date" label="发出时间"></el-table-column>
          <el-table-column prop="time" label="时长(分钟)"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <div class="edit">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger" >删除</el-button>
                </div>
            </template>
        </el-table-column>
        </el-table>
      </div>

      <div class="detectionBtn">
        <el-button @click="detectionBtn()" type="primary" size="medium" :loading="false">检查</el-button>
      </div>

    </div>
  </div>
</template>


<script>
import { panelTitle } from "components";

export default {
  data() {
    var mockData = function() {
      let arr = [];
      for (var i = 0; i < 4; i++) {
        let obj = {
          id: "1",
          company: "中国耀威",
          workshop: "成型",
          macNum: "AC867",
          goodsNo: "IIU9999",
          date: "2016-01-01",
          time: "30"
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
      }
    };
  },
  created() {},
  components: {
    panelTitle
  },
  comouted:{
    tableData:function(){
      return this.tableData;
    }
  },
  methods: {
    detectionBtn() {
      this.$notify({
        title: "成功",
        message: "巡检成功",
        type: "success"
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push({
            id: "1",
            company: "中国耀威",
            workshop: this.inputs.input01,
            macNum: this.inputs.input02,
            goodsNo: this.inputs.input03,
            date: "2016-01-01",
            time: "30"
          });

          this.$notify({
            title: "成功",
            message: "巡检录入成功",
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

