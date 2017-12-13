<template>
    <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="stepFrom">
        <div class="stepInputs">
            <el-form-item class="stepInput" prop="input01">
                <el-input type="text" v-model="inputs.input01" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="stepInput" prop="input02">
                <el-input type="text" v-model="inputs.input02" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="stepInput" prop="input03">
                <el-input type="text" v-model="inputs.input03" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="stepInput" prop="input04">
                <el-input type="text" v-model="inputs.input04" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="stepInput" prop="input05">
                <el-input type="text" v-model="inputs.input05" auto-complete="off"></el-input>
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
  props: ["checkList"],
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        if (
          value < this.checkList.deviation.min ||
          value > this.checkList.deviation.max
        ) {
          console.log(new Error("超出公差范围"));
          callback();
        } else {
          callback();
        }
      }
    };

    return {
      inputs: {
        input01: "",
        input02: "",
        input03: "",
        input04: "",
        input05: "",
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$notify({
            title: "成功",
            message: "首检成功",
            type: "success"
          });
          this.$emit("checkEndListen", "success");
        } else {
          this.$notify.error({
            title: "错误",
            message: "首检失败,有存在公差或者未填数值"
          });
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