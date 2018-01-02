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
          name: "phoneHome",
          title: "主页",
          path: "/phone/home",
          icon: "icon fa fa-university"
        },
        {
          name: "phoneNews",
          title: "消息",
          path: "/phone/news",
          icon: "icon fa fa-envelope-o"
        },
        {
          name: "phoneUser",
          title: "我的",
          path: "/phone/user",
          icon: "icon fa fa-user"
        }
      ]
    };
  },
  computed: {
    isPhoneHome: function() {
      let flag = this.$route.name == "phoneHome" ? true : false;
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

