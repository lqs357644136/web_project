<template>
  <section class="body-warp kanbanView">
      <router-view class="kanban"></router-view>
  </section>
</template>
<script type="text/javascript">
export default {
  name: "esop-kanban",
  mounted() {
    // setInterval(()=>{
    //   window.location.reload()
    // },3600000)
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
@import "~assets/scss/main";
</style>
