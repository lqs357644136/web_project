<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" style="padding:0">
      <productListComponent v-on:chioceListen="chioceList" v-if="chioce"></productListComponent>
      <productComponent v-on:chioceListen="chioceList" v-else productType="Info" class="animated slideInRight"></productComponent>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import productListComponent from "../productComponent/productListComponent.vue";
import productComponent from "../productComponent/productComponent.vue";

export default {
  data() {
    return {
      productList: null,
      chioce: true,
    };
  },
  components: {
    panelTitle,
    productListComponent,
    productComponent
  },
  created() {
  },
  methods: {
    chioceList(obj) {
      this.chioce = obj.type == "edit" ? false : true;
    }
  }
};
</script>
