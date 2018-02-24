<template>
  <div>
      <button @click="gotoSecond()">跳转到secondPages</button>
  </div>
</template>

<script>
export default {
  name:'fristPages',
  methods:{
    gotoSecond(){
      this.$router.push('/secondPages');
    }
  }
}
</script>
