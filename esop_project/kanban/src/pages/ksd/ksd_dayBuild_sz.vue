<template>
  <div class="ksd_dayBuild_sz">
    <kanbanTitle class="titleStyle" :logo="logo" :titleMain="titleMain"></kanbanTitle>
    <div class="kanban-body">
      <dayBuildSzList :lists="lists" :plantList="planList"></dayBuildSzList>
      <div class="msg">
        <marquee max-width="100%" height="100%" >{{scrollText}}</marquee>
      </div>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_dayBuild_sz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import logoPng from "./img/logo.png";
import dayBuildSzList from "./component/dayBuildSzList.vue";
import url from "api";
export default {
  name: "ksd_dayBuild_sz",
  data() {
    return {
      logo: logoPng,
      titleMain: {
        text01: "每日生产进度看板",
        text02: "Kanban workshop daily production schedules"
      },
      titleName: "每日生产进度看板",
      macInfo: {
        plant: "",
        line: "",
        rowNum: 10,
        eachTime: 8000
      },
      lists:{},
      planList:[],
      scrollText:'',
    };
  },
  mounted() {
    this.mac_init();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 10000);
  },
  methods: {
    //初始化标题名字
    titleName_init(plantDesc) {
      this.titleMain.text01 = plantDesc + " 每日生产进度看板";
      this.titleMain.text02 = "Kanban workshop daily production schedules";
    },
    //请求数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line,
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKStarDailyProdKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.titleName_init(res.data.plantDesc);
          this.lists = res.data;
          this.planList = res.data.planList;
          this.scrollText= res.data.scrollText;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //获取机台信息
    mac_init() {
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      }
      if (this.$route.query.rowNum) {
        if (this.$route.query.rowNum > 12) {
          this.macInfo.rowNum = 12;
        } else {
          this.macInfo.rowNum = this.$route.query.rowNum;
        }
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  },
  components: {
    kanbanTitle,
    dayBuildSzList
  }
};
</script>
