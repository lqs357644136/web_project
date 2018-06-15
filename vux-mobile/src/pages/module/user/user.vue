<template>

    <div class="user">
        <phoneHeader  title="个人中心"></phoneHeader>
        <div class="module-body">
            <div class="userInfo">
                <div class="users">
                    <div class="userId">
                        <span>用户帐号:</span>
                        <span>{{userInfo.userName}}</span>
                    </div>
                    <div class="userId">
                        <span>真实姓名:</span>
                        <span>{{userInfo.realName}}</span>
                    </div>
                </div>
                <div class="userLogo">
                    <img src="./userLogo.png" alt="">
                </div>
            </div>
            <div class="userBtn">
                <mt-button class="loginOutBtn" @click="user_out()" type="danger">退出登录</mt-button>
            </div>
        </div>

    </div>

</template>

<script>
import phoneHeader from "components/phoneMainContent/header.vue";
export default {
  data() {
    return {
      userInfo: {
        userName: "",
        realName: ""
      }
    };
  },
  mounted() {
    this.userInfo = this.$store.getters.get_userInfo;
  },
  methods: {
    //退出
    user_out() {
      this.$messagebox
        .confirm("确定退出?")
        .then(action => {
          this.$store.dispatch("login_out");
          setTimeout(() => {
            this.$router.push("/user/login");
          }, 500);
        })
        .catch(() => {});
    }
  },
  components: {
    phoneHeader
  }
};
</script>

