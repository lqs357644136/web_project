<template>
    <searchGroup v-model="showState"  class="searchInfo" title="条件查询">
        <dateRagePicker v-model="time"></dateRagePicker>
        <selectPicker></selectPicker>
    </searchGroup>
</template>

<script>
import searchGroup from "components/searchGroup/searchGroup.vue";
import dateRagePicker from "components/dateRagePicker/dateRagePicker.vue";
import selectPicker from "components/selectPicker/selectPicker.vue";
export default {
  name: "searchInfo",
  data() {
    return {
      time: [new Date(), new Date()],
      showState: false
    };
  },
  components: {
    searchGroup,
    dateRagePicker,
    selectPicker
  }
};
</script>

