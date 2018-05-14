<template>
    <div class="alsEntityList">
        <table border="1" cellspacing="0">
            <thead>
                <tr>
                    <td>成品料号</td>
                    <td>产品名称</td>
                    <td>单产</td>
                    <td>计划产出数</td>
                    <td>实际产出数</td>
                    <td>达成率（%）</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="index">
                    <td>{{item.partNo}}</td>
                    <td>{{item.partDesc}}</td>
                    <td>{{item.udf11}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.finishQty}}</td>
                    <td>{{ parseInt(item.reachRate)}}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  name: "alsBuildList",
  props: ["list"],
  data() {
    return {
        
    };
  }
};
</script>
