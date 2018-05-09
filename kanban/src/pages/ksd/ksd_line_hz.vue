<template>
    <div class="ksd_line_hz">
        <kanbanTitle :logo="logo" title="MI车间每日生产进度看板"></kanbanTitle>
        <div class="kanban-body">

            <div class="msg"></div>
        </div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_build_hz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import logoPng from "./img/logo.png";
export default {
  name: "ksd_build_hz",
  data() {
    return {
      logo: logoPng,
      date: "",
      macInfo: {
        plant: "",
        line: ""
      },
    };
  },
  mounted() {
    this.mac_init();
    //this.get_data();
    // setTimeout(() => {
    //   setInterval(() => {
    //     this.get_data();
    //   }, 20000);
    // }, 20000);
  },
  methods: {
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      // this.$get_noToken({
      //   url: this.$api_baseurl(url.getAttendanceScheduleList),
      //   params: params
      // }).then(res => {
      //   console.log(res);
      //   if (res.code == 1) {

      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
    },
    //获取机台信息
    mac_init() {
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      } else {
        this.macInfo.plant = Window.GETMACINFO().plant;
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      } else {
        this.macInfo.line = Window.GETMACINFO().line;
      }
    }
  },
  components: {
    kanbanTitle,
  }
};
</script>
