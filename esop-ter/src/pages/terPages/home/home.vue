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
export default {
  data() {
    return {
      menus: [
        {
          path: "/ter/dailywork/adnDailywork?ip=192.168.1.12:8080",
          title: "异常报工",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: "/ter/dailywork/proDailywork?ip=192.168.1.12:8080",
          title: "生产报工",
          icon: "icon fa fa-snowflake-o"
        },
        {
          path: "/ter/batch/batchEnterRaw?ip=192.168.1.12:8080",
          title: "原料批次录入",
          icon: "icon fa fa-address-book-o"
        },
        {
          path: "/ter/batch/batchEnterBlend?ip=192.168.1.12:8080",
          title: "调合批次录入",
          icon: "icon fa fa-area-chart"
        },
        {
          path: "/ter/firstEntity?ip=192.168.1.12:8080",
          title: "首检录入",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: "/ter/selfEntity?ip=192.168.1.12:8080",
          title: "自主检验",
          icon: "icon fa fa-id-card-o"
        },
        {
          path: '/ter/productInfo?ip=192.168.1.12:8080',
          title: "产品履历查看",
          icon: "icon fa fa-balance-scale"
        },
        {
          path: '/ter/saleLamReport?ip=192.168.1.12:8080',
          title: "安灯报表",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/machineReachRate?ip=192.168.1.12:8080',
          title: "机台电子看板",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/prodSchedule?ip=192.168.1.12:8080',
          title: "总排程电子看板",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: '/ter/wholeReachRate?ip=192.168.1.12:8080',
          title: "整体达成率电子看板",
          icon: "icon fa fa-pie-chart"
        }
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




