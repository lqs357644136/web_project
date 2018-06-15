<template>
  <div class="ksd_man_sz">
    <kanbanTitle class="titleStyle" :logo="logo" :titleMain="titleMain"></kanbanTitle>
    <div class="kanban-body">
      <manSzList :lists="lists"></manSzList>
      <manSzMsg :msgs="msgs"></manSzMsg>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_man_sz.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import manSzList from "./component/manSzList.vue";
import manSzMsg from "./component/manSzMsg.vue";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "ksd_man_sz",
  data() {
    return {
      logo: logoPng,
      titleMain: {
        text01: "生产管理看板",
        text02: "Production Management Kanban"
      },
      titleName: "生产管理看板",
      macInfo: {
        plant: "1000",
        line: "BC1",
        rowNum: 10,
        eachTime: 8000
      },
      lists:null,
      msgs:null,
    };
  },
  mounted() {
    this.mac_init();
    this.titleName_init();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 10000);
  },
  methods: {
    //初始化标题名字
    titleName_init() {
      this.titleMain.text01 = this.macInfo.plant + "生产管理看板";
      this.titleMain.text02 =
        this.macInfo.plant + "Production Management Kanban";
    },
    //请求数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKStarProdManageKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
         this.lists = res.data;
         this.msgs = res.data;
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
    manSzList,
    manSzMsg
  }
};
</script>
