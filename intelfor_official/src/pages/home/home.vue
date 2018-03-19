<template>
  <div class="home">
    <!-- banner -->
    <div class="banner">
      <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="(item,index) in bannerImgs" :key="index">
          <img class="bannerImg" :src="item.img" alt="图片">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 宗旨 -->
    <div class="purpose">
      <h1>我们的主营业务</h1>
      <el-row class="body">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="texts">
          <p>智企信息专注数字工厂的解决方案、软件设计与开发、数据采集和显示设备，具备电子、电器、通信、五金、注塑、汽车、汽配、家具等行业的解决方案。</p>
          <p>目前有APS高级计划与排程、E-SOP、电子看板、安灯预警、电子叫料、数字车间管理、移动质量管理等软件系统和数字设备。 公司总部位于广州，业务遍布全国，在华北、华东、华南、中部地区、西部地区设立支持中心，为您提供全覆盖、全方位的服务和支持。</p>
          <p>智企车间数字化整体方案将为您的工厂实现全面的数字化、无纸化、目视化、无线移动式的管理，让您的工厂向智能化挺进！</p>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="info">
          <div class="title"> </div>
          <el-row class="imgs" :gutter="30">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="imgBox" v-for="(item,index) in purposeImgs" :key="index">
              <a><img :src="item.img" alt="图片"></a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <!-- 成功案例 -->
    <div class="success">
      <h1>我们成功案例</h1>
      <el-carousel :interval="1000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in successImgs" :key="index">
          <img class="successImg" :src="item.img" alt="图片">
        </el-carousel-item>
      </el-carousel>
    </div>
    <footerMod></footerMod>
  </div>
</template>

<script>
import Vue from "vue";
import footerMod from "components/layout/footerMod.vue";
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
        { img: require("assets/images/home/banner/2.png") },
        { img: require("assets/images/home/banner/1.png") },
        { img: require("assets/images/home/banner/3.png") },
        { img: require("assets/images/home/banner/4.png") },
      ],
      purposeImgs: [
        { img: require("assets/images/plan/esop/live/4.png") },
        { img: require("assets/images/plan/esop/live/10.png") },
        { img: require("assets/images/plan/esop/live/8.png") },
        { img: require("assets/images/plan/esop/live/1.png") }
      ],
      successImgs: [
        { img:require("assets/images/partner/logo1.jpg") },
        { img:require("assets/images/partner/logo2.jpg") },
        { img:require("assets/images/partner/logo3.jpg") },
        { img:require("assets/images/partner/logo4.jpg") },
        { img:require("assets/images/partner/logo5.jpg") },
        { img:require("assets/images/partner/logo6.jpg") },
        { img:require("assets/images/partner/logo7.jpg") },
        { img:require("assets/images/partner/logo8.jpg") },
        { img:require("assets/images/partner/logo9.jpg") },
      ]
    };
  },
  components: {
    footerMod
  }
};
</script>

