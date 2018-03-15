<template>
  <div class="callme">
    <!-- banner -->
    <div class="banner">
      <img src="~assets/images/callme/callme_banner.png" alt="图片">
      <div class="text">
        <h1 class="text01 fadeInRight">利益社会</h1>
        <h1 class="text02 fadeInRight">利益客户</h1>
        <h1 class="text03 fadeInRight">利益企业</h1>
      </div>
    </div>

    <!-- main -->
    <div class="callmeMain">
      <el-card class="box-card">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="callmeText">
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
export default {
  name: "success",
  data() {
    return {
      successImgs: [
        {
          img: "https://picsum.photos/1024/400/?image=602",
          text01:
            "E-SOP：深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化",
          text02: "RFID：RFID实现数据采集、RFID感应智能切换SOP"
        },
        {
          img: "https://picsum.photos/1024/400/?image=603",
          text01:
            "APS：实现预测、订单、主计划的评审，智能排产、MRP、物料齐套运算、车间自动配料，实现全方位的智能计划体系",
          text02:
            "E-SOP：全无线覆盖的E-SOP终端，车间的电子化电子看板：智能电子看板、实时数据展示和预警，车间的目视化管理"
        },
        {
          img: "https://picsum.photos/1024/400/?image=604",
          text01:
            "E-SOP：深圳、惠州工厂全面实行E-SOP系统，触控一体机终端，车间电子化",
          text02:
            "安灯预警：车间问题和异常的实时数字预警、控制电子看板：智能电子看板、实时数据采集和预警，车间的目视化管理"
        }
      ]
    };
  },
  components: {
    footerMod
  }
};
</script>
