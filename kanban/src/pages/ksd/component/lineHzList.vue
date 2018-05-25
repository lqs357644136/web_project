<template>
    <div class="lineHzList">
        <table border="1" cellspacing="0">
            <thead>
                <tr>
                    <td>
                        <div class="theadBox">
                            <span>线别</span>
                            <span>Group</span>
                        </div>
                    </td>
                    <td>{{list.lineDesc}}</td>
                    <td>
                        <div class="theadBox">
                            <span>当班组长</span>
                            <span>Leader</span>
                        </div>
                    </td>
                    <td class="picture">
                        <img :src="getImgSrc(list.photo)" alt=""></td>
                    <td>
                        <div class="theadBox">
                            <span>{{list.empName}}</span>
                            <span>{{list.empNo}}</span>
                        </div>
                    </td>
                    <td>
                        <div class="theadBox">
                            <span>应到人数</span>
                            <span>AttPersonQty</span>
                        </div>
                    </td>
                    <td>{{list.attPersonQty}}</td>
                    <td>
                        <div class="theadBox">
                            <span>实到人数</span>
                            <span>ActPersonQty</span>
                        </div>
                    </td>
                    <td>{{list.actPersonQty}}</td>
                    <td>
                        <div class="theadBox">
                            <span>日期</span>
                            <span>Date</span>
                        </div>
                    </td>
                    <td>{{list.date}}</td>
                    <td class="wd">
                        <div>
                            <span :style="'background:'+temperStyleSeen">{{list.temper}}℃</span>
                            <span :style="'background:'+humidityStyleSeen">{{list.humidity}}%RH</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>序号</td>
                    <td>时间段</td>
                    <td>工单号</td>
                    <td>客户</td>
                    <td>料号</td>
                    <td>产品型号</td>
                    <td>订单数量</td>
                    <td>标准产能</td>
                    <td>实际产能</td>
                    <td>计划达成率</td>
                    <td colspan="2">备注</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list.list" :key="index" :class="item.flag?'onWork':''">
                    <td>{{index+1}}</td>
                    <td>{{item.timeCycle}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.cust }}</td>
                    <td>{{item.partNo}}</td>
                    <td :class="item.partDesc&&item.partDesc.length>15?'ptnmSmall':''">{{item.partDesc}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.standardQty}}</td>
                    <td>{{item.outputQty}}</td>
                    <td>{{item.reachRate}}</td>
                    <td colspan="2">{{item.remark}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { $dataFormat } from "common/filiter/index.js";
import picturePng from "../img/picture.png";
import url from "api";
export default {
  name: "lineHzList",
  props: ["list"],
  data() {
    return {
      leaderPic: "",
      listData: [],
      totalNum: 12,
      temperStyleSeen: "none",
      humidityStyleSeen: "none",
    };
  },
  mounted() {
    setTimeout(() => {
      this.takeSomeData(
        this.list.list.length - this.totalNum,
        this.list.list.length - 1
      );
    }, 2000);
  },
  watch: {
    list: {
      handler(n, o) {
        this.temperStyle(this.list.temper);
        this.humidityStyle(this.list.temper);
      },
      deep: true
    }
  },
  methods: {
    //获取图片流
    getImgSrc(imgPath) {
      if (imgPath && imgPath.length > 0) {
        // this.$get_file({
        //   url: this.$api_baseurl(url.file_get),
        //   params: { path: imgPath }
        // }).then(res => {
        //   console.log(res);
        //   return res;
        // });
        return imgPath;
      } else {
        return "";
      }
    },
    //截取部分纪录
    takeSomeData(startNum, endNum) {
      //   if (this.list.list.length > this.totalNum) {
      //     this.listData = this.list.list.slice(startNum);
      //   } else if (this.list.list.length < this.totalNum) {
      //     this.listData = this.list.list;
      //     let needNum = this.totalNum - this.list.list.length;
      //     for (let i = 0; i < needNum; i++) {
      //       this.listData.push({});
      //     }
      //   } else {
      //     this.listData = this.list.list;
      //   }
      this.listData = this.list.list;
    },
    //判断温度颜色
    temperStyle(str) {
      let num = str * 1;
      console.log(num);
      if (num > 28.5 || num < 20) {
        this.temperStyleSeen = "red";
      } else {
        this.temperStyleSeen = "#33CCFF";
      }
    },
    //判断湿度颜色
    humidityStyle(str) {
       let num = str * 1;
      console.log(num);
      if (num > 75 || num < 35){
        this.humidityStyleSeen = "red";
      } else {
        this.humidityStyleSeen = "#33CCFF";
      }
    }
  }
};
</script>

