<template>
  <div class="panel detection">
    <panel-title :title="$route.meta.title">
      <el-button @click="backDeteTable()" type="primary" plain v-if="!deteType">返回巡回管理</el-button>
    </panel-title>
    <div class="panel-body">

      <div class="deteTable" v-if="deteType">
        <!-- 巡迴管理 -->
        <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="detectionFrom">
          <el-card class="box-card">

            <div slot="header" class="clearfix detectionFrom-header">
              <div class="name">巡迴录入检测</div>
              <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('inputs')">检测</el-button>
              </el-form-item>
            </div>

            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="8">
                <el-form-item label="车间" class="" prop="input01">
                  <el-input type="text" v-model="inputs.input01" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="10" :lg="8">
                <el-form-item label="机台" class="" prop="input02">
                  <el-input type="text" v-model="inputs.input02" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="10" :lg="8">
                <el-form-item label="产品编号" class="" prop="input03">
                  <el-input type="text" v-model="inputs.input03" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-card>
        </el-form>

        <!-- 巡检列表 -->
        <el-card class="tableBox">
          <div slot="header" class="clearfix detectionFrom-header">
            <span>巡迴录入清单</span>
          </div>

          <el-table :stripe="true" :data="tableData" height="100%" border style="width: 100%">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="macNum" label="机器号"></el-table-column>
            <el-table-column prop="goodsNo" label="产品号"></el-table-column>
            <el-table-column prop="date" label="发出时间"></el-table-column>
            <el-table-column prop="time" label="时长(分钟)"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="edit">
                  <el-button @click="goDeteCheck()" type="primary" size="mini">检测</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <check class="deteCheck" :checkList="checkList" v-else></check>

    </div>
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
      deteType: true,
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
      checkList: {
        checkInfo: [
          { title: "编号", value: "A3800000" }, //编号
          { title: "制程", value: "成型" }, //制程
          { title: "车间", value: "ZSA800-1" }, //车间
          { title: "人员", value: "张三" }, //人员
          { title: "单号", value: "M0000001" }, //工令单号
          { title: "调合", value: "ABC00002" }, //调合
          { title: "数量", value: "ABC00002" } //生产数量
        ],
        selectOption: [
          { value: "目测", label: "目测" },
          { value: "目测", label: "目测" },
          { value: "目测", label: "目测" },
          { value: "目测", label: "目测" }
        ],
        deviation: {
          min: 10,
          max: 30
        },
        checkTypes: [
          //检查项目名称列表
          "压力",
          "重量",
          "尺寸",
          "高度",
          "内经"
        ]
      }
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
          this.deteType = false;
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
    goDeteCheck(){
      this.deteType = false;
    },
    backDeteTable() {
      this.deteType = true;
    }
  }
};
</script>

