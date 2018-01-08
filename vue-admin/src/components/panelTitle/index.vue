<template>
  <div :class="back?'panel-title textCenter':'panel-title'">
    <span class="back" v-if="back" @click="terBack()">
      <i class="icon fa fa-angle-double-left"></i>
      <span class="text">返回</span>
    </span>
    <span v-if="title" v-text="title"></span>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean
    }
  },
  methods:{
    terBack(){
      Window.GETMACINFO().backUp();
    }
  }
};
</script>
