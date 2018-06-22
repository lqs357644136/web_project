<template>
  <div class="ksd_line_sz">
    <div class="build_list">
      <div class="kanbanTitle">{{list_thead.info.plant}} 生产看板</div>
      <table cellspacing="0">
        <thead>
          <tr>
            <td colspan="2" class="logo">
              <img :src="logo" alt="">
            </td>
            <td colspan="4" class="title"></td>
            <td rowspan="3" class="picture">
              <img :src="list_thead.picture.managerPic" alt="">
            </td>
            <td rowspan="3" class="picture">
              <img :src="list_thead.picture.qcPic" alt="">
            </td>
          </tr>
          <tr>
            <td>线别</td>
            <td>{{list_thead.info.line}}</td>
            <td>定编人数</td>
            <td>{{list_thead.info.att}}</td>
            <td class="date">日期</td>
            <td>{{list_thead.date.plan}}</td>
          </tr>
          <tr>
            <td>责任人</td>
            <td>{{list_thead.info.person}}</td>
            <td>出勤人数</td>
            <td>{{list_thead.info.act}}</td>
            <td class="date">实时时间</td>
            <td>{{list_thead.date.real}}</td>
          </tr>
        </thead>
      </table>
      <div class="mainBodyTable">
        <div class="mainBodyTitle">
          <table class="main" border="1" cellspacing="0">
            <tbody>
              <tr class="mainTr mainTitle">
                <td>状态</td>
                <td>工单号</td>
                <td>料号</td>
                <td>产品型号</td>
                <td>计划数量</td>
                <td>完成数量</td>
                <td>生产进度</td>
                <td>不良数</td>
                <td>合格率</td>
                <td>备注</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mainBodytBody" >
          <table class="main" border="1" cellspacing="0" >
            <tbody>
              <tr v-for="(item,index) of list_tbody" :key="index" :class="rowColor(item.statu,item.prodschedule)" v-if="index==0">
                <td :style="prodstatuColor(item.prodstatu)"></td>
                <td>{{item.orderNo}}</td>
                <td class="ptnmSmall">{{item.partNo}}</td>
                <td class="ptnmSmall">{{item.ptnm}}</td>
                <td>{{item.schQty }}</td>
                <td>{{item.finishQty }}</td>
                <td>{{item.prodschedule }}</td>
                <td>{{item.badNumber }}</td>
                <td>{{item.badRate }}</td>
                <td>{{item.remark}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mainBodytBody2" ref="listBody">
          <table class="main" border="1" cellspacing="0" ref="listTable">
            <tbody>
              <tr v-for="(item,index) of list_tbody" :key="index" :class="rowColor(item.statu,item.prodschedule)" v-if="index!=0">
                <td :style="prodstatuColor(item.prodstatu)"></td>
                <td>{{item.orderNo}}</td>
                <td class="ptnmSmall">{{item.partNo}}</td>
                <td class="ptnmSmall">{{item.ptnm}}</td>
                <td>{{item.schQty }}</td>
                <td>{{item.finishQty }}</td>
                <td>{{item.prodschedule }}</td>
                <td>{{item.badNumber }}</td>
                <td>{{item.badRate }}</td>
                <td>{{item.remark}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="msg"></div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/ksd_line_sz.scss";
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
      macInfo: {
        plant: "",
        line: "",
        eachTime: 8000
      },
      list_thead: {
        info: {
          line: "",
          person: ""
        },
        date: {
          plan: "",
          real: ""
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
    this.getSysTime();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.getSysTime();
        this.get_data();
      }, this.macInfo.eachTime);
    }, 20000);
    setInterval(() => {
      let scrollTop = this.$refs.listBody.scrollTop;
      let offsetHeight = this.$refs.listTable.offsetHeight;
      let clientHeight = this.$refs.listBody.clientHeight;
      if (scrollTop == offsetHeight - clientHeight) {
        this.$refs.listBody.scrollTop = 0;
      } else {
        this.$refs.listBody.scrollTop += 1;
      }
    }, 80);
  },
  methods: {
    //获取系统时间
    getSysTime() {
      let params = {
        format: "yyyy/MM/dd HH:mm"
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getTime),
        params: params
      }).then(res => {
        if (res.code == 1) {
          let time = res.data.time;
          this.list_thead.date.plan = time.split(" ")[0];
          this.list_thead.date.real = time.split(" ")[1];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //获取数据
    get_data() {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getKSDLine),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.list_thead.info.line = res.data.attendanceList.lineDesc; //线别
          this.list_thead.info.plant = res.data.attendanceList.plantDesc; //线别
          this.list_thead.info.person =
            res.data.attendanceList.leader + " / " + res.data.attendanceList.qc; //责任人
          this.list_thead.info.att = res.data.attendanceList.attPersonQty; //定编人数
          this.list_thead.info.act = res.data.attendanceList.actPersonQty; //出勤人数
          this.list_thead.picture.managerPic =
            res.data.attendanceList.leaderPhoto.length > 0
              ? res.data.attendanceList.leaderPhoto
              : ""; //经理照片
          this.list_thead.picture.qcPic =
            res.data.attendanceList.qcPhoto.length > 0
              ? res.data.attendanceList.qcPhoto
              : ""; //qc照片
          this.list_tbody = res.data.scheduleList;
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
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    },
    //获取图片流
    getImgSrc(imgPath) {
      this.$get_file({
        url: this.$api_baseurl(url.file_get),
        params: { path: imgPath }
      }).then(res => {
        console.log(res);
        return res;
      });
    },
    //状态颜色
    prodstatuColor(state) {
      if (state == 1) {
        return "background:green";
      } else if (state == 2) {
        return "background:red";
      } else {
        return "";
      }
    },
    //行颜色
    rowColor(statu, prodschedule) {
      // let prods = prodschedule.split('%')[0]*1;
      // if(statu==1||prods>=100){
      //   return 'onWork';
      // }
    }
  },
  components: {
    kanbanTitle
  }
};
</script>
