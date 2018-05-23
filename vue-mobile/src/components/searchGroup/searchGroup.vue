<template>
    <div class="searchGroup">
        <div class="title" @click="open=!open">
            <div class="text" :style="open?'color:blue':''">
                <i class="fa fa-paypal"></i>
                <span class=""> {{title}}</span>
            </div>
            <span>
                <i :class="open?'fa fa-chevron-down':'fa fa-chevron-right'"></i>
            </span>
        </div>
        <div class="main" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: "searchGroup",
  props: {
    title: {
      type: String
    },
    showState: {
      type: Boolean
    }
  },
  data() {
    return {
      open: this.showState
    };
  },
  watch: {
    open: function(val) {
      console.log(val);
      this.$emit("input", val);
    }
  }
};
</script>

