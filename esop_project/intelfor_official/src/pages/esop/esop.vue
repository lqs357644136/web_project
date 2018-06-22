<template>
  <div class="plan">
    <h1>现场照片</h1>
    <h1>家电、电子、通信、家具、注塑、五金、汽配、汽车等</h1>
    <el-row :gutter="30" class="planBox live">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item,index) in liveImgs" :key="index">
        <img class="pc" @click="liveImgShow(index,item.img)" :src="item.img" alt="图片">
        <img class="mobile" :src="item.img" alt="图片">
      </el-col>
    </el-row>

    <el-row :gutter="30" class="planBox">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="(item,index) in planImgs" :key="index">
        <img :src="item.img" alt="图片">
      </el-col>
    </el-row>

    <bottom></bottom>
    <footerMod></footerMod>

    <!-- <el-dialog :visible.sync="fullImgShow" width="100%" center>
        <el-carousel :autoplay="false" height="200px" arrow="always" :initial-index="liveImgIndex">
        <el-carousel-item v-for="(item,index) in liveImgs" :key="index">
          <img @click="liveImgHide()" class="successImg" :src="item.img" alt="图片">
        </el-carousel-item>
      </el-carousel>
    </el-dialog> -->

  </div>
</template>

<script>
import Vue from "vue";
import { Carousel, CarouselItem, Row, Col } from "element-ui";
import footerMod from "components/layout/footerMod.vue";
import bottom from "components/layout/bottom.vue";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
export default {
  data() {
    return {
      planImgs: [
        { img: require("assets/images/plan/esop/1.png") },
        { img: require("assets/images/plan/esop/2.png") },
        { img: require("assets/images/plan/esop/3.png") },
        { img: require("assets/images/plan/esop/4.png") },
        { img: require("assets/images/plan/esop/5.png") },
        { img: require("assets/images/plan/esop/6.png") },
        { img: require("assets/images/plan/esop/7.png") },
        { img: require("assets/images/plan/esop/8.png") },
        { img: require("assets/images/plan/esop/9.png") },
        { img: require("assets/images/plan/esop/10.png") }
      ],
      liveImgs: [
        { img: require("assets/images/plan/esop/live/7.png") },
        { img: require("assets/images/plan/esop/live/8.png") },
        { img: require("assets/images/plan/esop/live/5.png") },
        { img: require("assets/images/plan/esop/live/11.png") },
        { img: require("assets/images/plan/esop/live/3.png") },
        { img: require("assets/images/plan/esop/live/10.png") },
        { img: require("assets/images/plan/esop/live/2.png") },
        { img: require("assets/images/plan/esop/live/1.png") },
        { img: require("assets/images/plan/esop/live/6.png") },
        { img: require("assets/images/plan/esop/live/12.png") },
        { img: require("assets/images/plan/esop/live/13.png") },
        { img: require("assets/images/plan/esop/live/14.png") }
      ],
      fullImgShow: false,
      liveImgIndex: 0
    };
  },
  methods: {
    liveImgShow(index, imgUrl) {
      // this.liveImgIndex = index;
      // document.querySelector("html").classList.add("ofh");
      // this.fullImgShow = true;

      this.$alert('<img src="' + imgUrl + '">', {
        dangerouslyUseHTMLString: true,
        showCancelButton: false,
        closeOnClickModal: true,
        showConfirmButton: false
      });
    },
    liveImgHide() {
      document.querySelector("html").classList.remove("ofh");
      this.fullImgShow = false;
    }
  },
  components: {
    footerMod,
    bottom
  }
};
</script>
