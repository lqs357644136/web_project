<template>
  <div class="scanner">
    <phoneHeader :back="true" title="标签扫码"></phoneHeader>
    <div class="module-body">
      <div class="warp">
        <mt-button @click="scanner()" class="scannerBtn" type="primary">开始扫码</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import phoneHeader from "components/phoneMainContent/header.vue";
import {
  androidScanner,
  androidGetUrl,
  androidGetBarCodeWait,
  androidGetBarCodeEnd,
  androidSetBarCode
} from "common/uitl.js";
import url from "api";
export default {
  data() {
    return {
      each: null,
      noTouch: false
    };
  },
  methods: {
    scanner() {
      if (!this.noTouch) {
        this.noTouch = true;
        androidScanner();
        androidSetBarCode(res => {
          this.cargoPositionScan(res);
        });
      }
    },
    //提交扫码信息
    cargoPositionScan(code) {
      let params = {
        wareLocation: code
      };
      this.$get({
        url: url.cargoPositionScan,
        params: params
      }).then(res => {
        if (res.code == 1) {
          let house = res.data.house;
          let shevle = res.data.shevle;
          let location = res.data.location;
          let isEmpty = res.data.isEmpty == 1 ? "空闲" : "满载";
          this.$toast({
            message: `仓库:${house}\n货架:${shevle}\n货位:${location}\n状态:${isEmpty}`,
            iconClass: "fa fa-check",
            duration: 2000
          });
          setTimeout(() => {
            this.noTouch = false;
          }, 2000);
        } else {
          this.$toast({
            message: res.msg,
            position: "bottom"
          });
        }
      });
    }
  },
  watch: {},
  components: {
    phoneHeader
  }
};
</script>


