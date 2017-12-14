<template>

    <div class="checkView">

        <el-row class="checkViewRow" :gutter="10">
            <!-- 检测详细资料 -->
            <el-col class="checkInfo" :xs="24" :sm="24" :md="6" :lg="6">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>检测资料</span>
                    </div>
                    <el-row class="infoItem">
                        <el-col class="item" :span="24" v-for="(info,index) in checkList.checkInfo" :key="index">
                            <label for="">{{info.title}}: </label>
                            <div>{{info.value}}</div>
                        </el-col>

                    </el-row>
                </el-card>
            </el-col>

            <!-- 工作区域 -->
            <el-col class="checkSpace" :xs="24" :sm="24" :md="18" :lg="18">

                <!-- 检测流程 -->
                <el-card class="box-card checkMain">
                    <div slot="header" class="clearfix">
                        <span>检测流程</span>
                    </div>
                    <div class="checkMainBody">
                        <el-tabs type="border-card">
                            <!--  测试方式与误差范围 -->
                            <div class="checkChioce">
                                <div class="testType">检测方式:目测</div>
                                <div class="deviation">
                                    误差范围:{{checkList.deviation.min}}-{{checkList.deviation.max}}
                                </div>
                            </div>
                            <el-tab-pane v-for="(check,index) in checkList.checkTypes" :key="index">
                                <span slot="label">
                                    <i class="fa fa-certificate"></i> {{check}}
                                </span>
                                <checkStep v-on:checkEndListen="checkEndView" :checkList="checkList"></checkStep>
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

export default {
  data() {
    return {
      loading: false,
      selectValue: "",
      msg: null
    };
  },
  props: ["checkList"],
  components: {
    checkStep
  },
  methods: {
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
