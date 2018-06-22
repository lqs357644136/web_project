<template>
    <div class="checkEntity">
        <tourEntityList v-if="showList" v-on:searchListen="searchListen"></tourEntityList>
        <checkMain v-else></checkMain>
    </div>
</template>
<script>
import tourEntityList from "./components/list/tourEntityList.vue";
import checkMain from "./components/checkMain.vue";
export default {
  name: "tourEntity",
  data() {
    return {
      showList: true
    };
  },
  methods: {
    searchListen(type) {
      this.showList = type;
    }
  },
  components: {
    tourEntityList,
    checkMain
  }
};
</script>
