<template>
    <div class="buildHzList">
        <table class="" border="1" cellspacing="0">
            <thead>
                <tr>
                    <td colspan="3">车间人数 : {{123}}</td>
                    <td colspan="3">出勤人数 : {{123}}</td>
                    <td colspan="3">请假人数 : {{123}}</td>
                </tr>
                <tr>
                    <td>线别</td>
                    <td>生产工单号</td>
                    <td>料号</td>
                    <td>产品规格</td>
                    <td>计划数量</td>
                    <td>目标产能</td>
                    <td>实际产能</td>
                    <td>产出数量</td>
                    <td>达成率</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>线别</td>
                    <td>生产工单号</td>
                    <td>料号</td>
                    <td>产品规格</td>
                    <td>计划数量</td>
                    <td>目标产能</td>
                    <td>实际产能</td>
                    <td>产出数量</td>
                    <td>达成率</td>
                </tr>
                <tr>
                    <td>线别</td>
                    <td>生产工单号</td>
                    <td>料号</td>
                    <td>产品规格</td>
                    <td>计划数量</td>
                    <td>目标产能</td>
                    <td>实际产能</td>
                    <td>产出数量</td>
                    <td>达成率</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: "buildHzList",
  props:['tableList'],
  data(){
      return{}
  },
};
</script>
