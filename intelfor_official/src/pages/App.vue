<template>
  <div class="official">
    <navbar></navbar>
    <transition name="el-fade-in-linear">
      <router-view class="body-warp"></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">
import navbar from "components/layout/navbar.vue";
export default {
  name: "official",
  components: {
    navbar
  }
};
</script>
