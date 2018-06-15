<template>
    <div class="alsBuildInfo">
        <table class="table01" border="1" cellspacing="0">
            <tr>
                <td>
                    <span>
                        <b>应出勤人数 : </b>{{info.attendance.attPersonQty}}</span>
                </td>
                <td>
                    <span>
                        <b>实际勤人数 : </b>{{info.attendance.actPersonQty}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="2" class="people">
                    <div class="boxs">
                        <div class="box">
                            <b class="title">Leader : {{info.manager.leader}}</b>
                            <div class="img">
                                <img :src="leaderImg" alt="">
                            </div>
                        </div>
                        <div class="box">
                            <b class="title">pt : {{info.manager.pt}}</b>
                            <div class="img">
                                <img :src="ptImg" alt="">
                            </div>
                        </div>
                        <div class="box">
                            <b class="title">qc : {{info.manager.qc}}</b>
                            <div class="img">
                                <img :src="qcImg" alt="">
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <div class="table02">
            <table class="table02" border="1" cellspacing="0">
                <thead>
                    <tr>
                        <td>工位</td>
                        <td>问题</td>
                        <td>呼叫时间</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in info.andon" :key="index">
                        <td>{{item.processDesc}}</td>
                        <td>{{item.reasonDesc }}</td>
                        <td>{{item.wanringTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import url from "api";
import defaultPic from "../img/picture.png";
export default {
  name: "alsBuildInfo",
  props: ["info"],
  data() {
    return {
      defaultLogo: defaultPic,
      leaderImg: "",
      ptImg: "",
      qcImg: ""
    };
  },
  mounted(){
      this.img_init();
  },
  methods: {
    img_init() {
      setInterval(() => {
        this.getLeaderImgSrc(this.info.manager.leaderPhoto);
        this.getPtImgSrc(this.info.manager.ptPhoto);
        this.getQcImgSrc(this.info.manager.qcPhoto);
      }, 8000);
    },
    getLeaderImgSrc(path) {
      this.$get_file({
        url: this.$api_baseurl(url.file_get),
        params: { path: path }
      }).then(res => {
        this.leaderImg = res;
      });
    },
    getPtImgSrc(path) {
      this.$get_file({
        url: this.$api_baseurl(url.file_get),
        params: { path: path }
      }).then(res => {
        this.ptImg = res;
      });
    },
    getQcImgSrc(path) {
      this.$get_file({
        url: this.$api_baseurl(url.file_get),
        params: { path: path }
      }).then(res => {
        this.qcImg = res;
      });
    }
  }
};
</script>
