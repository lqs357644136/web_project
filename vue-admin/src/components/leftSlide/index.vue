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
      langPackage: "get_langpackage"
    })
  },
  methods: {
    menus_init() {
      this.menus = [
        {
          name: "specification",
          path: "/specification",
          title: this.langPackage.menu_pad.specification,
          icon: "fa fa-codiepie"
        },
        {
          name: "inspecRecord",
          path: "/inspecRecord",
          title: this.langPackage.menu_pad.inspecRecord,
          icon: "fa fa-commenting"
        },
        {
          name: "firstentity",
          path: "/firstentity",
          title: this.langPackage.menu_pad.firstEntity,
          icon: "fa fa-area-chart"
        },
        {
          name: "tourEntity",
          path: "/tourEntity",
          title: this.langPackage.menu_pad.tourEntity,
          icon: "fa fa-bookmark"
        },
        {
          name: "product",
          path: "/product",
          title: this.langPackage.menu_pad.product,
          icon: "fa fa-asl-interpreting",
          child: [
            {
              name: "productInfo",
              path: "/product/productInfo",
              title: this.langPackage.menu_pad.productInfo
            },
            {
              name: "productEnter",
              path: "/product/productEnter",
              title: this.langPackage.menu_pad.productEnter
            }
          ]
        },
        {
          name: "workonoff",
          path: "/workonoff",
          title: this.langPackage.menu_pad.workonoff,
          icon: "fa fa-codiepie"
        },
        {
          name: "signage",
          path: "/signage",
          title: this.langPackage.menu_pad.signage,
          icon: "fa fa-calendar-minus-o",
          child: [
            {
              title: this.langPackage.menu_pad.machineReachRate,
              path: "/signage/machineReachRate",
              name: "machineReachRate"
            },
            {
              title: this.langPackage.menu_pad.prodSchedule,
              path: "/signage/prodSchedule",
              name: "prodSchedule"
            },
            {
              title: this.langPackage.menu_pad.wholeReachRate,
              path: "/signage/wholeReachRate",
              name: "wholeReachRate"
            }
          ]
        },
        {
          name: "messagePush",
          path: "/messagePush",
          title: this.langPackage.menu_pad.messagePush,
          icon: "fa fa-comment-o",
          child: [
            {
              title: this.langPackage.menu_pad.notice,
              path: "/messagePush/notice",
              name: "notice"
            },
            {
              title: this.langPackage.menu_pad.bulletin,
              path: "/messagePush/bulletin",
              name: "bulletin"
            },
            {
              title: this.langPackage.menu_pad.precautions,
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
  },
};
</script>
