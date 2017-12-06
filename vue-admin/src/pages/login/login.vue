<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loginBox">
      <h3 class="title">系统登录</h3>
      <div class="loginGroup">
        <label for="userId">帐号</label>
        <el-form-item prop="userId">
          <el-input type="text" v-model="ruleForm.userId" placeholder="请输帐号"></el-input>
        </el-form-item>
      </div>
      <div class="loginGroup">
        <label for="userPwd">密码</label>
        <el-form-item prop="userPwd">
          <el-input type="password"  v-model="ruleForm.userPwd" placeholder="请输密码"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button class="loginBtn" :loading="loginBtnLoad" @click="submitForm('ruleForm')" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./login.js"></script>


