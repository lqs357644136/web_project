<template>
  <div class="ksd_plantBuild_sz">
    <kanbanTitle class="titleStyle" :logo="logo" :title="titleName"></kanbanTitle>
    <div class="kanban-body">
      <plantBuildSzList :lists="lists" :plantList="planList"></plantBuildSzList>
      <!-- <div class="msg">
        <marquee max-width="100%" height="100%" >{{scrollText}}</marquee>
      </div> -->
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_plantBuild_sz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import logoPng from "./img/logo.png";
import plantBuildSzList from "./component/plantBuildSzList.vue";
import url from "api";
export default {
  name: "ksd_plantBuild_sz",
  data() {
    return {
      logo: logoPng,
      titleName: "生产进度看板",
      macInfo: {
        plant: "1000",
        plus: "",
        minus: "",
        rowNum: 10,
        eachTime: 8000
      },
      lists: {},
      planList: [],
      scrollText: ""
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
      this.titleName = plantDesc + " 生产进度看板";
    },
    //请求数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        plus: this.macInfo.plus,
        minus: this.macInfo.minus
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKStarProdScheduleKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.titleName_init(res.data.plantDesc);
          this.lists = res.data;
          this.planList = res.data.planList;
          this.scrollText = res.data.scrollText;
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
      if (this.$route.query.plus) {
        this.macInfo.plus = this.$route.query.plus;
      }
      if (this.$route.query.minus) {
        this.macInfo.minus = this.$route.query.minus;
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  },
  components: {
    kanbanTitle,
    plantBuildSzList
  }
};
</script>
