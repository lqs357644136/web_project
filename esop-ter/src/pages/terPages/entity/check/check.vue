<template>

  <div class="checkView">
    <el-card :class="formShow?'box-card checkInfo':'box-card checkInfo card-body-hidden'">
      <div slot="header" class="clearfix">
        <span>检测资料</span>
        <span class="card-hidden-btn" @click="formShow=!formShow">
          <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
        </span>
      </div>
      <el-form class="">
        <el-row class="infoItem" :gutter="20">
          <el-col class="item" :xs="24" :sm="24" :md="6" :lg="6" v-for="(info,index) in checkInfo" :key="index">
            <el-form-item :label="info.title">
              <el-input type="text" :disabled="true" v-model="info.value" :placeholder="info.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 检测流程 -->
    <el-card class="box-card checkMain">
      <div slot="header" class="clearfix">
        <span>检测流程</span>
      </div>
        <el-tabs class="checkMainBody" type="border-card">
          <el-tab-pane v-for="(check,index) in checkStep" :key="index">
            <span slot="label">
              <span v-if="check.noPass==0">
                <i class="failPassIcon fa fa-close"></i>
                <span class="failPassIcon">{{check.itemDescription}}</span>
              </span>
              <span v-else-if="check.noPass==1">
                <i class="isPassIcon fa fa-check"></i>
                <span class="isPassIcon">{{check.itemDescription}}</span>
              </span>
              <span v-else>
                <i class="fa fa-wrench"></i>
                <span>{{check.itemDescription}}</span>
              </span>
            </span>
            <checkStep v-on:checkEndListen="checkEndView" :tabCheck="check"></checkStep>
          </el-tab-pane>
        </el-tabs>
    </el-card>

  </div>

</template>

<script>
import checkStep from "./checkStep.vue";
import { mapGetters } from "vuex";
import { $dataFormat } from "common/filiter/index.js";

export default {
  data() {
    return {
      formShow: true,
      loading: false,
      msg: null,
      checkInfo: null,
      checkStep: [],
      finalObj: null,
      msgItems: [],
      allPass: false
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
  },
  mounted() {},
  watch: {
    checkList: function() {
      this.checkInfo_init();
    }
  },
  components: {
    checkStep
  },
  methods: {
    //初始化检测信息
    checkInfo_init() {
      this.leftInfo_init();
      this.checkStep_init();
    },
    //初始化左侧检测信息
    leftInfo_init() {
      this.checkInfo = [
        {
          title: "制品编号",
          name: "ptno",
          value: this.checkList.inspect.ptno
        }, //编号
        {
          title: "生产数量",
          name: "pdNum",
          value: this.checkList.inspect.pdNum + ""
        }, //生产数量
        {
          title: "工令单号",
          name: "orderNo",
          value: this.checkList.inspect.orderNo
        }, //工令单号
        {
          title: "制程",
          name: "line",
          value: this.checkList.inspect.line
        }, //制程
        {
          title: "车间",
          name: "plant",
          value: this.checkList.inspect.plant
        }, //车间
        {
          title: "机台",
          name: "process",
          value: this.checkList.inspect.process
        }, //机台
        {
          title: "人员",
          name: "operator",
          value: Window.GETMACINFO().empNo + ""
        }, //人员
        {
          title: "调合",
          name: "reconcile",
          value: this.checkList.inspect.reconcile
        }, //调合
      ];
    },
    //初始化检测流程
    checkStep_init() {
      let index = 0;
      for (const spec of this.checkList.specList) {
        let specificationType = spec.specificationType;
        let project = {
          specId: spec.id, //检验规范ID
          code: spec.item.code, //项目代号
          itemDescription: spec.item.description, //项目名称
          methodDescription: spec.method.description, //检测方法
          specificationType: specificationType, //规格类型：0(范围),1(公差) ,
          inspectSpecification: spec.inspectSpecification, //检验规格
          symbol: spec.symbol, //符号
          details: spec.details, //计算结果
          noPass: spec.flag!=undefined ? spec.flag : -1, //没有通过检测
          index: index
        };
        if (specificationType == 0) {
          project.lowerLimit = spec.lowerLimit; //范围最小值
          project.upperLimit = spec.upperLimit; //范围最大值
        } else if (specificationType == 1) {
          project.stdValue = spec.stdValue; //标准值
          project.stdValueMinus = spec.stdValueMinus; //标准值-
          project.stdValuePlus = spec.stdValuePlus; //标准值+
        }
        this.checkStep.push(project);
        index++;
      }
      this.isAllPass(this.checkList.inspect.type);
    },
    //检测成功后改变样式
    isPass_change(index, result) {
      this.checkStep[index].noPass = result;
    },
    //判断是否全部项目通过
    isAllPass(type) {
      if (type == "0") {
        let flag = true;
        this.checkStep.forEach((val, index) => {
          if (val.noPass) {
            //判断是否检测成功
            flag = false;
          }
        });
        if (flag) {
          this.$notify({
            title: "成功",
            message: name + "所有项目检测通过,可以量产",
            type: "success"
          });
          this.allPass = true;
        }
      }
    },
    //检测结果
    checkEndView(finalView) {
      this.isPass_change(finalView.index, finalView.isPass);
    },
    checkEnd_clear() {
      this.msgItems = [];
    }
  }
};
</script>
