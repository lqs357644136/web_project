<template>

    <div class="checkView">

        <!-- 检测详细资料 -->
        <el-card class="checkInfo">
            <el-row class="infoItem">

                <el-col class="item" :span="24" v-for="(info,index) in checkList.checkInfo" :key="index">
                    <label for="">{{info.title}}: </label>
                    <div>{{info.value}}</div>
                </el-col>

            </el-row>
        </el-card>

        <el-card class="checkSpace">

            <!-- 下拉框与误差范围 -->
            <div class="checkSelect">

                <div class="selectGroup">

                    <label for="">检测方法</label>

                    <el-select v-model="selectValue" clearable placeholder="请选择">
                        <el-option v-for="selectItem in checkList.selectOption" :key="selectItem.value" :label="selectItem.label" :value="selectItem.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="deviation">
                    误差范围:{{checkList.deviation.min}}-{{checkList.deviation.max}}
                </div>
            </div>

            <!-- 检测流程 -->
            <el-tabs class="checkMain" type="border-card">

                <el-tab-pane v-for="(check,index) in checkList.checkTypes" :key="index">
                    <span slot="label">
                        <i class="fa fa-certificate"></i> {{check}}
                    </span>
                    <checkStep v-on:checkEndListen="checkEndView" :checkList="checkList"></checkStep>
                </el-tab-pane>

            </el-tabs>

            <!-- 详细检测结果 -->
            <el-card class="checkEnd box-card" v-loading="loading" element-loading-text="检测计算中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

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

            </el-card>

        </el-card>

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
        }, 3000);
      });
    }
  }
};
</script>
