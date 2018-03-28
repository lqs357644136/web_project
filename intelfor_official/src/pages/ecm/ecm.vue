<template>
    <div class="plan">
        <el-row :gutter="30" class="planBox dworkspaceBox">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="(item,index) in planImgs" :key="index">
                <img :src="item.img" alt="图片">
            </el-col>
        </el-row>
        <h1>叫料看板</h1>
        <el-row :gutter="30" class="planBox">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="(item,index) in liveImgs" :key="index">
                <a class="pc" :href="item.img"><img :src="item.img" alt="图片"></a>
                <img class="mobile" :src="item.img" alt="图片">
            </el-col>
        </el-row>
        <bottom></bottom>
        <footerMod></footerMod>
    </div>
</template>

<script>
import Vue from "vue";
import { Row, Col } from "element-ui";
import footerMod from "components/layout/footerMod.vue";
import bottom from "components/layout/bottom.vue";
Vue.use(Row);
Vue.use(Col);
export default {
  data() {
    return {
      planImgs: [
        { img: require("assets/images/plan/ecm/1.png") },
        { img: require("assets/images/plan/ecm/2.png") }
      ],
      liveImgs: [{ img: require("assets/images/plan/ecm/live/1.png") }]
    };
  },
  components: {
    footerMod,
    bottom
  }
};
</script>
