<template>

    <div class="phoneView">
        <div class="mainLoading" v-if="mainLoading">
            <div class="msg">
                <i class="icon fa fa-circle-o-notch fa-spin"></i>
                <span class="title">系统资源加载中</span>
            </div>
        </div>
        <phoneMainConten class="phone"></phoneMainConten>
    </div>

</template>

<script>
import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import phoneMainConten from "components/phoneMainContent/index.vue";
import url from "api";

Vue.use(MintUI);

export default {
  name:'phoneView',
  data() {
    return {
      mainLoading: true
    };
  },
  mounted(){
      this.get_sys();
  },
  components: {
    phoneMainConten
  },
  methods: {
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
        }
        this.mainLoading = false;
      });
    }
  }
};
</script>

