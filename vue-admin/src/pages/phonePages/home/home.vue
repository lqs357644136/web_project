<template>
  <div class="home">
      <div class="menus" >
          <div class="menuBox" @click="goPage(item.path)" v-for="(item,index) in menus" :key="index">
              <i :class="item.icon"></i>
              <span class="text">{{item.title}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          menus:[
              {
                  path:'/phone/signage',
                  title:'电子看板',
                  icon:'icon fa fa-circle-o-notch'
              },
              {
                  path:'/phone/signage',
                  title:'电子看板',
                  icon:'icon fa fa-circle-o-notch'
              },
              {
                  path:'/phone/signage',
                  title:'电子看板',
                  icon:'icon fa fa-circle-o-notch'
              },
              {
                  path:'/phone/signage',
                  title:'电子看板',
                  icon:'icon fa fa-circle-o-notch'
              },
          ]
      }
  },
  methods:{
      goPage(path){
          this.$router.push(path);
      }
  }
}
</script>




