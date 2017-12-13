<template>
  <div class="view-page">
    <left-slide></left-slide>
    <main-content>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import {mainContent, leftSlide} from 'components'

  export default{
    name: 'page',
    components: {
      mainContent,
      leftSlide
    }
  }
</script>
