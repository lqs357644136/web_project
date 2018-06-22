<template>
  <div class="rcordInfo  animated slideInRight">
    <checkMain></checkMain>
    <div class="backBtn">
      <el-button type="primary" plain @click="backBtn()">返回</el-button>
    </div>
  </div>
</template>

<script>
import checkMain from "./info/checkMain.vue";
export default {
  name:'rcordInfo',
  data(){
    return {}
  },
  methods:{
    backBtn(){
      this.$emit("choiceListen", true);
    }
  },
  components: {
    checkMain
  }
}
</script>

