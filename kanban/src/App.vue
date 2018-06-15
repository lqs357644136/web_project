<template>
  <section class="body-warp kanbanView">
    <router-view class="kanban"></router-view>
  </section>
</template>
<script type="text/javascript">
export default {
  name: "esop-kanban",
  data() {
    return {
      pageFlash: 3600000
    };
  },
  mounted() {
    if (this.$route.query.pageFlash) {
      if (this.$route.query.pageFlash < 60000) {
        this.$route.query.pageFlash = 60000;
      } else {
        this.pageFlash = parseInt(this.$route.query.eachTime);
      }
    }
    setInterval(() => {
      window.location.reload();
    }, this.pageFlash);
  },
  methods: {}
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
@import "~assets/scss/main";
</style>

