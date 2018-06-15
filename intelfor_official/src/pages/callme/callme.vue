<template>
  <div class="callme">
    <!-- banner -->
    <div v-if="callmeShow" class="banner animated flipInX">
      <img src="~assets/images/callme/callme_banner.png" alt="图片">
      <div class="text">
        <h1 class="text01 fadeInRight">利益社会</h1>
        <h1 class="text02 fadeInRight">利益客户</h1>
        <h1 class="text03 fadeInRight">利益企业</h1>
      </div>
    </div>

    <!-- main -->
    <div v-if="callmeShow" class="callmeMain">
      <el-card class="box-card">
        <el-row :gutter="30">
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>公司名称 :</label>
            <span class="value">广州智企信息技术有限公司</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>电话 :</label>
            <span class="value">
              <a href="tel:400-8166-116">400-8166-116</a>
            </span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>邮箱 :</label>
            <span class="value">
              <a href="mailto:Sales@intelfor.net">Sales@intelfor.net</a>
            </span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>地址 :</label>
            <span class="value">广州市萝岗区偃月路萝岗万达C1栋2905</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>总部 :</label>
            <span class="value">广州市高新区科丰路81号万代广场C1座2905</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>支持中心 :</label>
            <span class="value">广州、苏州、北京、武汉、重庆</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <label>销售中心 :</label>
            <span class="value">全国21个省市</span>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
            <img :src="callme_info" alt="callme_info">
          </el-col>
        </el-row>
      </el-card>
    </div>
    <footerMod></footerMod>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Row, Col } from "element-ui";
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
import footerMod from "components/layout/footerMod.vue";
import bottom from "components/layout/bottom.vue";
export default {
  name: "success",
  data() {
    return {
      callme_info:require("assets/images/callme/callme_info.png"),
      callmeShow:false,
    };
  },
  created () {
    setTimeout(() => {
      this.callmeShow = true;
    }, 500);
  },
  methods: {
    
  },
  components: {
    footerMod,
    bottom
  }
};
</script>
