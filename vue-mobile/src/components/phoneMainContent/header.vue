<template>
    <mt-header fixed class="phoneHeader" :title="title">
        <div slot="left" @click="goBack()" v-if="back">
            <mt-button icon="back">返回</mt-button>
        </div>
    </mt-header>
</template>

<script>
//import phoneLayoutHeader_right from './phoneLayoutHeader_right.vue'
export default {
  name: "phoneLayoutHeader",
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean
    },
    right: {
      type: Boolean
    },
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>
