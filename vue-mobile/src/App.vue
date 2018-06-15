<template>
  <section class="body-warp">
    <router-view></router-view>
  </section>
</template>
<script type="text/javascript">
export default {
  name: "app"
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
@import "~assets/scss/main";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
