<template>
  <div class="main-content ofh">
    <h-section></h-section>
    <div class="pageContent">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
import hSection from "./headerSection";
import vFooter from "./footer";

export default {
  name: "content",
  components: {
    hSection,
    vFooter
  }
};
</script>
