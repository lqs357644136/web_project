<template>
  <div class="checkStep">
    <!-- 步骤信息 -->
    <div class="stepMsg">
      <div class="info">
        <div class="checkNum" v-if="!isPass">
          <div class="total infoGroup">
            <label>总数:</label>
            <span>{{totalCheck}}</span>
          </div>
          <div class="needCheck infoGroup">
            <label>待检:</label>
            <span :style="needCheck>0?'color:red':'color:green'">{{needCheck}}</span>
          </div>
        </div>
        <div class="methodDesc infoGroup">
          <label>方式:</label>
          <span>{{tabCheck.methodDescription}}</span>
        </div>
        <div class="deviation infoGroup">
          <label v-if="tabCheck.specificationType==0">范围:</label>
          <label v-else-if="tabCheck.specificationType==1">公差:</label>
          <label v-else-if="tabCheck.specificationType==2">目测:</label>
          <span>{{tabCheck.inspectSpecification}}</span>
        </div>
      </div>
      <div class="crlBtn" v-if="!isPass">
        <el-button type="primary" @click="addBtn()">添加</el-button>
        <el-button type="danger" @click="deleteBtn()">移除</el-button>
      </div>
    </div>
    <!-- 步骤主体 -->
    <div class="stepMain">

      <div class="positionRow" v-for="(row,rowIndex) of checkShowInputs" :key="rowIndex">
        <div class="name">{{row.name}} : </div>
        <el-row class="inputs">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" v-for="(col,colIndex) of row.cols" :key="colIndex">
            <template v-if="tabCheck.specificationType!=2">
              <el-input :class="'inputForm '+col.style" type="number" :disabled="col.artificialFlag!=null||tabCheck.specificationType==2||isPass" v-model="checkShowInputs[rowIndex].cols[colIndex].value" :placeholder="col.xpos+'-'+col.ypos" @change="checkInputChange(rowIndex,colIndex)"></el-input>
              <div class="airFlag" v-if="false">
                <i @click="artPass(rowIndex,colIndex)" :class="col.artificialFlag!=null&&col.artificialFlag==1?'isPassIcon fa fa-check':'none fa fa-check'"></i>
                <i @click="artFail(rowIndex,colIndex)" :class="col.artificialFlag!=null&&col.artificialFlag==0?'failPassIcon fa fa-close':'none fa fa-close'"></i>
              </div>
            </template>
            <template v-else>
              <el-input v-show="false" :class="'inputForm '+col.style" type="number" :disabled="col.artificialFlag!=null||tabCheck.specificationType==2||isPass" v-model="checkShowInputs[rowIndex].cols[colIndex].value" :placeholder="col.xpos+'-'+col.ypos" @change="checkInputChange(rowIndex,colIndex)"></el-input>
              <div class="airFlagNotNum">
                <i @click="artPass(rowIndex,colIndex)" :class="col.artificialFlag!=null&&col.artificialFlag==1?'isPassIcon fa fa-check':'none fa fa-check'"></i>
                <i @click="artFail(rowIndex,colIndex)" :class="col.artificialFlag!=null&&col.artificialFlag==0?'failPassIcon fa fa-close':'none fa fa-close'"></i>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>

    </div>
    <!-- 步骤提交 -->
    <div class="stepSubmit">
      <el-button type="success" v-if="isPass&&passType==1">{{tabCheck.itemDescription}}检验通过</el-button>
      <el-button type="danger" v-else-if="isPass&&passType==0">{{tabCheck.itemDescription}}检验失败</el-button>
      <el-button type="primary" v-else :disabled="needCheck!=0||isPass" @click="submitForm()">提交</el-button>
    </div>

    <!-- 提交前填写备注和上传图片 -->
    <el-dialog title="检测备注" :visible.sync="subDialogVisible" width="50%" center>
      <span>
        <el-upload :action="imgUpload.uploadUrl" :headers="imgUpload.headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="improvePicture__Success">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postCheckData()">提交检测</el-button>
        <el-button @click="subDialogVisible = false">取消检测</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import url from "api";
