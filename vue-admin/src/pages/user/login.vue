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
        <p class="name">E-SOP管理系统</p>
        <p class="msg">mobile admin</p>
      </div>
      <div class="login-form">
        <el-form ref="host" :model="host" :rules="rules" label-width="0">
          <el-form-item prop="host" class="login-item host">
            <el-input v-model="host.ip" placeholder="服务器ip" class="form-input ip" :autofocus="true"></el-input>
            <el-input v-model="host.port" placeholder="服务器端口" class="form-input port" :autofocus="true"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" class="form-submit" @click="submit_form">登录</el-button>
          </el-form-item>
          <el-form-item label="语言" class="lang">
            <el-select v-model="lang" placeholder="请选择">
              <el-option v-for="item in selects.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from "api";
import { mapGetters } from "vuex";

export default {
  data() {
    var checkStep = (rule, value, callback) => {
      let flag = this.host.ip.length > 0 && this.host.port.length > 0;
      if (!flag) {
        return callback(new Error("请输入服务器地址"));
      } else {
        callback();
      }
    };
    return {
      host: {
        ip: "",
        port: ""
      },
      lang: this.$store.getters.get_lang,
      form: {
        username: null,
        password: null
      },
      selects: {
        langOptions: [
          { label: "简体中文", value: "zh-cn" },
          { label: "繁体中文", value: "zh-tw" },
          { label: "英文", value: "en" }
        ]
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账户密码！", trigger: "blur" }
        ],
        host: [{ validator: checkStep, trigger: "blur" }]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  computed: {
    subHost: function() {
      return this.host.ip + ":" + this.host.port;
    },
  },
  created() {},
  mounted() {
    this.login_init();
  },
  methods: {
    // 初始化登录信息
    login_init() {
      let host = this.$store.getters.get_host;
      if (host) {
        this.host.ip = host.split(":")[0];
        this.host.port = host.split(":")[1];
      }
      let lang = this.$store.getters.getLang;
    },
    //提交
    submit_form() {
      this.$refs.form.validate(valid => {
        let flag = this.host.ip.length > 0 && this.host.port.length > 0;
        if (!valid || !flag) return false;
        this.load_data = true;
        this.$store.dispatch("set_host", this.subHost).then(() => {
          let data = {
            userName: this.form.username,
            password: this.form.password
          };
          //登录提交
          this.$post({
            url: url.user_login,
            data: data
          }).then(res => {
            if (res.code != 1) {
              this.$message.error(res.msg);
              this.load_data = false;
            } else {
              this.$store.commit("SET_TOKEN", res.data.token);
              if (document.body.offsetWidth < 480) {
                this.$router.push("/phone/home");
              } else {
                this.$store.dispatch("set_lang", this.lang);
                this.$router.push("/specification");
              }
            }
          });
        });
      });
    },
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
  background-color: #417f92;
  .loginWarp {
    width: 300px;
    padding: 25px 15px;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 5px;
    .login-title {
      .name {
        font-size: 26px;
        text-align: center;
        color: #22ab6d;
        margin-bottom: 5px;
      }
      .msg {
        font-size: 18px;
        color: #7b7b7b;
        text-align: center;
      }
      a {
        font-size: 18px;
        color: #2799de;
        text-align: center;
      }
      margin-bottom: 20px;
    }

    .msggf {
      font-size: 14px;
      color: #7b7b7b;
      text-align: center;
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
    .host .el-form-item__content {
      display: flex;
      flex-direction: row;
      .ip {
        flex: 1;
      }
      .port {
        margin-left: 5px;
        width: 100px;
      }
    }
    .lang {
      margin-bottom: 0;
      .el-form-item__label {
        width: 3rem !important;
      }
    }
  }
}
</style>
