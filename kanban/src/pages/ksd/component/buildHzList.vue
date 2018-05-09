<template>
    <div class="buildHzList">
        <table class="" border="1" cellspacing="0">
            <thead>
                <tr>
                    <td colspan="4">车间人数 : {{123}}</td>
                    <td colspan="3">出勤人数 : {{123}}</td>
                    <td colspan="3">日期 : {{date}}</td>
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
      date: ""
    };
  },
  mounted() {
    this.dateUpdate();
  },
  methods: {
    //动态刷新时间
    dateUpdate() {
        let date = $dataFormat(new Date(), "yyyy年MM月dd日");
        let mydate = new Date();
        let myddy = mydate.getDay(); //获取存储当前日期
        let weekday = [
          "星期日","星期一","星期二","星期三","星期四","星期五","星期六"
        ];
        this.date = date + " " + weekday[myddy];
    }
  }
};
</script>