export default {
  name: "checkStep",
  props: ["tabCheck"],
  data() {
    return {
      isPass: false,
      passType: "",
      checkShowInputs: [], //xpos ypos
      //范围与公差
      computRang: {
        // minVal: 0,
        // maxVal: 0
      },
      //规范行数与列数
      position: {
        row: this.tabCheck.positionCount,
        col: this.tabCheck.inspectCount
      },
      //提交前备注框
      subDialogVisible: false,
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,

      //图片上传
      imgUpload: {
        uploadUrl:
          this.$api_baseurl(
            this.$store.getters.get_host ? this.$store.getters.get_host : ""
          ) + url.file_POST, //上传地址
        headers: {
          token: this.$store.getters.get_token,
          Accept: "application/json"
        },
        urlList:[],
      }
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    }),
    totalCheck: function() {
      let totalCheckNum = 0;
      for (let row of this.checkShowInputs) {
        for (let col of row.cols) {
          totalCheckNum++;
        }
      }
      return totalCheckNum;
    },
    needCheck: function() {
      let needCheckNum = 0;
      for (let row of this.checkShowInputs) {
        for (let col of row.cols) {
          if (!col.noValue) {
            needCheckNum++;
          }
        }
      }
      return needCheckNum;
    }
  },
  mounted() {
    this.checkInputs_input();
    this.computRang_init();
  },
  methods: {
    //--------上传图片处理--------- 
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    improvePicture__Success(res, file) {
      console.log(res);
      this.imgUpload.urlList.push(res.data);
    },
    //--------上传图片处理---------

    //提交结果
    submitForm() {
      if (this.isPass) return;

      this.subDialogVisible = true;
    },
    //保存检测数据
    postCheckData() {
      let inspect = this.checkList.inspect;
      let spec = this.tabCheck;
      let params = {
        details: this.checkFinal().details,
        inspect: {
          ptno: inspect.ptno, //产品编号
          line: inspect.line, //制程
          plant: inspect.plant, //车间
          process: inspect.process, //机台
          operator: inspect.operator, //人员
          orderNo: inspect.orderNo, //工令单号
          reconcile: inspect.reconcile, //调合
          pdNum: inspect.pdNum //生产数量
        },
        result: {
          flag: this.checkFinal().projectFlag * 1, //检验结论 ,
          specId: spec.specId //检验规范ID
        },
        urlList:this.imgUpload.urlList,
      };
      console.log(params);
      let urlPath = -1;
      if (inspect.type == 1) {
        urlPath = url.firstCheck_add;
      } else if (inspect.type == 3) {
        urlPath = url.tourCheck_add;
      }
      this.$post({
        url: urlPath,
        data: params
      }).then(res => {
        if (res.code == 1) {
          this.isPass = true;
          this.passType = params.result.flag;
          let finalView = {
            index: this.tabCheck.index,
            isPass: this.passType
          };
          this.subDialogVisible = false;
          this.$emit("checkEndListen", finalView);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //检验结论
    checkFinal() {
      let rArr = [];
      let details = [];
      for (let row of this.checkShowInputs) {
        for (let col of row.cols) {
          let obj = {
            artificialFlag: col.artificialFlag,
            flag: col.artificialFlag != null ? col.artificialFlag : col.flag,
            value: col.value,
            xpos: col.xpos,
            ypos: col.ypos
          };
          details.push(obj);
          rArr.push(obj.flag);
        }
      }
      let result = this.checkType_allInput(rArr) + ""; //检验结果 0 不通过 1 通过
      return {
        projectFlag: result,
        details: details
      };
    },
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
    //初始化检测输入框
    checkInputs_input() {
      let details = this.tabCheck.details ? this.tabCheck.details : null;
      let passType =
        this.tabCheck.noPass != undefined ? this.tabCheck.noPass : -1;
      this.specType = this.tabCheck.specificationType;
      this.passType = passType;
      if (details != null) {
        if (passType != -1) {
          this.isPass = true;
        }
        this.detailsNotNull_init();
      } else {
        this.detailsIsNull_init();
      }
    },
    //初始化非首次进入项目
    detailsNotNull_init() {
      let num = 0;
      let row = 1;
      let col = 0;
      for (let item of this.tabCheck.details) {
        if (item.xpos != num) {
          num++;
          row++;
        }
      }
      col = this.tabCheck.details.length / row;
      let index = 0;
      for (let i = 0; i < row; i++) {
        let rowArr = {
          name: "位置" + (i + 1),
          cols: []
        };
        for (let t = 0; t < col; t++) {
          let detail = this.tabCheck.details[index];
          let obj = {
            xpos: detail.xpos,
            ypos: detail.ypos,
            value: detail.value,
            artificialFlag: detail.artificialFlag,
            flag: detail.flag,
            style: "",
            noValue: detail.value != undefined ? true : false
          };
          obj.style = this.checkInputStyle_init(obj);
          rowArr.cols.push(obj);
          index++;
        }
        this.checkShowInputs.push(rowArr);
      }
    },
    //初始化首次进入项目
    detailsIsNull_init() {
      for (let i = 0; i < this.position.row; i++) {
        //for (let i = 0; i < 10; i++) {
        let row = {
          name: "位置" + (i + 1),
          cols: []
        };
        for (let t = 0; t < this.position.col; t++) {
          //for (let t = 0; t < 30; t++) {
          let obj = this.checkInputTemplate(i, t);
          row.cols.push(obj);
        }
        this.checkShowInputs.push(row);
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
    //检查组件模版
    checkInputTemplate(i, t) {
      let obj = {
        xpos: i,
        ypos: t,
        value: "",
        artificialFlag: null,
        flag: 0,
        style: "",
        noValue: false
      };
      return obj;
    },
    //添加检查个数
    addBtn() {
      for (let i = 0; i < this.checkShowInputs.length; i++) {
        let t = this.checkShowInputs[i].cols.length;
        this.checkShowInputs[i].cols.push(this.checkInputTemplate(i, t));
      }
    },
    //删除检查个数
    deleteBtn() {
      for (let i = 0; i < this.checkShowInputs.length; i++) {
        let t = this.checkShowInputs[i].cols.length;
        if (t > this.position.col) {
          this.checkShowInputs[i].cols.pop();
        } else {
          this.$message.error(
            "不能少于规范定义列数" + this.position.col + "个"
          );
        }
      }
    },
    //输入框值改变
    checkInputChange(rowIndex, colIndex) {
      if (this.isPass) return;
      if (
        this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag != null
      ) {
        this.checkShowInputs[rowIndex].cols[colIndex].style =
          this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag == 1
            ? "inputSuccess"
            : "inputFail";
      } else {
        if (this.checkShowInputs[rowIndex].cols[colIndex].value.length <= 0) {
          this.checkShowInputs[rowIndex].cols[colIndex].noValue = false;
          this.checkShowInputs[rowIndex].cols[colIndex].style = "";
        } else {
          this.checkShowInputs[rowIndex].cols[colIndex].noValue = true;
          this.checkShowInputs[rowIndex].cols[
            colIndex
          ].flag = this.checkType_input(
            this.checkShowInputs[rowIndex].cols[colIndex].value
          );
          if (this.checkShowInputs[rowIndex].cols[colIndex].flag == "1") {
            this.checkShowInputs[rowIndex].cols[colIndex].style =
              "inputSuccess";
          } else {
            this.checkShowInputs[rowIndex].cols[colIndex].style = "inputFail";
          }
        }
      }
    },
    //干预成功
    artPass(rowIndex, colIndex) {
      if (this.isPass) return;
      if (
        this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag != null
      ) {
        this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag = null;
        this.checkShowInputs[rowIndex].cols[colIndex].style = "";
      } else {
        if (
          this.tabCheck.specificationType != 2 &&
          this.checkShowInputs[rowIndex].cols[colIndex].value.length <= 0
        ) {
          this.$message.error("请先输入检测值");
        } else {
          this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag = 1;
          if (this.checkShowInputs[rowIndex].cols[colIndex].value.length <= 0) {
            this.checkShowInputs[rowIndex].cols[colIndex].flag = 1;
            this.checkShowInputs[rowIndex].cols[colIndex].noValue = true;
          }
        }
      }
      this.checkInputChange(rowIndex, colIndex);
    },
    //干预失败
    artFail(rowIndex, colIndex) {
      if (this.isPass) return;
      if (
        this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag != null
      ) {
        this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag = null;
        this.checkShowInputs[rowIndex].cols[colIndex].style = "";
      } else {
        if (
          this.tabCheck.specificationType != 2 &&
          this.checkShowInputs[rowIndex].cols[colIndex].value.length <= 0
        ) {
          this.$message.error("请先输入检测值");
        } else {
          this.checkShowInputs[rowIndex].cols[colIndex].artificialFlag = 0;
          if (this.checkShowInputs[rowIndex].cols[colIndex].value.length <= 0) {
            this.checkShowInputs[rowIndex].cols[colIndex].flag = 0;
            this.checkShowInputs[rowIndex].cols[colIndex].noValue = true;
          }
        }
      }
      this.checkInputChange(rowIndex, colIndex);
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
    }
  }
};
</script>

