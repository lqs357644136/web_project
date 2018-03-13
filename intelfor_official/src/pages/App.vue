<template>
    <div class="official">
        <navbar></navbar>
        <router-view class="body-warp"></router-view>
    </div>
</template>
<script type="text/javascript">
import navbar from "components/layout/navbar.vue";
export default {
  name: "official",
  components: {
    navbar,
  }
};
</script>
