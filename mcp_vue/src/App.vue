<template>
  <div id="app">
    <router-view class="appView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
// 引入公共样式
@import url('./modules/style/sass/common.scss');
//引入mint-ui重置样式
@import url('./modules/style/sass/reset-mintUI.scss');
</style>
