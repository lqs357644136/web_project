<template>
    <div class="ksd_line_sz">
        <div class="build_list">

            <table border="1" cellspacing="0">
                <thead>
                    <tr>
                        <td colspan="2" class="logo">
                            <img :src="logo" alt="">
                        </td>
                        <td colspan="4" class="title">车间线看板</td>
                        <td rowspan="3" class="picture">
                            <img :src="list_thead.picture.managerPic" alt="">
                        </td>
                        <td rowspan="3" class="picture">
                            <img :src="list_thead.picture.qcPic" alt="">
                        </td>
                    </tr>
                    <tr>
                        <td>线别</td>
                        <td class="tdLong">
                            <div>{{list_thead.info.line}}</div>
                        </td>
                        <td>定编人数</td>
                        <td>{{list_thead.info.att}}</td>
                        <td>日期</td>
                        <td>{{list_thead.date.plan}}</td>
                    </tr>
                    <tr>
                        <td>责任人</td>
                        <td>{{list_thead.info.person}}</td>
                        <td>出勤人数</td>
                        <td>{{list_thead.info.act}}</td>
                        <td>实际时间</td>
                        <td>{{list_thead.date.real}}</td>
                    </tr>
                    <tr class="mainTitle">
                        <td>序号</td>
                        <td>生产工单号</td>
                        <td>产品料号</td>
                        <td>计划数量</td>
                        <td>完成数量</td>
                        <td>生产进度</td>
                        <td>不良数</td>
                        <td>不良率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) of list_tbody" :key="index">
                        <td class="index">{{index+1}}</td>
                        <td class="tdLong">
                            <div>{{item.orderNo}}</div>
                        </td>
                        <td class="tdLong">
                            <div>{{item.partNo }}</div>
                        </td>
                        <td>{{item.schQty }}</td>
                        <td>{{item.finishQty }}</td>
                        <td>{{item.reachRate }}</td>
                        <td>{{item.badNumber }}</td>
                        <td>{{item.badRate }}</td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="msg"></div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_line_sz.scss";
import Vue from "vue";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
/////////////////////////////
import kanbanTitle from "components/kanbanTitle.vue";
import { $dataFormat } from "common/filiter/index.js";
import logoPng from "./img/logo.png";
import picturePng from "./img/picture.png";
import url from "api";
export default {
  name: "ksd_line_sz",
  data() {
    return {
      logo: logoPng,
      picture: picturePng,
      date: "",
      macInfo: {
        plant: "",
        line: ""
      },
      list_thead: {
        info: {
          line: "",
          person: ""
        },
        date: {
          plan: $dataFormat(new Date(), "yyyy/MM/dd"),
          real: $dataFormat(new Date(), "yyyy/MM/dd")
        },
        picture: {
          managerPic: "",
          qcPic: ""
        }
      },
      list_tbody: []
    };
  },
  mounted() {
    this.mac_init();
    this.dateUpdate();
    this.get_data();
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
      this.$get_noToken({
        url: this.$api_baseurl(url.getAttendanceScheduleList),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.list_thead.info.line = res.data.attendanceList.lineDesc; //线别
          this.list_thead.info.person =
            res.data.manager.leader + " / " + res.data.manager.qc; //责任人
          this.list_thead.info.att = res.data.attendanceList.attPersonQty; //定编人数
          this.list_thead.info.act = res.data.attendanceList.actPersonQty; //出勤人数
          this.list_thead.picture.managerPic =
            res.data.manager.leaderPhoto.length > 0
              ? this.getImgSrc(res.data.manager.leaderPhoto)
              : picturePng; //经理照片
          this.list_thead.picture.qcPic =
            res.data.manager.qcPhoto.length > 0
              ? this.getImgSrc(res.data.manager.qcPhoto)
              : picturePng; //qc照片
          this.list_tbody = res.data.scheduleList;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //动态刷新时间
    dateUpdate() {
      setInterval(() => {
        let date = $dataFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
        this.date = date;
      }, 1000);
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
    },
    //获取图片流
    getImgSrc(imgPath) {
      this.$get_file({
        url: this.$api_baseurl(url.file_get),
        params: { path: imgPath }
      }).then(res => {
        console.log(res)
        return res;
      });
    }
  },
  components: {
    kanbanTitle
  }
};
</script>
