<template>
    <div class="manSzList">
        <table border="1" cellspacing="0">
            <thead>
                <tr>
                    <td>车间人数</td>
                    <td colspan="2">{{lists.totalPersonQty}}</td>
                    <td>出勤人数</td>
                    <td>{{lists.attPersonQty}}</td>
                    <td>请假人数</td>
                    <td colspan="2">{{lists.leavePersonQty}}</td>
                    <td>即时状态</td>
                    <td colspan="3">
                        生产 <span :class="lists.status == 1?'fa fa-square':'fa fa-square-o'"></span>
                        暂停 <span :class="lists.status == 0?'fa fa-square':'fa fa-square-o'"></span>
                    </td>
                </tr>
            </thead>
            <tbody v-for="(item,index) in lists.planList" :key="index">
                <tr >
                    <td rowspan="2">{{item.line}}</td>
                    <td>单号</td>
                    <td>料号</td>
                    <td>工单数量</td>
                    <td>产出数量</td>
                    <td>直通率</td>
                    <td>不良率</td>
                    <td>不良原因</td>
                    <td>缺料</td>
                    <td>来料不良</td>
                    <td>设备故障</td>
                    <td>转拉</td>
                </tr>
                <tr>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.partNo}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.outputQty}}</td>
                    <td>{{item.directRate}}</td>
                    <td>{{item.badRate}}</td>
                    <td>{{item.ngType}}</td>
                    <td :class="item.materialsTime!='00:00'?'stateRed':''">{{item.materialsTime}}</td>
                    <td :class="item.qualityTime!='00:00'?'stateRed':''">{{item.qualityTime}}</td>
                    <td :class="item.maintenanceTime!='00:00'?'stateRed':''">{{item.maintenanceTime}}</td>
                    <td :class="item.transferTime!='00:00'?'stateRed':''">{{item.transferTime}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:'manSzList',
    props: ['lists']
}
</script>
