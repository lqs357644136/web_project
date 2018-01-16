<template>
  <div class="terView">
    <router-view class="ter"></router-view>
  </div>
</template>

<script>
export default {
  name:'terView'
}

// 终端测试地址:
//
// 异常报工:
// http://192.168.1.10:8080/esop-admin/#/ter/dailywork/adnDailywork
// 生产报工:
// http://192.168.1.10:8080/esop-admin/#/ter/dailywork/proDailywork
// 原料批次录入:
// http://192.168.1.10:8080/esop-admin/#/ter/batch/batchEnterRaw
// 调合批次录入:
// http://192.168.1.10:8080/esop-admin/#/ter/batch/batchEnterBlend
// 自主录入:
// http://192.168.1.10:8080/esop-admin/#/ter/selfEntity
// 产品履历查看:
// http://192.168.1.10:8080/esop-admin/#/ter/productInfo
</script>



