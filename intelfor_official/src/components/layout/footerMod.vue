<template>
    <div v-if="footerModShow" class="footerMod animated fadeIn">
        <p>
            <span>Copyright © 2014 Intelfor All rights reserved.</span>
            <span>广州智企信息技术有限公司</span>
        </p>
    </div>
</template>

<script>
export default {
  data(){
      return {
          footerModShow:false,
      }
  },
  created(){
      setTimeout(() => {
          this.footerModShow = true;
      }, 500);
  }
}
</script>
