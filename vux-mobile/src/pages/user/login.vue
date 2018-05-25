<template>
  <div class="login-body" >
    <div class="sky">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
    </div>
    <div class="loginWarp" @keyup.enter="submit_form">
      <div class="login-title">
        <p class="name">E-SOP</p>
        <p class="msg">移动管理系统</p>
      </div>
      <div class="login-form">
        <!-- <mt-field class="host" label="服务器" :state="host.realHost.length>0?'success':'error'" placeholder="请输入服务器地址" v-model="host.realHost"></mt-field>
        <mt-field label="帐号" :state="form.username.length>0?'success':'error'" placeholder="请输入帐号" v-model="form.username"></mt-field>
        <mt-field label="密码" :state="form.password.length>0?'success':'error'" placeholder="请输入密码" type="password" v-model="form.password"></mt-field> -->
        <group class="inputs">
           <x-input type="text" :required="true" should-toast-error placeholder="请输入服务器地址" v-model="host.realHost">
            <slot slot="label">
              <i class="fa fa-truck"></i> 地址 </slot>
          </x-input>
          <x-input  type="text" :required="true" should-toast-error placeholder="请输入帐号" v-model="form.username">
            <slot slot="label">
              <i class="fa fa-user-o"></i> 登录 </slot>
          </x-input>
          <x-input  type="password" :required="true" should-toast-error placeholder="请输入密码" v-model="form.password">
            <slot slot="label">
              <i class="fa fa-key"></i> 密码 </slot>
          </x-input>
        </group>
        <x-button type="primary" @click.native="submit_form">登录</x-button>

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
//------引入样式组件 start------
import { Group, XInput, Cell, XButton } from "vux";
//------引入样式组件 end------
import url from "api";
import "./background/css/style.css";
export default {
  data() {
    return {
      host: {
        realHost: Window.VueLocation.hostname + ":" + Window.VueLocation.port
      },
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //提交
    submit_form() {
      
      let flag = this.host.realHost.length > 0;
      let formFlag = this.form.username && this.form.password.length;
      if (formFlag) {
        console.log(this.$store);
        this.$store.dispatch("set_host", this.host.realHost).then(() => {
          let data = {
            userName: this.form.username,
            password: this.form.password
          };
          //
          this.$router.push("/home");
          //
          //登录提交
          this.$post({
            url: url.user_login,
            data: data
          }).then(res => {
            setTimeout(() => {
              this.$store.commit("SET_TOKEN", res.data.token);
              // setTimeout(() => {
              //   window.location.href = "http://192.168.1.15:3000";
              // }, 3000);
              this.$router.push("/home");
            }, 500);
            if (res.code == 1) {
            } else {
              setTimeout(() => {
               
              }, 500);
            }
          });
        });
      } else {
        setTimeout(() => {
         
        }, 500);
        return;
      }
    }
  },
  components: {
    Group,
    XInput,
    Cell,
    XButton
  }
};
</script>
