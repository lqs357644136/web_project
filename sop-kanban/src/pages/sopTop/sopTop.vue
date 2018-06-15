<template>
  <div class="sopTop">
    <table border="1" cellspacing="0">
      <tr>
        <td>产品:</td>
        <td class="ptnmSmall">{{dataInfo.product}}</td>
        <td>计划数:</td>
        <td>{{dataInfo.schQty}}</td>
        <td>产出数:</td>
        <td>{{dataInfo.outPutQty}}</td>
        <td>
          <div class="btns">
            <span @click="get_data('1')">
              <i class="fa fa-plus"></i>
            </span>
            <span @click="get_data('0')">
              <i class="fa fa-minus"></i>
            </span>
          </div>
        </td>
        <td>标准节拍:</td>
        <td>{{dataInfo.standardBeat}}</td>
        <td>实际节拍:</td>
        <td>{{dataInfo.actualBeat}}</td>
        <td>{{dataInfo.beatRate}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
//////////UI组件加载//////////
import "./style/sopTop.scss";
/////////////////////////////
import { getMacINfo } from "common/uitl.js";
import url from "api";
export default {
  name: "sopTop",
  data() {
    return {
      macInfo: {
        plant: "",
        line: "",
        process: "",
        empNo: "",
        eachTime: 15000
      },
      dataInfo: {}
    };
  },
  mounted() {
    this.mac_init();
    this.get_data();
    setTimeout(() => {
      setInterval(() => {
        this.mac_init();
        this.get_data();
      }, this.macInfo.eachTime);
    }, 10000);
  },
  methods: {
    //获取数据
    get_data(str) {
      let params = {
        plant: this.macInfo.plant,
        line: this.macInfo.line,
        emp:
          this.macInfo.empNo.length > 0
            ? this.macInfo.empNo
            : this.macInfo.process,
        flag: str ? str : ""
      };
      this.$get_noToken({
        url: this.$newPro_api_baseurl(url.getAnHuiFactoryTitleMsg),
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.dataInfo = res.data;
        }
      });
    },
    //获取机台信息
    mac_init() {
      let macInfo = Window.GETMACINFO();
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      } else {
        this.macInfo.plant = macInfo.plant;
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      } else {
        this.macInfo.line = macInfo.line;
      }
      if (this.$route.query.process) {
        this.macInfo.process = this.$route.query.process;
      } else {
        this.macInfo.process = macInfo.equipNo;
      }
      if (this.$route.query.empNo) {
        this.macInfo.empNo = this.$route.query.empNo;
      } else {
        this.macInfo.empNo = macInfo.empNo;
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  }
};
</script>
