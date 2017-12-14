<template>
  <!-- 左侧菜单 -->
  <div class="left-side">
    <div class="logo">
      <i class="fa fa-gear fa-spin"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" :default-active="defaultPath" router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <div v-for="(menu,index) in menus" :key="index">
        
        <el-menu-item v-if="typeof menu.child === 'undefined'" :index="menu.path">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>

        <el-submenu :index="menu.path" v-else>
          <template slot="title">
            <i :class="menu.icon"></i>
            <span v-text="menu.title" class="text" ></span>
          </template>
          <div v-for="(sub_menu,sub_index) in menu.child" :key="sub_index">
              <el-menu-item :index="sub_menu.path" >
              {{sub_menu.title}}
            </el-menu-item>
          </div>
        </el-submenu>

      </div>
    </el-menu>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      defaultPath:this.$router.currentRoute.path,//默认选中菜单
    };
  },
  created(){
  },
  computed: {
    ...mapGetters({
      isCollapse: "get_leftSlide_state",
      menus: "get_menus"
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
