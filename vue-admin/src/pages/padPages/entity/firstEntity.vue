<template>
  <div class="checkEntity">
      <firstEntityList v-if="showList" v-on:searchListen="searchListen"></firstEntityList>
      <checkMain v-else></checkMain>
  </div>
</template>
<script>
import firstEntityList from './components/list/firstEntityList.vue'
import checkMain from './components/checkMain.vue'
export default {
  name:'firstEntity',
  data(){
      return {
          showList:true,
      }
  },
  methods:{
      searchListen(type){
          this.showList = type;
      }
  },
  components: {
      firstEntityList,
      checkMain
  }
}
</script>
