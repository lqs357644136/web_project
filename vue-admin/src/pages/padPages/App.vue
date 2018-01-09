<template>
  <div class="padView">
    <div class="mainLoading" v-if="mainLoading">
      <div class="msg">
        <i class="icon fa fa-circle-o-notch fa-spin"></i>
        <span class="title">系统资源加载中</span>
      </div>
    </div>
    <div class="mainPage" v-else>
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
      mainLoading: true,
    };
  },
  created() {
    this.get_sys();
  },
  components: {
    mainContent,
    leftSlide,
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
            { name: "firstEntity" },
            //{name: 'attention'},
            { name: "tourEntity" },
            { name: "checkList" },
            {
              name: "product",
              child: [{ name: "productInfo" }, { name: "productEnter" }]
            },
            {
              name: "batchEnter",
              child: [{ name: "batchEnterBlend" }, { name: "batchEnterRaw" }]
            },
            {
              name:"workonoff"
            }
          ];

          this.$store.dispatch("set_menus", menus);
          this.mainLoading = false;
        }
      });
    }
  }
};
</script>
