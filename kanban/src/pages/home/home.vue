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
let api = '192.168.1.10:8080';
let kanbanApi = '192.168.1.10:80';
export default {
  data() {
    return {
      menus: [
        {
          path: "/haier/haierLine?ip="+api,
          title: "海尔线看板",
          icon: "icon fa fa-object-ungroup"
        },
        {
          path: "/als/alsWare?ip="+api+'&eachTime=5000&bottomInfo=true&wareHouse=01&shelves=A08_A09_A10_A11_A12_A13_A14',
          title: "上海智汇货位看板",
          icon: "icon fa fa-address-book-o"
        },//A08_A09_A10_A11_A12_A13_A14
        {
          path: "/als/alsBuild?ip="+api+'&eachTime=8000&plant=ZJ&line=A1',
          title: "上海智汇生产看板",
          icon: "icon fa fa-bicycle"
        },
        {
          path: "/ksd/ksd_line_sz?ip="+api+"&plant=1000&line=BC1",
          title: "科斯达深圳线看板",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: "/ksd/ksd_build_hz?ip="+api+"&plant=1000&line=BC1",
          title: "科斯达惠州总看板",
          icon: "icon fa fa-snowflake-o"
        },
        {
          path: "/ksd/ksd_line_hz?ip="+api+"&plant=1000&line=BC1",
          title: "科斯达惠州车间看板",
          icon: "icon fa fa-area-chart"
        },
        // {
        //   path: "/ter/selfEntity?ip="+api,
        //   title: "自主检验",
        //   icon: "icon fa fa-id-card-o"
        // },
        // {
        //   path: "/ter/inspecRecord?ip="+api,
        //   title: "检验纪录",
        //   icon: "icon fa fa-cutlery"
        // },
        // {
        //   path: '/ter/productInfo?ip='+api,
        //   title: "产品履历查看",
        //   icon: "icon fa fa-balance-scale"
        // },
        // {
        //   path: '/ter/saleLamReport?ip='+api,
        //   title: "安灯报表",
        //   icon: "icon fa fa-fighter-jet"
        // },
        // {
        //   path: '/ter/machineReachRate?ip='+api,
        //   title: "机台电子看板",
        //   icon: "icon fa fa-flask"
        // },
        // {
        //   path: '/ter/prodSchedule?ip='+api,
        //   title: "总排程电子看板",
        //   icon: "icon fa fa-headphones"
        // },
        // {
        //   path: '/ter/wholeReachRate?ip='+api,
        //   title: "整体达成率电子看板",
        //   icon: "icon fa fa-pie-chart"
        // },
        // {
        //   path: '/ter/precautions?ip='+api,
        //   title: "注意事项",
        //   icon: "icon fa fa-minus-circle"
        // },
        // {
        //   path: '/ter/zjj_demo01?ip='+kanbanApi+'&Plant=1000&Line=BC1',
        //   title: "中技佳电子看板(一)",
        //   icon: "icon fa fa-key"
        // },
        // {
        //   path: '/ter/zjj_demo02?ip='+kanbanApi+'&Plant=1000&Line=BC1',
        //   title: "中技佳电子看板(二)",
        //   icon: "icon fa fa-rss"
        // },
        // {
        //   path: '/ter/xr?ip='+api+'&id=4028818a614115b80161412f6434000e',
        //   title: "X Bar 图",
        //   icon: "icon fa fa-smile-o"
        // },
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
    },
  }
};
</script>




