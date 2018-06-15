<template>
    <div class="lineHzList">
        <div class="infoTable">
            <table border="1" cellspacing="0">
                <tr>
                    <td class="titles">
                        <div>线别</div>
                        <div>Group</div>
                    </td>
                    <td class="titles">
                        <div>{{list.lineDesc}}</div>
                    </td>
                    <td class="titles">
                        <div>当班组长</div>
                        <div>Leader</div>
                    </td>
                    <td class="picture">
                        <img :src="getImgSrc(list.photo)" alt=""></td>
                    <td class="titles">
                        <div>{{list.empName}}</div>
                        <div>{{list.empNo}}</div>
                    </td>
                    <td class="titles">
                        <div>应到人数</div>
                        <div>AttPersonQty</div>
                    </td>
                    <td class="titles">
                        <div>{{list.attPersonQty}}</div>
                    </td>
                    <td class="titles">
                        <div>实到人数</div>
                        <div>ActPersonQty</div>
                    </td>
                    <td class="titles">
                        <div>{{list.actPersonQty}}</div>
                    </td>
                    <td class="titles">
                        <div>日期</div>
                        <div>Date</div>
                    </td>
                    <td class="titles">
                        <div>{{list.date}}</div>
                    </td>
                    <td class="wd">
                        <div>
                            <span>{{list.temper}}℃</span>
                            <span>{{list.humidity}}%RH</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="scorllTable">
            <div class="scorllTable-head">
                <table border="1" cellspacing="0">
                    <tr>
                        <td class="titles">
                            <div>序号</div>
                        </td>
                        <td class="titles">
                            <div>时间段</div>
                        </td>
                        <td class="titles">
                            <div>工单号</div>
                        </td>
                        <td class="titles">
                            <div>客户</div>
                        </td>
                        <td class="titles">
                            <div>料号</div>
                        </td>
                        <td class="titles">
                            <div>产品型号</div>
                        </td>
                        <td class="titles">
                            <div>订单数量</div>
                        </td>
                        <td class="titles">
                            <div>标准产能</div>
                        </td>
                        <td class="titles">
                            <div>实际产能</div>
                        </td>
                        <td class="titles">
                            <div>计划达成率</div>
                        </td>
                        <td class="titles">
                            <div>备注</div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="scorllTable-body" ref="listBody">
                <table border="1" cellspacing="0" ref="listTable">
                    <tr class="fg" v-if="list.list.length>8">
                        <td colspan="11"></td>
                    </tr>
                    <tr v-for="(item,index) in list.list" :key="index" :class="item.flag?'onWork':''">
                        <td>{{index+1}}</td>
                        <td>{{item.timeCycle}}</td>
                        <td>{{item.orderNo}}</td>
                        <td class="ptnmSmall">{{item.cust }}</td>
                        <td>{{item.partNo}}</td>
                        <td class="ptnmSmall">{{item.partDesc}}</td>
                        <td>{{item.schQty}}</td>
                        <td>{{item.standardQty}}</td>
                        <td>{{item.outputQty}}</td>
                        <td>{{item.reachRate}}</td>
                        <td class="ptnmSmall">{{item.remark}}</td>
                    </tr>
                </table>
            </div>
        </div>

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
      humidityStyleSeen: "none"
    };
  },
  mounted() {
    setTimeout(() => {
      this.takeSomeData(
        this.list.list.length - this.totalNum,
        this.list.list.length - 1
      );
    }, 2000);
    setTimeout(() => {
      setInterval(() => {
        let scrollTop = this.$refs.listBody.scrollTop;
        let offsetHeight = this.$refs.listTable.offsetHeight;
        let clientHeight = this.$refs.listBody.clientHeight;
        if (scrollTop == offsetHeight - clientHeight) {
          this.$refs.listBody.scrollTop = 0;
        } else {
          this.$refs.listBody.scrollTop += 1;
        }
      }, 120);
    }, 4000);
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
        return imgPath;
      } else {
        return "";
      }
    },
    //截取部分纪录
    takeSomeData(startNum, endNum) {
      this.listData = this.list.list;
    },
    //判断温度颜色
    temperStyle(str) {
      let num = str * 1;
      if (num > 28.5 || num < 20) {
        this.temperStyleSeen = "red";
      } else {
        this.temperStyleSeen = "#33CCFF";
      }
    },
    //判断湿度颜色
    humidityStyle(str) {
      let num = str * 1;
      if (num > 75 || num < 35) {
        this.humidityStyleSeen = "red";
      } else {
        this.humidityStyleSeen = "#33CCFF";
      }
    }
  }
};
</script>

