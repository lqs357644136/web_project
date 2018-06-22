<template>

    <div class="user">

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
            <mt-button size="normal" @click="user_out()" type="danger">退出登录</mt-button>
        </div>
    </div>

</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      userInfo:{
          userName:'',
          realName:'',
      }
    };
  },
  mounted() {
      this.userInfo = this.$store.getters.get_userInfo ;
  },
  methods: {
    //退出
    user_out() {
      MessageBox.confirm("确定退出?")
        .then(action => {
          this.$store.dispatch("login_out");
          setTimeout(() => {
            this.$router.push("/user/login");
          }, 500);
        })
        .catch(() => {});
    }
  }
};
</script>

