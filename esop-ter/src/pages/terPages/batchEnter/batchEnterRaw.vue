<template>
    <div class="panel batchEnter">
        <panel-title :back="true" :title="$route.meta.title"></panel-title>
        <div class="panel-body">
            <batchEnterComponent :batchType="batchType"></batchEnterComponent>
        </div>
    </div>
</template>

<script>
import { panelTitle } from "components";
import batchEnterComponent from "./batchEnterComponent/batchEnterComponent.vue";
export default {
  data() {
    return {
      batchType: 1
    };
  },
  components: {
    batchEnterComponent,
    panelTitle
  }
};
</script>
