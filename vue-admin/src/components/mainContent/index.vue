<template>
  <div class="main-content ofh">
    <h-section></h-section>
    <div class="pageContent">
      <slot></slot>
      <div class="esop-pageloading" v-show="pageContentLoading">
        <div class="msg">
          <i class="icon fa fa-circle-o-notch fa-spin"></i>
          <span class="title">页面加载中</span>
        </div>  
      </div>  
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import hSection from "./headerSection";
import vFooter from "./footer";

export default {
  data(){
    return {
      
    }
  },
  computed: {
    'pageContentLoading':function(){
      return this.$store.getters.get_pageloading;
    }
  },
  created(){
  },
  name: "main-content",
  components: {
    hSection,
    vFooter
  }
};
</script>
