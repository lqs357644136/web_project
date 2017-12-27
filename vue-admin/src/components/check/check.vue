<template>

    <div class="checkView">

        <el-row class="checkViewRow" :gutter="10">
            <!-- 检测详细资料 -->
            <el-col class="checkInfo" :xs="24" :sm="24" :md="8" :lg="8">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>检测资料</span>
                    </div>
                    <el-row class="infoItem">
                        <el-col class="item" :span="24" v-for="(info,index) in checkInfo" :key="index">
                            <label for="">{{info.title}}
                                <span></span>
                            </label>

                            <el-tooltip effect="dark" :content="info.value" placement="top-start">
                                <div class="value">: {{info.value}}</div>
                            </el-tooltip>
                        </el-col>

                    </el-row>
                </el-card>
            </el-col>

            <!-- 工作区域 -->
            <el-col class="checkSpace" :xs="24" :sm="24" :md="16" :lg="16">

                <!-- 检测流程 -->
                <el-card class="box-card checkMain">
                    <div slot="header" class="clearfix">
                        <span>检测流程</span>
                    </div>
                    <div class="checkMainBody">
                        <el-tabs type="border-card">
                            <el-tab-pane v-for="(check,index) in checkStep" :key="index">
                                <span slot="label">
                                    <i class="fa fa-certificate"></i> {{check.itemDescription}}
                                </span>
                                <checkStep v-on:checkEndListen="checkEndView" :tabCheck="check"></checkStep>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>

                <!-- 详细检测结果 -->
                <el-card class="box-card checkEnd">
                    <div slot="header" class="clearfix">
                        <span>检测结果</span>
                    </div>
                    <div class="checkEndBody" v-loading="loading" element-loading-text="检测计算中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <div class="success" v-if="msg=='success'">
                            <p>高度:通过..........</p>
                            <p>尺寸:通过..........</p>
                            <p>精度:通过..........</p>
                            <p>质量:通过..........</p>
                            <p>..................</p>
                        </div>
                        <div class="error" v-else-if="msg=='error'">
                            <p>高度:失败..........</p>
                            <p>尺寸:失败..........</p>
                            <p>精度:失败..........</p>
                            <p>质量:失败..........</p>
                            <p>..................</p>
                        </div>
                        <span v-else>等待检测</span>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </div>

</template>

<script>
import checkStep from "./checkStep.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      msg: null,
      checkInfo: null,
      checkStep: []
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
  },
  mounted() {
    this.checkInfo_init();
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
        { title: "制品编号", name: "ptno", value: this.checkList.inspect.ptno }, //编号
        {
          title: "制程",
          name: "line",
          value: this.checkList.inspect.line.linedesc
        }, //制程
        {
          title: "车间",
          name: "plant",
          value: this.checkList.inspect.plant.plantdesc
        }, //车间
        {
          title: "机台",
          name: "process",
          value: this.checkList.inspect.process.processname
        }, //机台
        {
          title: "人员",
          name: "operator",
          value: this.checkList.inspect.updateBy
        }, //人员
        {
          title: "工令单号",
          name: "orderNo",
          value: this.checkList.inspect.orderNo
        }, //工令单号
        {
          title: "调合",
          name: "reconcile",
          value: this.checkList.inspect.reconcile
        }, //调合
        { title: "生产数量", name: "pdNum", value: this.checkList.inspect.pdNum } //生产数量
      ];
    },
    //初始化检测流程
    checkStep_init() {
      for (let spec of this.checkList.specList) {
        let specificationType = spec.specificationType;
        let project = {
          itemDescription: spec.item.description, //项目名称
          methodDescription: spec.method.description, //检测方法
          specificationType: specificationType, //规格类型：0(范围),1(公差) ,
          symbol:spec.symbol//符号
        };
        if (specificationType == 0) {
            project.lowerLimit = spec.lowerLimit;//范围最小值
            project.upperLimit = spec.upperLimit;//范围最大值
        } else if (specificationType == 1) {
            project.stdValue = spec.stdValue;//标准值
            project.stdValueMinus = spec.stdValueMinus;//标准值-
            project.stdValuePlus = spec.stdValuePlus;//标准值+
        }
        this.checkStep.push(project);
      }
    },
    checkEndView(msg) {
      new Promise((resolve, reject) => {
        resolve((this.loading = true));
      }).then(() => {
        setTimeout(() => {
          this.loading = false;
          this.msg = msg;
          if (msg == "success") {
            this.$notify({
              title: "成功",
              message: "首检成功",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "首检失败,有存在公差或者未填数值"
            });
          }
        }, 3000);
      });
    }
  }
};
</script>
