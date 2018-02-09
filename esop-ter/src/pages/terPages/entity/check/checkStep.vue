<template>
  <el-form :inline="true" status-icon label-width="100px" class="stepFrom" :disabled="isPass">

    <!--  测试方式与误差范围 -->
    <div class="checkChioce">
      <div class="info">
        <div class="checkTotal" v-if="!isPass">
          <label>总数:</label>{{totalCheck}}
        </div>
        <div class="checkNeed" v-if="!isPass">
          <label>待测:</label>
          <span :style="needCheck>0?'color:red':'color:green'">{{needCheck}}</span>
        </div>
        <div class="testType">
          <label>方式:</label>{{tabCheck.methodDescription}}</div>
        <div class="deviation">
          <div class="range" v-if="tabCheck.specificationType==0">
            <label>范围:</label>
            <span>{{tabCheck.lowerLimit}}~{{tabCheck.upperLimit}}{{tabCheck.symbol}}</span>
          </div>
          <div class="tolerance" v-else-if="tabCheck.specificationType==1">
            <label>公差:</label>
            <span class="stdValue">{{tabCheck.stdValue}}{{tabCheck.symbol}}</span>
            <span class="tolText">
              <span class="stdValuePlus">+{{tabCheck.stdValuePlus}}</span>
              <span class="stdValueMinus">-{{tabCheck.stdValueMinus}}</span>
            </span>
          </div>
          <div class="seeCheck" v-else-if="tabCheck.specificationType==2">
            <label>目测</label>
          </div>
        </div>
      </div>
      <div class="crlBtn" v-if="!isPass">
        <el-button type="primary" @click="addBtn()">添加</el-button>
        <el-button type="danger" @click="cancelBtn()">移除</el-button>
      </div>
    </div>

    <div class="stepInputs">
      <template v-if="checkInputs.length>0">
        <el-form-item v-for="(item,index) in checkInputs" :key="index" class="stepInput">
          <el-input :disabled="item.artificialFlag!=null||tabCheck.specificationType==2" @change="checkInputChange_style(index)" :class="'inputForm '+item.style" type="number" v-model="checkInputs[index].value" auto-complete="off"></el-input>
          <div class="airFlag">
            <i @click="artPass(index)" :class="item.artificialFlag!=null&&item.artificialFlag==1?'isPassIcon fa fa-check':'none fa fa-check'"></i>
            <i @click="artFail(index)" :class="item.artificialFlag!=null&&item.artificialFlag==0?'failPassIcon fa fa-close':'none fa fa-close'"></i>
          </div>
        </el-form-item>
      </template>
      <template v-else>
        <div class="nothingCheck" @click="addBtn()">请点击添加检测</div>
      </template>
    </div>

    
    <el-form-item class="stepBtn" v-if="isPass&&passType==1">
      <el-button type="success">{{tabCheck.itemDescription}}检验通过</el-button>
    </el-form-item>
    <el-form-item class="stepBtn" v-else-if="isPass&&passType==0">
      <el-button type="danger">{{tabCheck.itemDescription}}检验失败</el-button>
    </el-form-item>
    <el-form-item class="stepBtn" v-else>
      <el-button type="primary" :disabled="needCheck!=0||checkInputs.length<=0" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { mapGetters } from "vuex";
