<template>
  <div>
  
    <mt-header fixed title="登陆"></mt-header>
  
    <div class="container login">
  
      <div class="loginBox">

        <mt-field label="帐号" placeholder="请输入帐号" v-model="userId"></mt-field>
  
        <mt-field label="密码" placeholder="请输入密码" type="password"  v-model="userPwd" ></mt-field>
        
        <mt-button class="loginBtn"@click.native="doLogin">登陆</mt-button>
  
      </div>
  
    </div>
  
  </div>
</template>

<script src="./login.js">
</script>

