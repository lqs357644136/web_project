<template>
    <mt-header fixed class="phoneHeader" :title="this.$route.meta.title">
        <div slot="left" @click="goBack()" v-if="!isPhoneHome">
            <mt-button icon="back">返回</mt-button>
        </div>
    </mt-header>
</template>

<script>
//import phoneLayoutHeader_right from './phoneLayoutHeader_right.vue'
export default {
  data() {
    return {
    };
  },
  name: "phoneLayoutHeader",
  created() {
    
  },
  computed:{
      'isPhoneHome':function(){
          let flag = 
          this.$route.name=='phoneHome'
          || this.$route.name=='phoneUser'
          || this.$route.name=='phoneNews'
          ?true:false;
          return flag;
      }
  },
  methods: {
    goBack() {
     this.$router.back(-1);
    }
  }
};
</script>
