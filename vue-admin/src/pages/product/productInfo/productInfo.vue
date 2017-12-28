<template>
    <div class="panel">
      <panel-title :title="$route.meta.title"></panel-title>
      <div class="panel-body" style="padding:0">
        <productListComponent v-on:chioceListen="chioceList" v-if="chioce"></productListComponent>
        <productComponent v-on:chioceListen="chioceList" :productInfo="pInfo" v-else productType="Info"></productComponent>
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
      chioce:true,
      pInfo:null,
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
    chioceList({type,pInfo}){
      this.chioce = type=='edit'?false:true;
      this.pInfo=pInfo;
      return 
    }
  }
};
</script>
