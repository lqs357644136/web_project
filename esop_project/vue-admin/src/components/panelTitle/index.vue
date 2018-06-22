<template>
  <div :class="back||center?'panel-title textCenter':'panel-title'">
    <span class="back" v-if="back" @click="terBack()">
      <i class="icon fa fa-angle-double-left"></i>
      <span class="text">返回</span>
    </span>
    <span v-if="title" v-text="title"></span>
  </div>
</template>
<script type="text/javascript">
export default {
  name:'panelTitle',
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean
    },
    center: {
      type: Boolean
    },
  },
  methods:{
    terBack(){
      try{
        window.android.finish()
      }catch(e){
        console.log(e)
      }
    }
  }
};
</script>
