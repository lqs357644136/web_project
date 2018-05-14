<template>
    <div class="home">
        <phoneHeader title="主页"></phoneHeader>
        <div class="module-body">
            <div class="slide">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item,index) in bannerImgs" :key="index">
                        <div class="slide-item">
                            <img :src="item.img" alt="banner">
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
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
import phoneHeader from "components/phoneMainContent/header.vue";
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
      ]
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  },
  components: {
    phoneHeader
  }
};
</script>




