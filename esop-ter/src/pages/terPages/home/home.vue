<template>
  <div class="home">
    <div class="menus">
      <div class="menuBox" @click="goPage(item.path)" v-for="(item,index) in menus" :key="index">
        <i :class="item.icon"></i>
        <span class="text">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
//测试请求接口地址
let api = '192.168.60.230:8080';
let kanbanApi = '192.168.62.63';
export default {
  data() {
    return {
      menus: [
        {
          path: "/ter/dailywork/adnDailywork?ip="+api,
          title: "异常报工",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: "/ter/dailywork/proDailywork?ip="+api,
          title: "生产报工",
          icon: "icon fa fa-snowflake-o"
        },
        {
          path: "/ter/batch/batchEnterRaw?ip="+api,
          title: "原料批次录入",
          icon: "icon fa fa-address-book-o"
        },
        {
          path: "/ter/batch/batchEnterBlend?ip="+api,
          title: "调合批次录入",
          icon: "icon fa fa-area-chart"
        },
        {
          path: "/ter/firstEntity?ip="+api,
          title: "首检录入",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: "/ter/selfEntity?ip="+api,
          title: "自主检验",
          icon: "icon fa fa-id-card-o"
        },
        {
          path: '/ter/productInfo?ip='+api,
          title: "产品履历查看",
          icon: "icon fa fa-balance-scale"
        },
        {
          path: '/ter/saleLamReport?ip='+api,
          title: "安灯报表",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/machineReachRate?ip='+api,
          title: "机台电子看板",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/prodSchedule?ip='+api,
          title: "总排程电子看板",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/wholeReachRate?ip='+api,
          title: "整体达成率电子看板",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/precautions?ip='+api,
          title: "注意事项",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: '/ter/zjj_demo01?ip='+kanbanApi+'&Plant=ZSA&Line=A',
          title: "中技佳电子看板(一)",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: '/ter/zjj_demo02?ip='+kanbanApi+'&Plant=ZSA&Line=A',
          title: "中技佳电子看板(二)",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: '/ter/xr?ip='+api+'&id=4028818a614115b80161412f6434000e',
          title: "X Bar 图",
          icon: "icon fa fa-balance-scale"
        },
      ]
    };
  },
  methods: {
    goPage(path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$notify.info({
          title: "消息",
          message: "功能尚未开发完成"
        });
      }
    }
  }
};
</script>