import url from "api";
import qs from "qs";
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
      //是否有检测通过
      isPass: false,
      passType:'',
      //范围与公差
      computRang: {
        // minVal: 0,
        // maxVal: 0
      },
      //需要检测的值
      checkInputs: []
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    }),
    totalCheck: function() {
      return this.checkInputs.length;
    },
    needCheck: function() {
      let needCheckNum = 0;
      for (let item of this.checkInputs) {
        if (!item.noValue) {
          needCheckNum++;
        }
      }
      return needCheckNum;
    }
  },
  mounted() {
    this.computRang_init();
    this.checkInput_init();
  },
  methods: {
    //初始化计算值
    computRang_init() {
      if (this.tabCheck.specificationType != 2) {
        if (this.tabCheck.specificationType == 0) {
          this.computRang.minVal = this.tabCheck.lowerLimit * 1;
          this.computRang.maxVal = this.tabCheck.upperLimit * 1;
        } else {
          this.computRang.minVal =
            this.tabCheck.stdValue - this.tabCheck.stdValueMinus;
          this.computRang.maxVal =
            parseFloat(this.tabCheck.stdValue) +
            parseFloat(this.tabCheck.stdValuePlus);
        }
      }
    },
    //初始化输入框数值
    checkInput_init() {
      let details = this.tabCheck.details ? this.tabCheck.details : null;
      let passType = this.tabCheck.noPass!=undefined ? this.tabCheck.noPass : -1;
      this.specType = this.tabCheck.specificationType;
      this.passType = passType;
      if (details != null) {
        if (passType != -1) {
          this.isPass = true;
        }
        for (let item of details) {
          let obj = {
            artificialFlag:
              item.artificialFlag || item.artificialFlag == 0
                ? item.artificialFlag
                : null,
            flag: item.flag,
            value: item.value,
            style: "",
            noValue: item.value != undefined ? true : false
          };
          obj.style = this.checkInputStyle_init(obj);
          this.checkInputs.push(obj);
        }
      }
    },
    //输入框样式初始化
    checkInputStyle_init(obj) {
      let style = "";
      if (obj.artificialFlag != null) {
        style = obj.artificialFlag == 1 ? "inputSuccess" : "inputFail";
      } else {
        style = obj.flag == 1 ? "inputSuccess" : "inputFail";
      }
      return style;
    },
    //检验结论
    checkFinal() {
      let rArr = [];
      let details = [];
      for (let item of this.checkInputs) {
        let obj = {
          artificialFlag: item.artificialFlag,
          flag: item.flag,
          value: item.value
        };
        details.push(obj);
        rArr.push(item.flag);
      }
      let result = this.checkType_allInput(rArr) + ""; //检验结果 0 不通过 1 通过
      return {
        projectFlag: result,
        details: details
      };
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
      return arr.indexOf(0) != -1 ? 0 : 1;
    },
    submitForm() {
      if(this.isPass) return;
      let inspect = this.checkList.inspect;
      let spec = this.tabCheck;
      let params = {
        details: this.checkFinal().details,
        inspect: {
          ptno: inspect.ptno, //产品编号
          line: inspect.line, //制程
          plant: inspect.plant, //车间
          process: inspect.process, //机台
          operator: Window.GETMACINFO().empNo + "", //人员
          orderNo: inspect.orderNo, //工令单号
          reconcile: inspect.reconcile, //调合
          pdNum: inspect.pdNum //生产数量
        },
        result: {
          flag: this.checkFinal().projectFlag * 1, //检验结论 ,
          specId: spec.specId //检验规范ID
        }
      };
      let urlPath =
        inspect.type == "0" ? url.terFirstCheck_add : url.terSelfCheck_add;
      this.$post_noToken({
        url: this.$api_baseurl(urlPath),
        data: params
      }).then(res => {
        if (res.code == 1) {
          this.isPass = true;
          this.passType = params.result.flag
          let finalView = {
            index: this.tabCheck.index,
            isPass: this.passType
          };
          this.$emit("checkEndListen", finalView);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //重置
    resetForm(formName) {
      for (let item of this.checkInputs) {
        item.value = "";
      }
    },
    //添加输入框
    addBtn() {
      let item = { artificialFlag: null, flag: 0, value: "", noValue: false };
      this.checkInputs.push(item);
    },
    //移除输入框
    cancelBtn() {
      this.checkInputs.pop();
    },
    //干预成功
    artPass(index) {
      if (this.checkInputs[index].artificialFlag != null) {
        this.checkInputs[index].artificialFlag = null;
        this.checkInputs[index].style = "";
      } else {
        this.checkInputs[index].artificialFlag = 1;
        if (this.checkInputs[index].value.length <= 0) {
          this.checkInputs[index].flag = 1;
          this.checkInputs[index].noValue = true;
        }
      }
      this.checkInputChange_style(index);
    },
    //干预失败
    artFail(index) {
      if (this.checkInputs[index].artificialFlag != null) {
        this.checkInputs[index].artificialFlag = null;
        this.checkInputs[index].style = "";
      } else {
        this.checkInputs[index].artificialFlag = 0;
        if (this.checkInputs[index].value.length <= 0) {
          this.checkInputs[index].flag = 0;
          this.checkInputs[index].noValue = true;
        }
      }
      this.checkInputChange_style(index);
    },

    //输入框值改变
    checkInputChange_style(index) {
      if (this.checkInputs[index].artificialFlag != null) {
        this.checkInputs[index].style =
          this.checkInputs[index].artificialFlag == 1
            ? "inputSuccess"
            : "inputFail";
      } else {
        if (this.checkInputs[index].value.length <= 0) {
          this.checkInputs[index].noValue = false;
          this.checkInputs[index].style = "";
        } else {
          this.checkInputs[index].noValue = true;
          this.checkInputs[index].flag = this.checkType_input(
            this.checkInputs[index].value
          );
          if (this.checkInputs[index].flag == "1") {
            this.checkInputs[index].style = "inputSuccess";
          } else {
            this.checkInputs[index].style = "inputFail";
          }
        }
      }
    }
  }
};
</script>