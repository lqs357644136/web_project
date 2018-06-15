<template>
    <mt-tabbar fixed  class="phoneTabbar" v-model="selected" @click="goPage()">
        <mt-tab-item :id="index" v-for="(item,index) in tabbars" :key="index" >
            <i :class="item.icon"></i>
            <span class="text">{{item.title}}</span>
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: 0,
      tabbars: [
        {
          name: "home",
          title: "主页",
          path: "/home",
          icon: "icon fa fa-university"
        },
        {
          name: "news",
          title: "消息",
          path: "/news",
          icon: "icon fa fa-envelope-o"
        },
        {
          name: "user",
          title: "我的",
          path: "/user",
          icon: "icon fa fa-user"
        }
      ]
    };
  },
  computed: {
    isPhoneHome: function() {
      let flag = this.$route.name == "home" ? true : false;
      return flag;
    }
  },
  watch: {
    selected:function(newVal){
        let path = this.tabbars[newVal].path;
        this.$router.push(path);
    }
  }
};
</script>

