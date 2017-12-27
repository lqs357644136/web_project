<template>
  <!-- 左侧菜单 -->
  <div class="left-side" v-show="isCollapse">
    <div class="logo">
      ESOP-ADMIN
    </div>

    <div class="esop-leftMenu" ref="esopLeftSlide">
      <div v-for="(menu,index) in menus" :key="index">

        <div class="singleItem menuItem" :ref="menu.name" v-if="typeof menu.child === 'undefined'" @click="gopagefn(menu.path,menu.name)">
          <i :class="menu.icon"></i>
          <span class="title">{{menu.title}}</span>
        </div>

        <div class="subItem" v-else>

          <div class="subTitle" :ref="menu.name" @click="subItemHandle(menu.name)">
            <i :class="menu.icon"></i>
            <span class="title">{{menu.title}}</span>
            <span class="arrow fa fa-angle-down"></span>
          </div>
          <ul class="subChild">
            <li class="menuItem" :ref="sub_menu.name" @click="gopagefn(sub_menu.path,sub_menu.name)" v-for="(sub_menu,sub_index) in menu.child" :key="sub_index">{{sub_menu.title}}</li>
          </ul>

        </div>

      </div>
    </div>

  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      defaultPath: this.$router.currentRoute.path //默认选中菜单
    };
  },
  mounted() {
    this.flashStyleInit();
  },
  computed: {
    ...mapGetters({
      isCollapse: "get_leftSlide_state",
      menus: "get_menus",
      pageLoading: "get_pageloading",
      fromCheckList: "get_fromchecklist"
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    subItemHandle(subName) {
      if (!this.$refs[subName][0].classList.contains("showSubChild")) {
        this.$refs[subName][0].classList.add("showSubChild");
      } else {
        this.$refs[subName][0].classList.remove("showSubChild");
      }
    },
    gopagefn(path, name) {
      if (this.$router.currentRoute.name != name) {
        this.menuItemActive(name);
        this.$store.commit("SET_PAGELOADING", path);
      }
    },
    //选中样式处理
    menuItemActive(name) {
      let menuItems = this.$refs["esopLeftSlide"].querySelectorAll(".menuItem");
      for (let item of menuItems) {
        item.classList.remove("active");
      }
      let targerDom = this.$refs[name][0];
      targerDom.classList.add("active");
    },
    //页面刷新后样式处理
    flashStyleInit() {
      let name = this.$router.currentRoute.name;
      this.menuItemActive(name);
    }
  },
  watch: {
    fromCheckList: function(a, b) {
      this.menuItemActive(this.$router.currentRoute.name);
    }
  }
};
</script>
