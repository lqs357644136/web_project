<template>
  <div class="home">
    <!-- banner -->
    <div class="banner">
      <el-carousel :interval="5000" arrow="always" >
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
          <p>智企信息专注数字工厂的解决方案、软件设计与开发、数据采集和显示设备，具备电子、电器、通信、五金、注塑、汽车、汽配、家具等行业的解决方案。目前有APS高级计划与排程、E-SOP、电子看板、安灯预警、电子叫料、数字车间管理、移动质量管理等软件系统和数字设备。 公司总部位于广州，业务遍布全国，在华北、华东、华南、中部地区、西部地区设立支持中心，为您提供全覆盖、全方位的服务和支持。智企车间数字化整体方案将为您的工厂实现全面的数字化、无纸化、目视化、无线移动式的管理，让您的工厂向智能化挺进！</p>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="info">
          <div class="title">生产现场</div>
          <el-row class="imgs" :gutter="30">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="imgBox" v-for="(item,index) in purposeImgs" :key="index">
              <img :src="item.img" alt="图片">
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <!-- 成功案例 -->
    <div class="success">
      <h1>我们成功案例</h1>
      <el-carousel :interval="4000" type="card" height="200px">
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
import { Carousel, CarouselItem,Row,Col } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
export default {
  name: "home",
  data() {
    return {
      bannerImgs: [
        { img: "https://picsum.photos/1024/400/?image=602" },
        { img: "https://picsum.photos/1024/400/?image=603" },
        { img: "https://picsum.photos/1024/400/?image=604" },
        { img: "https://picsum.photos/1024/400/?image=605" },
        { img: "https://picsum.photos/1024/400/?image=606" },
        { img: "https://picsum.photos/1024/400/?image=607" },
        { img: "https://picsum.photos/1024/400/?image=608" }
      ],
      purposeImgs: [
        { img: "https://picsum.photos/1024/500/?image=616" },
        { img: "https://picsum.photos/1024/500/?image=617" },
        { img: "https://picsum.photos/1024/500/?image=618" },
        { img: "https://picsum.photos/1024/500/?image=619" }
      ],
      successImgs: [
        { img: "https://picsum.photos/1024/500/?image=609" },
        { img: "https://picsum.photos/1024/500/?image=610" },
        { img: "https://picsum.photos/1024/500/?image=611" },
        { img: "https://picsum.photos/1024/500/?image=612" },
        { img: "https://picsum.photos/1024/500/?image=613" },
        { img: "https://picsum.photos/1024/500/?image=614" },
        { img: "https://picsum.photos/1024/500/?image=615" }
      ]
    };
  },
  components: {
    footerMod
  }
};
</script>

