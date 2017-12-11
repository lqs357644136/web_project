<template>
  <!-- 左侧菜单 -->
  <div class="left-side">
    <div></div>
    <el-menu class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="isCollapse"
    v-for="(menu,index) in menuList" :key="index">

        <el-menu-item
            v-if="typeof menu.child === 'undefined'"
            :index="menu.path">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
        </el-menu-item>

        <el-submenu index="menu.path" v-else>
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </template>
          <el-menu-item :index="sub_menu.path" v-for="(sub_menu,sub_index) in menu.child" :key="sub_index">
            {{sub_menu.title}}
          </el-menu-item>
        </el-submenu>

    </el-menu>

    <!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">导航一</span>
        </template>
      </el-submenu>
    </el-menu> -->
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  data() {
    return {
       menuList: [
        {
          title:this.$t('message.homePage'),
          icon: "el-icon-menu",
          path: "/home"
        },
        {
          title:this.$t('message.table'),
          path: "/table",
          icon: "el-icon-menu",
          child: [
            {
              title:this.$t('message.tableBase'),
              path: "/table/base"
            },
            {
              title:this.$t('message.tableSort'),
              path: "/table/sort"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isCollapse: "get_leftSlide_state"
    }),
   
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
  }
};
</script>
