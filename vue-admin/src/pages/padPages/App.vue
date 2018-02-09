<template>
  <div class="padView">
    <div class="mainLoading" v-if="mainLoading">
      <div class="msg">
        <i class="icon fa fa-circle-o-notch fa-spin"></i>
        <span class="title">系统资源加载中</span>
      </div>
    </div>
    <div class="mainPage">
      <div class="pad">
        <left-slide></left-slide>
        <main-content>
          <router-view></router-view>
        </main-content>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from "api";
import { mainContent, leftSlide } from "components";

export default {
  name: "padView",
  data() {
    return {
      mainLoading: true
    };
  },
  created() {
    this.get_sys();
  },
  components: {
    mainContent,
    leftSlide
  },
  methods: {
    //获取系统所需资源,判断是平板还是手机
    get_sys() {
      this.$get({
        url: url.user_info
      }).then(res => {
        if (res.code == 1) {
          let userInfo = {
            userName: res.data.userName,
            realName: res.data.realName,
            menuList: res.data.menuList
          };
          this.$store.commit("SET_USERINFO", userInfo);
          //获取菜单
          //let menus =this.$store.getters.get_menus

          //菜单暂时写死
          let menus = [
            //检验规范
            { name: "specification" },
            //首件录入
            { name: "firstEntity" },
            //巡迴录入
            { name: "tourEntity" },
            //检查清单
            { name: "checkList" },
            //产品履历
            {
              name: "product",
              child: [{ name: "productInfo" }, { name: "productEnter" }]
            },
            //上岗纪录
            { name: "workonoff" },
            //电子看板
            {
              name: "signage",
              child: [
                { name: "machineReachRate" },{ name: "prodSchedule" },{ name: "wholeReachRate" }
              ]
            },
            //消息推送
            {
              name: "messagePush",
              child: [
                { name: "notice" },{ name: "bulletin" },{ name: "precautions" }
              ]
            },
          ];

          this.$store.dispatch("set_menus", menus);
          this.mainLoading = false;
        } else {
          
        }
      });
    }
  }
};
</script>
