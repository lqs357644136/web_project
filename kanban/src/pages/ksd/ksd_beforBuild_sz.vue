<template>
  <div class="ksd_beforBuild_sz">
    <kanbanTitle class="titleStyle" :logo="logo" :title="titleName"></kanbanTitle>
    <div class="kanban-body">
      <beforBuildSzList :lists="lists" :plantList="planList"></beforBuildSzList>
      <!-- <div class="msg">
        <marquee max-width="100%" height="100%" >{{scrollText}}</marquee>
      </div> -->
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_beforBuild_sz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import logoPng from "./img/logo.png";
import beforBuildSzList from "./component/beforBuildSzList.vue";
import url from "api";
export default {
  name: "ksd_beforBuild_sz",
  data() {
    return {
      logo: logoPng,
      titleName: "前加工进度看板",
      macInfo: {
        plant: "1000",
        line: "BC1",
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
      this.titleName = plantDesc + " 前加工进度看板";
    },
    //请求数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line,
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKStarPreScheduleKanban),
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
    beforBuildSzList
  }
};
</script>
