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
          path: "/ter/dailywork/adnDailywork",
          title: "异常报工",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: "/ter/dailywork/proDailywork",
          title: "生产报工",
          icon: "icon fa fa-snowflake-o"
        },
        {
          path: "/ter/batch/batchEnterRaw",
          title: "原料批次录入",
          icon: "icon fa fa-address-book-o"
        },
        {
          path: "/ter/batch/batchEnterBlend",
          title: "调合批次录入",
          icon: "icon fa fa-area-chart"
        },
        {
          path: "/ter/firstEntity",
          title: "首检录入",
          icon: "icon fa fa-pie-chart"
        },
        {
          path: "/ter/selfEntity",
          title: "自主检验",
          icon: "icon fa fa-id-card-o"
        },
        {
          path: '/ter/productInfo',
          title: "产品履历查看",
          icon: "icon fa fa-balance-scale"
        },
        {
          path: '/ter/saleLamReport',
          title: "安灯报表",
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




