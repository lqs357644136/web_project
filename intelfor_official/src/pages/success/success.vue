<template>
  <div class="success">
    <!-- banner -->
    <div class="banner">
      <img src="~assets/images/success/success_banner.png" alt="图片">
      <div class="text">
        <h1>成功案例</h1>
        <h5>我们有丰富的经验,曾经为多家大企业服务</h5>
      </div>
    </div>

    <!-- main -->
    <div class="successMain">
      <el-card class="box-card" v-for="(item,index) in successImgs" :key="index">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="img">
            <img :src="item.img" alt="">
          </el-col>
          <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="text">
            <div class="textGourp">
              <label>{{item.text01.label}}:</label>
              <span>{{item.text01.value}}</span>
            </div>
            <div class="textGourp">
              <label>{{item.text02.label}}:</label>
              <span>{{item.text02.value}}</span>
            </div>
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
import footerMod from "components/layout/footerMod.vue";
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
export default {
  name: "success",
  data() {
    return {
      successImgs: [
        {
          img: "https://picsum.photos/1024/400/?image=602",
          text01: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          },
          text02: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          }
        },
        {
          img: "https://picsum.photos/1024/400/?image=603",
          text01: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          },
          text02: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          }
        },
        {
          img: "https://picsum.photos/1024/400/?image=604",
          text01: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          },
          text02: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          }
        },
        {
          img: "https://picsum.photos/1024/400/?image=605",
          text01: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          },
          text02: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          }
        }
      ]
    };
  },
  components: {
    footerMod
  }
};
</script>
