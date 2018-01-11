<template>
  <div class="login-body">
    <div class="loginWarp" @keyup.enter="submit_form">
      <div class="esop-pageloading" v-if="load_data">
        <div class="msg">
          <div class="icon fa fa-spinner fa-spin"></div>
          <div class="title">登录中</div>
        </div>
      </div>
      <div class="login-title">
        <p class="name">INTELFOR</p>
        <p class="msg">management system</p>
        <p class="msg">
          <a href="http://192.168.1.10:8080/esop-mobile-apk/esop-mobile.apk">下载本地APP</a>
        </p>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from "api";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      rules: {
        username: [{ required: true, message: "请输入账户名！", trigger: "blur" }],
        password: [{ required: true, message: "请输入账户密码！", trigger: "blur" }]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  methods: {
    //提交
    submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.load_data = true;
        //登录提交
        this.$post({
          url: url.user_login,
          data: this.from
        }).then(res => {
          if (res.code != 1) {
            this.$notify.info({
              title: "温馨提示",
              message: "测试账号:admin , 密码:123456"
            });
            this.load_data = false;
          } else {
            this.$store.commit("SET_TOKEN", res.data.token);
            if (document.body.offsetWidth < 480) {
              this.$router.push("/phone/home");
            }else{
              this.$router.push("/pad");
            }
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.login-body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(./images/login_bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .loginWarp {
    width: 300px;
    padding: 25px 15px;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 5px;
    .login-title {
      .name {
        font-size: 38px;
        text-align: center;
        color: #22ab6d;
      }
      .msg {
        font-size: 18px;
        color: #d3d3d3;
        text-align: center;
      }
      margin-bottom: 20px;
      font-family: "Microsoft YaHei";
      line-height: 38px;
      font-weight: bold;
      font-size: 70px;
      text-shadow: 0px 0px 0 rgb(-102, 35, -27), 1px 1px 0 rgb(-198, -61, -123),
        2px 2px 1px rgba(0, 0, 0, 0.6), 2px 2px 1px rgba(0, 0, 0, 0.5),
        0px 0px 1px rgba(0, 0, 0, 0.2);
    }
    .login-item {
      .el-input__inner {
        margin: 0 !important;
      }
    }
    .form-input {
      input {
        margin-bottom: 15px;
        font-size: 12px;
        height: 40px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        border-radius: 5px;
        color: #555;
      }
    }
    .form-submit {
      width: 100%;
      color: #fff;
      border-color: #6bc5a4;
      background: #6bc5a4;
      &:active,
      &:hover {
        border-color: #6bc5a4;
        background: #6bc5a4;
      }
    }
  }
}
</style>
