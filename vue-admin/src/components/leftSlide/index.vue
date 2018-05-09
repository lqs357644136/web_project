<template>
  <!-- 左侧菜单 -->
  <div class="left-side" v-show="isCollapse">
    <div class="logo">
      ESOP-ADMIN
    </div>

    <div class="esop-leftMenu" ref="esopLeftSlide">
      <div v-for="(menu,index) in menus" :key="index">

        <div v-if="menu.name=='inspecRecord'" :class="menuWarning&&$route.name!='inspecRecord' ?'singleItem menuItem colorWarning':$route.name!='inspecRecord'?'singleItem menuItem ':'singleItem menuItem active'" :ref="menu.name"  @click="gopagefn(menu.path,menu.name)">
          <i :class="menu.icon"></i>
          <span class="title">{{menu.title}}</span>
        </div>

        <div v-else-if="menu.name!='inspecRecord'&&typeof menu.child === 'undefined'" class="singleItem menuItem" :ref="menu.name" @click="gopagefn(menu.path,menu.name)">
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menus: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.flashStyleInit();
    });
    this.menus_init();
  },
  computed: {
    ...mapGetters({
      isCollapse: "get_leftSlide_state",
      pageLoading: "get_pageloading",
      langPackage: "get_langpackage",
      menuWarning: "get_menu_warning"
    })
  },
  watch: {
    $route: function() {
      let name = this.$router.currentRoute.name;
      let menuItems = this.$refs["esopLeftSlide"].querySelectorAll(".menuItem");
      for (let item of menuItems) {
        item.classList.remove("active");
      }
      let flag = true;
      while (flag) {
        if (this.$refs[name][0]) {
          flag = false;
          let targerDom = this.$refs[name][0];
          targerDom.classList.add("active");
        }
      }
    }
  },
  methods: {
    menus_init() {
      this.menus = [
        {
          name: "specification",
          path: "/specification",
          title: "检验规范",
          icon: "fa fa-codiepie"
        },
        {
          name: "inspecRecord",
          path: "/inspecRecord",
          title: "检验记录",
          icon: "fa fa-commenting"
        },
        {
          name: "firstEntity",
          path: "/firstEntity",
          title: "首检录入",
          icon: "fa fa-area-chart"
        },
        {
          name: "tourEntity",
          path: "/tourEntity",
          title: "巡回录入",
          icon: "fa fa-bookmark"
        },
        {
          name: "product",
          path: "/product",
          title: "产品履历",
          icon: "fa fa-asl-interpreting",
          child: [
            {
              name: "productInfo",
              path: "/product/productInfo",
              title: "履历详情"
            },
            {
              name: "productEnter",
              path: "/product/productEnter",
              title: "履历录入"
            }
          ]
        },
        {
          name: "workonoff",
          path: "/workonoff",
          title: "上岗纪录",
          icon: "fa fa-codiepie"
        },
        {
          name: "signage",
          path: "/signage",
          title: "电子看板",
          icon: "fa fa-calendar-minus-o",
          child: [
            {
              title: "机台看板",
              path: "/signage/machineReachRate",
              name: "machineReachRate"
            },
            {
              title: "总排程看板",
              path: "/signage/prodSchedule",
              name: "prodSchedule"
            },
            {
              title: "整体达成率看板",
              path: "/signage/wholeReachRate",
              name: "wholeReachRate"
            }
          ]
        },
        {
          name: "messagePush",
          path: "/messagePush",
          title: "消息推送",
          icon: "fa fa-comment-o",
          child: [
            {
              title: "消息广播",
              path: "/messagePush/notice",
              name: "notice"
            },
            {
              title: "电子公告",
              path: "/messagePush/bulletin",
              name: "bulletin"
            },
            {
              title: "注意事项",
              path: "/messagePush/precautions",
              name: "precautions"
            }
          ]
        }
      ];
    },
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
        this.$store.dispatch("set_pageloading", path);
      }
    },
    //选中样式处理
    menuItemActive(name) {
      let menuItems = this.$refs["esopLeftSlide"].querySelectorAll(".menuItem");
      for (let item of menuItems) {
        item.classList.remove("active");
      }
      let flag = true;
      while (flag) {
        if (this.$refs[name][0]) {
          flag = false;
          let targerDom = this.$refs[name][0];
          targerDom.classList.add("active");
        }
      }
    },
    //页面刷新后样式处理
    flashStyleInit() {
      try {
        let name = this.$router.currentRoute.name;
        let targerDom = this.$refs[name][0];
        targerDom.classList.add("active");
      } catch (error) {
        console.log("左侧菜单默认选中失败");
      }
    }
  }
};
</script>
