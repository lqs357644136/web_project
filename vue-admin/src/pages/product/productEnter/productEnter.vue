<template>
    <div class="panel">
      <panel-title :title="$route.meta.title"></panel-title>
      <div class="panel-body" >
        <productComponent productType="enter"></productComponent>
      </div>
    </div>
</template>

<script>
import { panelTitle } from "components";
import productComponent from "../productComponent/productComponent.vue";
export default {
  components: {
    panelTitle,
    productComponent
  }
};
</script>
