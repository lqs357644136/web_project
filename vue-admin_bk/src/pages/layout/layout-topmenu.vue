<template>

  <!-- 顶部菜单 -->
  <el-header class="top-menu">
    <i class="el-icon-menu menu-crl" @click="leftMenuCrl()"></i>
    <!-- 用户设置 -->
    <div class="userSetting">
      <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>邮件</el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>王小虎</span>
    </div>
  </el-header>

</template>

<script>
export default {
  methods: {
    leftMenuCrl() {
      let leftMenu = this.$store.getters.leftMenu;

      if (leftMenu) {
        this.$store.dispatch("changeLeftMenu", false);
      } else {
        this.$store.dispatch("changeLeftMenu", true);
      }
    }
  }
};
</script>
