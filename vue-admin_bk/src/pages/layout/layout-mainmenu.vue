<template>

  <!-- 页面主体 -->
  <el-main class="menu-main">



    <!-- 模块主体 -->
    <transition name="fade" mode="out-in">
      <keep-alive >
        <router-view></router-view>
      </keep-alive>
    </transition>

  </el-main>

</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>
