<template>
  <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="stepFrom">

    <!--  测试方式与误差范围 -->
    <div class="checkChioce">
      <div class="testType">
        <label>检测方式:</label>{{tabCheck.methodDescription}}</div>
      <div class="deviation">
        <div class="range" v-if="tabCheck.specificationType==0">
          <label>范围:</label>
          <span>{{tabCheck.lowerLimit}}~{{tabCheck.upperLimit}}{{tabCheck.symbol}}</span>
        </div>
        <div class="tolerance" v-else>
          <label>公差:</label>
          <span class="stdValue">{{tabCheck.stdValue}}{{tabCheck.symbol}}</span>
          <span class="tolText">
            <span class="stdValuePlus">+{{tabCheck.stdValuePlus}}</span>
            <span class="stdValueMinus">-{{tabCheck.stdValueMinus}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="stepInputs">
      <el-form-item class="stepInput" prop="input01">
        <el-input type="number" v-model="inputs.input01" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="stepInput" prop="input02">
        <el-input type="number" v-model="inputs.input02" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="stepInput" prop="input03">
        <el-input type="number" v-model="inputs.input03" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="stepInput" prop="input04">
        <el-input type="number" v-model="inputs.input04" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="stepInput" prop="input05">
        <el-input type="number" v-model="inputs.input05" auto-complete="off"></el-input>
      </el-form-item>
    </div>

    <el-form-item class="stepBtn">
      <el-button type="primary" @click="submitForm('inputs')">提交</el-button>
      <el-button @click="resetForm('inputs')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["tabCheck"],
  data() {

    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        if (value < this.computRang.minVal || value > this.computRang.maxVal) {
          callback();
        } else {
          this.$message({
            message: "您的输入值超出范围",
            type: "warning"
          });
          callback();
        }
      }
    };

    return {
      computRang: {
        minVal: 0,
        maxVal: 0
      },
      inputs: {
        input01: "",
        input02: "",
        input03: "",
        input04: "",
        input05: ""
      },
      rules: {
        input01: [{ validator: checkStep, trigger: "blur" }],
        input02: [{ validator: checkStep, trigger: "blur" }],
        input03: [{ validator: checkStep, trigger: "blur" }],
        input04: [{ validator: checkStep, trigger: "blur" }],
        input05: [{ validator: checkStep, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.computRang_init();
  },
  methods: {
    //初始化计算值
    computRang_init() {
      if (this.tabCheck.specificationType == 0) {
        this.computRang.minVal = this.tabCheck.lowerLimit;
        this.computRang.maxVal = this.tabCheck.upperLimit;
      } else {
        this.computRang.minVal =
          this.tabCheck.stdValue - this.tabCheck.stdValueMinus;
        this.computRang.maxVal =
          this.tabCheck.stdValue + this.tabCheck.stdValuePlus;
      }
    },
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("checkEndListen", "success");
        } else {
          this.$emit("checkEndListen", "error");
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