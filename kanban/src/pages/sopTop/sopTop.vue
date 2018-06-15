<template>
    <div class="sopTop">
        <table border="1" cellspacing="0">
            <tr>
                <td>产品:</td>
                <td class="ptnmSmall">{{"房贷首付多少防守对方岁的分"}}</td>
                <td>计划数:</td>
                <td>{{9999}}</td>
                <td>产出数:</td>
                <td>{{9999}}</td>
                <td>
                    <div class="btns">
                        <span><i class="fa fa-plus"></i></span>
                        <span><i class="fa fa-minus"></i></span>
                    </div>
                </td>
                <td>标准节拍:</td>
                <td>{{9999}}</td>
                <td>实际节拍:</td>
                <td>{{9999}}</td>
                <td>{{'99%'}}</td>
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
  methods: {
    //获取机台信息
    mac_init() {
      if (this.$route.query.plant) {
        this.macInfo.plant = this.$route.query.plant;
      } else {
        this.macInfo.plant = Window.android.getPlant();
      }
      if (this.$route.query.line) {
        this.macInfo.line = this.$route.query.line;
      } else {
        this.macInfo.line = Window.android.getLine();
      }
      if (this.$route.query.eachTime) {
        this.macInfo.eachTime = parseInt(this.$route.query.eachTime);
      }
    }
  }
};
</script>
