<template>
    <div class="buildHzList">
        <div class="buildInfo">
            <table border="1" cellspacing="0">
                <tr>
                    <td class="titles">车间人数 : </td>
                    <td class="titles">{{tableList.info.attPersonQty}}</td>
                    <td class="titles">出勤人数 : </td>
                    <td class="titles">{{tableList.info.actPersonQty}}</td>
                    <td class="titles">缺勤人数 : </td>
                    <td class="titles">{{tableList.info.absenteesQty}}</td>
                    <td class="titles">日期 : </td>
                    <td class="titles">{{tableList.info.currentDate}}</td>
                </tr>
            </table>
        </div>
        <div class="buildList">
            <div class="buildListHead">
                <table border="1" cellspacing="0">
                    <tr>
                        <td class="titles">线别</td>
                        <td class="titles">工单号</td>
                        <td class="titles">客户</td>
                        <td class="titles">料号</td>
                        <td class="titles">产品型号</td>
                        <td class="titles">订单数量</td>
                        <td class="titles">标准产能</td>
                        <td class="titles">实际产能</td>
                        <td class="titles">订单完成率</td>
                    </tr>
                </table>
            </div>
            <div class="buildListBody" ref="listBody">
                <table border="1" cellspacing="0" ref="listTable">
                    <tr v-for="(item,index) in tableList.list" :key="index">
                        <td class="ptnmSmall">{{item.lineDesc}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{item.custNo}}</td>
                        <td>{{item.partNo}}</td>
                        <td class="ptnmSmall">{{item.ptnm}}</td>
                        <td>{{item.schQty}}</td>
                        <td>{{item.uDF11}}</td>
                        <td>{{item.actulQty}}</td>
                        <td>{{item.rentPercent}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "buildHzList",
  props: ["tableList"],
  data() {
    return {};
  },
  mounted() {
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
    //处理百分数
    takenNum(str) {
      if (!str) return "";
      let num = str.split("%")[0] * 1;
      return num.toFixed(2) + "%";
    }
  }
};
</script>
