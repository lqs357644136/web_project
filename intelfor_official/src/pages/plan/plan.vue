<template>
  <div class="plan">
    <el-row :gutter="30" class="planBox">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="(item,index) in planImgs" :key="index">
        <img :src="item.img" alt="图片">
      </el-col>
    </el-row>
    <h1>现场照片</h1>
    <el-row :gutter="30" class="planBox">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item,index) in liveImgs" :key="index">
        <a class="pc" :href="item.img"><img :src="item.img" alt="图片"></a>
        <img class="mobile" :src="item.img" alt="图片">
      </el-col>
    </el-row>
    <footerMod></footerMod>
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col } from "element-ui";
import footerMod from "components/layout/footerMod.vue";
Vue.use(Row);
Vue.use(Col);
export default {
  data() {
    return {
      planImgs: [
        { img: require("assets/images/plan/1.png") },
        { img: require("assets/images/plan/2.png") },
        { img: require("assets/images/plan/3.png") },
        { img: require("assets/images/plan/4.png") },
        { img: require("assets/images/plan/5.png") },
        { img: require("assets/images/plan/6.png") },
        { img: require("assets/images/plan/7.png") },
        { img: require("assets/images/plan/8.png") },
        { img: require("assets/images/plan/9.png") },
        { img: require("assets/images/plan/10.png") },
        { img: require("assets/images/plan/11.png") }
      ],
      liveImgs: [
        { img: require("assets/images/plan/live/1.png") },
        { img: require("assets/images/plan/live/2.png") },
        { img: require("assets/images/plan/live/3.png") },
        { img: require("assets/images/plan/live/4.png") },
        { img: require("assets/images/plan/live/5.png") },
        { img: require("assets/images/plan/live/7.png") },
        { img: require("assets/images/plan/live/8.png") },
        { img: require("assets/images/plan/live/9.png") },
        { img: require("assets/images/plan/live/10.png") },
        { img: require("assets/images/plan/live/11.png") },
      ]
    };
  },
  components: {
    footerMod
  }
};
</script>
