<template>
  <div class="news">
    <phoneHeader title="消息中心"></phoneHeader>
    <div class="module-body">
      <div class="msg">
        <div class="text">

          <i class="fa fa-meetup"></i>
          <span>暂无新的消息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import phoneHeader from "components/phoneMainContent/header.vue";
export default {
  data() {
    return {};
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  },
  components: {
    phoneHeader
  }
};
</script>




