<template>
    <div class="home">
      home
    </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          path: "/phone/signage",
          title: "电子看板",
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




