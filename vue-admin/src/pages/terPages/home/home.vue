<template>
    <div class="home">
        <div class="menus">
            <div class="menuBox" @click="goPage(item.path)" v-for="(item,index) in menus" :key="index">
                <i :class="item.icon"></i>
                <span class="text">{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          path: "/phone/signage",
          title: "异常报工",
          icon: "icon fa fa-bandcamp"
        },
        {
          path: "/phone/signage",
          title: "首件录入",
          icon: "icon fa fa-snowflake-o"
        },
        {
          path: "/phone/signage",
          title: "安灯报表",
          icon: "icon fa fa-id-card-o"
        },
        {
          path: "/phone/signage",
          title: "履历录入",
          icon: "icon fa fa-address-book-o"
        }
      ]
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};
</script>




