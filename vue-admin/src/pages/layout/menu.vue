<template>
  
  <el-container class="home-layout">

      <!-- 左侧导航 -->
      <leftMenu></leftMenu>

      <!-- 右侧主体 -->
      <el-container class="rightMain">
          <topMenu></topMenu>
          <mainMenu></mainMenu>
      </el-container>

  </el-container>

</template>

<script>
import leftMenu from './layout-leftmenu.vue'
import topMenu from './layout-topmenu.vue'
import mainMenu from './layout-mainmenu.vue'
import './menu.scss'

export default {

    data(){
        return {}
    },
    components:{
        leftMenu,
        topMenu,
        mainMenu
    }

}
</script>
