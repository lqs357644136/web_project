<template>

    <!-- 顶部菜单 -->
    <el-header class="top-menu">
        <i class="el-icon-menu menu-crl" @click="leftMenuCrl()"></i>
    </el-header>

</template>

<script>
export default {
  methods: {
    leftMenuCrl() {
      let leftMenu = this.$store.getters.leftMenu;
      
      if (leftMenu) {
        this.$store.dispatch('changeLeftMenu',  false);
      } else {
        this.$store.dispatch('changeLeftMenu',  true);
      }
    }
  }
};
</script>
