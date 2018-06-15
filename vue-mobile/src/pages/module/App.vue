<template>

  <div class="phoneView">
    <phoneMainConten class="phone"></phoneMainConten>
  </div>

</template>

<script>
import phoneMainConten from "components/phoneMainContent/index.vue";
import url from "api";

export default {
  name: "phoneView",
  data() {
    return {};
  },
  mounted() {
    this.get_sys();
  },
  components: {
    phoneMainConten
  },
  methods: {
    get_sys() {
      this.$indicator.open({
        text: "获取用户信息",
        spinnerType: "fading-circle"
      });
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

          this.$indicator.close();
        }
      });
    }
  }
};
</script>

