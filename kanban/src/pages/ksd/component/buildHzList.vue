<template>
    <div class="buildHzList">
        <table class="" border="1" cellspacing="0" >
            <thead>
                <tr>
                    <td colspan="4">车间人数 : {{tableList.info.attPersonQty}}</td>
                    <td colspan="3">出勤人数 : {{tableList.info.actPersonQty}}</td>
                    <td colspan="3">日期 : {{tableList.info.currentDate | dataFormat('yyyy-MM-dd')}}</td>
                </tr>
                <tr>
                    <td>线别</td>
                    <td>工单号</td>
                    <td>客户</td>
                    <td>料号</td>
                    <td>产品型号</td>
                    <td>订单数量</td>
                    <td>标准产能</td>
                    <td>实际产能</td>
                    <td>总达成率</td>
                    <td>备注</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableList.list" :key="index">
                    <td>{{item.lineDesc}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.custNo}}</td>
                    <td>{{item.partNo}}</td>
                    <td>{{item.ptnm}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.uDF11}}</td>
                    <td>{{item.actulQty}}</td>
                    <td>{{takenNum(item.rentPercent)}}</td>
                    <td>{{item.remark}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "buildHzList",
  props: ["tableList"],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    //处理百分数
    takenNum(str){
        let num = str.split('%')[0]*1;
        return num.toFixed(2)+'%';
    }
  }
};
</script>
