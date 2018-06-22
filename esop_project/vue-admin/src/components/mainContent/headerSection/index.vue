<template>
  <div class="header-section">
    <div class="menu-left">
        <div class="logo" v-show="!isCollapse">
          ESOP-ADMIN
        </div>
      <i @click="leftSlideChange()" class="fa fa-bars fa-2x"></i>
    </div>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
import menuRight from "./menuRight";
import search from "components/search";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isCollapse: "get_leftSlide_state"
    })
  },
  components: {
    menuRight,
    search
  },
  methods: {
    leftSlideChange() {
      this.$store.dispatch("set_leftslide");
    }
  }
};
</script>
