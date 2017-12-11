<template>
  <div class="header-section">
    <div class="menu-left">
      <i @click="leftSlideChange()" class="fa fa-bars fa-2x"></i>
    </div>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import search from 'components/search'

  export default{
    components: {
      menuRight,
      search
    },
    methods: {
      leftSlideChange(){
        this.$store.dispatch('set_leftslide')
      }
    }
  }
</script>
