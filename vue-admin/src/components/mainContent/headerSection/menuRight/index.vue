<template>
  <div class="menu-right" v-show="get_token&&get_token.length>0">
    <div class="notification-menu">
      <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">
          <img src="./userLogo.png" alt="userLogo" />
          <span v-if="get_userInfo" v-text="get_userInfo.userName"></span>
          <span class="icon"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click()">
              <i class="icon fa fa-sign-out"></i>
              <span>{{langPackage.layout.loginOut}}</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { exitFullscreen } from "common/uitl.js";
import { setToken } from "common/cookie";

export default {
  computed: {
    ...mapGetters({
      get_userInfo: "get_userInfo",
      get_token: "get_token",
      langPackage:'get_langpackage'
    })
  },
  methods: {
    //退出
    user_out() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch('login_out');
          setTimeout(() => {
            this.$router.push('/user/login');
          }, 500);
        })
        .catch(() => {});
    },
    user_click() {
      this.user_out();
    }
  }
};
</script>
