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
              <span class="value">{{item.text01.value}}</span>
            </div>
            <div class="textGourp">
              <label>{{item.text02.label}}:</label>
              <span class="value">{{item.text02.value}}</span>
            </div>
            <div v-if="item.text03" class="textGourp">
              <label>{{item.text03.label}}:</label>
              <span class="value">{{item.text03.value}}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <bottom></bottom>
    <footerMod></footerMod>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Row, Col } from "element-ui";
import bottom from "components/layout/bottom.vue";
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
          img: require("assets/images/partner/logo5.jpg"),
          text01: {
            label: "E-SOP",
            value:
              "深圳、广州、南京三工厂全面实行电子作业指导书系统，触控一体机终端，车间电子化"
          },
          text02: {
            label: "RFID",
            value: "实现RFID数据采集、RFID感应智能切换SOP，MES系统对接"
          }
        },
        {
          img: require("assets/images/partner/logo3.jpg"),
          text01: {
            label: "APS",
            value:
              "实现预测、订单、主计划的评审，智能排产、MRP、物料齐套运算、车间自动配料，实现全方位的智能计划体系"
          },
          text02: {
            label: "E-SOP",
            value:
              "全无线覆盖的E-SOP终端，车间的电子化系统对接：SAP系统、SRM系统、PLM系统对接"
          }
        },
        {
          img: require("assets/images/partner/logo8.jpg"),
          text01: {
            label: "E-SOP",
            value: "集团工厂全面实行E-SOP系统管理，智能触控一体机，车间电子化"
          },
          text02: {
            label: "安灯预警",
            value: "车间异常和问题的实时数字预警、监控"
          },
          text03: {
            label: "电子看板",
            value: "智能电子看板、实时数据采集和预警，车间的目视化管理"
          }
        },
        {
          img: require("assets/images/partner/logo4.jpg"),
          text01: {
            label: "E-SOP",
            value:
              "iPhone生产车间实现SOP的电子化作业，自动播放、自动提醒、离线播放、自动预警等功能全面应用"
          },
          text02: {
            label: "安灯预警",
            value: "车间问题和异常的实时数字预警、控制"
          }
        },
        {
          img: require("assets/images/partner/logo1.jpg"),
          text01: {
            label: "E-SOP",
            value: "实行E-SOP系统管理，智能触控一体机，车间电子化"
          },
          text02: {
            label: "5G Wifi",
            value: "车间实现在5G Wifi全覆盖下的电子化应用"
          }
        },
        {
          img: require("assets/images/partner/logo9.jpg"),
          text01: {
            label: "E-SOP",
            value: "集团工厂实行E-SOP系统管理，智能触控一体机，车间电子化"
          },
          text02: {
            label: "设备采集",
            value: "测试设备采集、检验设备数据采集"
          },
          text03: {
            label: "电子看板",
            value: "智能电子看板、配料看板、叫料"
          }
        }
      ]
    };
  },
  components: {
    footerMod,
    bottom
  }
};
</script>
