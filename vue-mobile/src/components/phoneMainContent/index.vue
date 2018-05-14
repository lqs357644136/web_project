<template>
  
<div class="phoneMainContent">
    <!-- <phoneHeader></phoneHeader> -->
    <router-view class="phoneMain"></router-view>
    <tabbar></tabbar>
</div>

</template>
<script>
import phoneHeader from './header.vue'
import tabbar from './tabbar.vue'
export default {
  name:'phoneLayout',
  components:{
      phoneHeader,
      tabbar
  }
}
</script>

