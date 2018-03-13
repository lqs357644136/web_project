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
                        <p>{{item.text01}}</p>
                        <p>{{item.text02}}</p>
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
