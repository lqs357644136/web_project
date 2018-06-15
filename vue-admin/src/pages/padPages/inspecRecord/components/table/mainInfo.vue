<template>
    <el-card :class="formShow?'box-card checkInfo':'box-card checkInfo card-body-hidden'">
        <div slot="header" class="clearfix">
            <span>检测资料</span>
            <span class="card-hidden-btn" @click="formShow=!formShow">
                <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
            </span>
        </div>
        <el-form class="">
            <el-row class="infoItem" :gutter="20">
                <el-col class="item" :xs="24" :sm="6" :md="6" :lg="6" v-for="(info,index) in checkInfo" :key="index">
                    <el-form-item :label="info.title">
                        <el-input type="text" :disabled="true" v-model="info.value" :placeholder="info.title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "mainInfo",
  props:['info'],
  data() {
    return {
      formShow: false,
      checkInfo: [],
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
  },
  mounted() {
    this.info_init();
  },
  methods: {
    //初始化基础信息
    info_init() {
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
          title: "产品",
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
          value: this.checkList.inspect.operator
        }, //人员
        {
          title: "调合",
          name: "reconcile",
          value: this.checkList.inspect.reconcile
        } //调合
      ];
      this.imgs = this.info.urlList;
    }
  }
};
</script>
