<template>
  <section class="body-warp terView">
      <router-view class="ter"></router-view>
  </section>
</template>
<script type="text/javascript">
import 'assets/scss/main.scss'
export default {
  name: "esop-ter"
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
