<template>
  <div class="alsWare">
    <kanbanTitle class="titleStyle" :logo="logo" title="原料仓货位电子看板" :right="date"></kanbanTitle>
    <div class="kanban-body">
      <div class="ware_list">
        <table class="ware_list" border="1" cellspacing="0">
          <thead>
            <tr>
              <td class="shelveNo">货架</td>
              <td colspan="24" class="noName">货位号
                <div class="Legend">
                  <span class="text">空闲数 : {{noEmptyCount}} | </span>
                  <span class="text">满载数 : {{emptyCount}} | </span>
                  <span class="full box"></span>
                  <span class="text">= 空闲</span>
                  <span class="empty box"></span>
                  <span class="text">= 满载</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rowItem,rowIndex) of list" :key="rowIndex">
              <td>
                {{rowItem.wareShelveNo}}
              </td>
              <td class="colBoxsTd">
                <div class="colBoxs">
                  <div class="colBox" :style="col.emptyFlag!=1?'background:#F56C6C':'background:none'" v-for="(col,colIndex) in rowItem.locationList" :key="colIndex">
                    {{col.locationNo}}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/alsWare.scss";
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import logoPng from "./img/logo.png";
import url from "api";
export default {
  name: "alsWare",
  data() {
    return {
      //date:$dataFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
      logo: logoPng,
      date: "",
      macInfo: {
        wareHouse: "",
        shelves: "",
        eachTime:8000,
      },
      list: [],
      emptyCount:0,
      noEmptyCount:0,
    };
  },
  mounted() {
    this.mac_init();
    this.dateUpdate();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.get_data();
      }, this.macInfo.eachTime);
    }, 20000);
  },
  methods: {
    //获取数据
    get_data() {
      let params = {
        wareHouse: this.macInfo.wareHouse,
        shelves: this.macInfo.shelves
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.getZhiHuiElecKanban),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.emptyCount = res.data.emptyCount;
          this.noEmptyCount = res.data.noEmptyCount;
          this.list = [];
          this.list = res.data.shelveLocations;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //动态刷新时间
    dateUpdate() {
      setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss");
        let mydate = new Date();
        let myddy = mydate.getDay(); //获取存储当前日期
        let weekday = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
        this.date = date + " " + weekday[myddy];
      }, 1000);
    },
    //获取机台信息
    mac_init() {
      if (this.$route.query.wareHouse) {
        this.macInfo.wareHouse = this.$route.query.wareHouse;
      }
      if (this.$route.query.shelves) {
        this.macInfo.shelves = this.$route.query.shelves;
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  },
  components: {
    kanbanTitle
  }
};
</script>
