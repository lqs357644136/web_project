<template>
    <!-- 左侧导航 start -->
    <el-aside class="left-menu" :style="{ width:isCollapse?'initial !important':'200px' }">
        <!-- 可收缩导航 -->
        <el-menu background-color="#545c64" text-color="#fff" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"  >
             
            <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            
        </el-menu>
    </el-aside>
    <!-- 左侧导航 end -->

</template>

<script>
import { mapGetters } from 'vuex'
import { getLeftMenu } from 'js/util.js'

export default {
  data() {
    return {   
    }
  },
  created(){


  },
  methods: {
     handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    ...mapGetters({
        isCollapse:'leftMenu',
        leftMenu:''
    })
  }
};
</script>
