<template>
  <div class="login-container">
    <form class="loginBox">
      <h3 class="title">系统登录</h3>
      <div class="loginGroup">
        <label for="userId">帐号</label>
        <input type="text" v-model="userId" placeholder="请输入帐号">
      </div>
      <div class="loginGroup">
        <label for="userPwd">密码</label>
        <input type="password" v-model="userPwd" placeholder="请输入密码">
      </div>
      <el-button class="loginBtn" @click="userLogin()" type="primary">登录</el-button>
    </form>
  </div>
</template>
<script src="./login.js"></script>


