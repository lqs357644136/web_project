<template>
  <div class="home">
    <!-- banner -->
    <div class="banner animated fadeInRightBig">
      <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="(item,index) in bannerImgs" :key="index">
          <img v-if="item.link" @click="$router.push(item.link);" class="bannerImg" :src="item.img" alt="图片">
          <img class="bannerImg" :src="item.img" alt="图片">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 宗旨 -->
    <div class="purpose animated fadeInLeftBig" v-if="purposeShow">
      <h1>我们的主营业务</h1>
      <el-row class="body">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="texts">
          <p>智企信息专注数字工厂的解决方案、软件设计与开发、数据 采集和智能终端设备，具备电子、电器、通信、五金、注塑、汽 车、汽配、家具等行业的数字化解决方案。
          </p>
          <p class="purpose-ptno">主要产品：</p>
          <el-row class="ptno">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . E-SOP 电子作业指导书
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 智能电子看板
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 数字安灯预警
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 电子叫料
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 数字车间管理系统
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . APS 高级计划与排程
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 移动质量管理
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . 触控一体机
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              . iBox 智能盒子
            </el-col>
          </el-row>
          <p>公司总部位于广州，业务遍布全国，在华北、华东、华南、 华中、西部地区设有服务中心，为您提供全覆盖、全方位的服务 和支持
          </p>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="info">
          <div class="title"> </div>
          <el-row class="imgs" :gutter="30">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="imgBox animated flipInX" v-for="(item,index) in purposeImgs" :key="index">
              <a><img @click="$router.push(item.link)" :src="item.img" alt="图片"></a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <!-- 成功案例 -->
    <div class="success animated fadeInLeftBig" v-if="successShow">
      <h1>我们成功案例</h1>
      <el-carousel :interval="2000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in successImgs" :key="index">
          <img class="successImg" :src="item.img" alt="图片">
        </el-carousel-item>
      </el-carousel>
    </div>
    <bottom></bottom>
    <footerMod></footerMod>
  </div>
</template>

<script>
import Vue from "vue";
import footerMod from "components/layout/footerMod.vue";
import bottom from "components/layout/bottom.vue";
import { Carousel, CarouselItem, Row, Col } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
export default {
  name: "home",
  data() {
    return {
      bannerImgs: [
        { img: require("assets/images/home/banner/2.png"), link: "/esop" },
        { img: require("assets/images/home/banner/3.png"), link: "/kanban" },
        { img: require("assets/images/home/banner/1.png"), link: "/callme" },
        { img: require("assets/images/home/banner/4.png") }
      ],
      purposeImgs: [
        { img: require("assets/images/plan/esop/live/7.png"), link: "/esop" },
        { img: require("assets/images/home/home_plan/2.png"), link: "/esop" },
        { img: require("assets/images/plan/esop/live/10.png"), link: "/esop" },
        { img: require("assets/images/home/home_plan/1.png"), link: "/kanban" }
      ],
      successImgs: [
        { img: require("assets/images/partner/logo1.jpg") },
        { img: require("assets/images/partner/logo2.jpg") },
        { img: require("assets/images/partner/logo3.jpg") },
        { img: require("assets/images/partner/logo4.jpg") },
        { img: require("assets/images/partner/logo5.jpg") },
        { img: require("assets/images/partner/logo6.jpg") },
        { img: require("assets/images/partner/logo7.jpg") },
        { img: require("assets/images/partner/logo8.jpg") },
        { img: require("assets/images/partner/logo9.jpg") }
      ],
      purposeShow: false,
      successShow: false
    };
  },
  created() {
    setTimeout(() => {
      this.purposeShow = true;
    }, 200);
    setTimeout(() => {
      this.successShow = true;
    }, 300);
  },
  components: {
    footerMod,
    bottom
  }
};
</script>

