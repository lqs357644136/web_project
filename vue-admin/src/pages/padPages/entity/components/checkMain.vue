<template>
    <div class="checkMain">
        <!-- 基础信息 -->
        <checkInfo></checkInfo>
        <!-- 检测项目 -->
        <el-card class="box-card checkProject">
            <el-tabs class="checkProjectBody" type="border-card">
                <el-tab-pane v-for="(check,index) in checkList.specList" :key="index">
                    <span slot="label">
                        <span v-if="true">
                            <i class="failPassIcon fa fa-close"></i>
                            <span class="failPassIcon">{{check.item.description}}({{check.itemValue}})</span>
                        </span>
                        <span v-else-if="check.noPass==1">
                            <i class="isPassIcon fa fa-check"></i>
                            <span class="isPassIcon">{{check.itemDescription}}({{check.itemValue}})</span>
                        </span>
                        <span v-else>
                            <i class="fa fa-wrench"></i>
                            <span>{{check.itemDescription}}({{check.itemValue}})</span>
                        </span>
                    </span>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import checkInfo from "./checkInfo.vue";
import checkStep from "./checkStep.vue";
export default {
  name: "checkMain",
  data() {
    return {
      formShow: false,
      checkStepData: []
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
  },
  mounted() {},
  methods: {
    checkStepData_init() {
      for (const spec of this.checkList.specList) {
        let specificationType = spec.specificationType;
        let obj = {
          specId: spec.id, //检验规范ID
          code: spec.item.code, //项目代号
          itemDescription: spec.item.description, //项目名称
          itemValue: spec.itemValue, //项目代号
          methodDescription: spec.method.description, //检测方法
          specificationType: specificationType, //规格类型：0(范围),1(公差) ,2(目测)
          inspectSpecification: spec.inspectSpecification, //检验规格值
          symbol: spec.symbol, //符号
          details: spec.details, //计算结果
          noPass: spec.flag != undefined ? spec.flag : -1, //没有通过检测
          positionCount: spec.positionCount,//行
          inspectCount: spec.inspectCount,//列 
        };
        this.checkStepData.push(obj);
      }
    }
  },
  components: {
    checkInfo,
    checkStep
  }
};
</script>

