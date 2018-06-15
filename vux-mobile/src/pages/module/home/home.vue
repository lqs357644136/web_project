<template>
    <div class="home">
        <h1>头部</h1>
        <div class="module-body">
            <div class="slide">
            
            </div>
            <div class="menus">
                <div class="menuBox" @click="goPage(item.path)" v-for="(item,index) in menus" :key="index">
                    <i :class="item.icon"></i>
                    <span class="text">{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import phoneHeader from "components/phoneMainContent/header.vue";
export default {
  data() {
    return {
      bannerImgs: [
        { img: require("assets/images/home/banner/1.png") },
        { img: require("assets/images/home/banner/2.png") },
        { img: require("assets/images/home/banner/3.png") },
        { img: require("assets/images/home/banner/4.png") }
      ],
      menus: [
        {
          path: "/scanner",
          title: "标签扫码",
          icon: "icon fa fa-barcode"
        },
        {
          path: "/andon/andonChart",
          title: "安灯报表",
          icon: "icon fa fa-pie-chart"
        },
      ]
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  },
  components: {
    //phoneHeader
  }
};
</script>




