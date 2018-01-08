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
          path: "/ter/selfEntity/selfEntity.vue",
          title: "自主检验",
          icon: "icon fa fa-id-card-o"
        },
        {
          path: "/batchEntity/batchEntityBlend.vue",
          title: "原料批次录入",
          icon: "icon fa fa-address-book-o"
        },
        {
          path: "/batchEntity/batchEntityRaw.vue",
          title: "调合批次录入",
          icon: "icon fa fa-area-chart"
        },
        {
          path: "/producInfo/producInfo.vue",
          title: "产品履历查看",
          icon: "icon fa fa-balance-scale"
        }
      ]
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};
</script>




