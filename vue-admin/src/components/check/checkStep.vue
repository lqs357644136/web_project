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
import { mapGetters } from "vuex";
import url from "api";
import { server_base_url } from "common/config/index.js";
export default {
  props: ["tabCheck"],
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        let crVal = value * 1;
        let min = this.computRang.minVal * 1;
        let max = this.computRang.maxVal * 1;
        let flag = crVal >= min && max >= crVal;
        if (flag) {
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
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
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
    //最终检验结果
    checkFinal() {
      let inputs = this.inputs; //获取需要提交表单
      let code = this.tabCheck.code; // 项目代号
      let name = this.tabCheck.itemDescription; //项目名称
      //每项结果
      let r1 = this.checkType_input(this.inputs.input01) + "";
      let r2 = this.checkType_input(this.inputs.input02) + "";
      let r3 = this.checkType_input(this.inputs.input03) + "";
      let r4 = this.checkType_input(this.inputs.input04) + "";
      let r5 = this.checkType_input(this.inputs.input05) + "";
      let rArr = [r1, r2, r3, r4, r5];
      let result = this.checkType_allInput(rArr) + ""; //检验结果 0 不通过 1 通过
      let obj = {
        code: code,
        name: name,
        result: result
      };
      return obj;
    },
    //按输入检测单个结果
    checkType_input(val) {
      let crVal = val * 1;
      let min = this.computRang.minVal * 1;
      let max = this.computRang.maxVal * 1;
      let flag = crVal >= min && max >= crVal;
      return flag ? 1 : 0;
    },
    //按输入检测所有结果
    checkType_allInput(arr) {
      return arr.indexOf("0") != -1 ? 0 : 1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let inspect = this.checkList.inspect;
          let spec = this.tabCheck;
          let itemObj = this.checkFinal();
          let params = {

            bpmStatus:spec.bpmStatus,//流程状态
            createBy :spec.createBy ,//创建人登录名称
            createDate :spec.createBy ,//创建日期
            createName :spec.createBy ,//创建人名称
            inspectListId : inspect.id,//检验规范ID 
            r1 : this.inputs.input01,
            r2 : this.inputs.input02,
            r3 : this.inputs.input03,
            r4 : this.inputs.input04,
            r5 : this.inputs.input05,
            result : itemObj.result,//检验结论 ,
            specId : spec.specId ,//检验规范ID 
            sysCompanyCode : spec.sysCompanyCode,//所属公司
            sysOrgCode : spec.sysOrgCode ,//所属部门
            updateBy : spec.updateBy ,//更新人登录名称
            updateDate  : spec.updateDate ,//更新日期
            updateDate  : spec.updateDate  ,//更新人名

          };
          this.$post({
            url: url.check_add,
            data: params
          }).then(res => {
            let finalView = {
              code: spec.code,
              name: spec.itemDescription,
              result: itemObj.result,
              resultArr: [
                this.inputs.input01,
                this.inputs.input02,
                this.inputs.input03,
                this.inputs.input04,
                this.inputs.input05,
              ],
              type: spec.type,
              index:spec.index
            };
            if (res.code == 1) {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
            this.$emit("checkEndListen", finalView);
          });
        } else {
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