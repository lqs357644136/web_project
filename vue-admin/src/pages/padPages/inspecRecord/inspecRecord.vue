<template>
  <div class="inspecRcord">
    <rcordList v-if="showList" v-on:choiceListen="choiceListen"></rcordList>
    <rcordInfo v-else v-on:choiceListen="choiceListen"></rcordInfo>
  </div>
</template>

<script>

import rcordList from './components/rcordList.vue'
import rcordInfo from './components/rcordInfo.vue'
 
export default {
  name: "inspecRecord",
  data() {
    return {
      showList:true,
    };
  },
  created() {
  },
  methods: {
    choiceListen(flag){
      this.showList = flag;
    }
  },
  components: {
    rcordList,
    rcordInfo
  }
};
</script>
