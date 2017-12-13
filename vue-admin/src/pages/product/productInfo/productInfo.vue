<template>
    <div class="panel">
      <panel-title :title="$route.meta.title"></panel-title>
      <div class="panel-body">
        <productListComponent v-on:chioceListen="chioceList" v-if="chioce"></productListComponent>
        <productComponent v-on:chioceListen="chioceList" v-else productType="Info"></productComponent>
      </div>
    </div>
</template>

<script>
import { panelTitle } from "components";
import productListComponent from "../productComponent/productListComponent.vue";
import productComponent from "../productComponent/productComponent.vue";
export default {
  data(){
    return {
      chioce:true
    }
  },
  components: {
    panelTitle,
    productListComponent,
    productComponent
  },
  created(){
  },
  methods:{
    chioceList(type){
      this.chioce = type=='edit'?false:true
      return 
    }
  }
};
</script>
