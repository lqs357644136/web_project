<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <check></check>
    </div>
  </div>
</template>
<script>
import check from "./check/check.vue";
import { panelTitle } from "components";
import { mapGetters } from "vuex";
import url from "api";

export default {
  name: "firstEntity",
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      macInfo: {
        equipNo: "",
        plant: "",
        line: ""
      }
    };
  },
  created() {
    this.check_init();
  },
  components: {
    panelTitle,
    check
  },
  methods: {
    //初始化检查信息
    check_init() {
      //获取机器信息
      let macInfo = Window.GETMACINFO();
      this.macInfo.equipNo = macInfo.equipNo;
      this.macInfo.plant = macInfo.plant;
      this.macInfo.line = macInfo.line;
      //请求检查信息
      this.get_checkInfo();
    },
    //请求检查页面信息
    get_checkInfo() {
      let params = {
        process: this.macInfo.equipNo,
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      this.$get_noToken({
        url: url.terFirstCheck_info,
        params: params
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.$store.dispatch("set_checklist", res.data);
        } else {
          this.$alert(res.msg, "错误", {
            confirmButtonText: "确定",
            callback: action => {
              try {
                window.android.finish();
              } catch (e) {
                console.log(e);
              }
            }
          });
        }
      });
    }
  }
};
</script>

