<template>
    <div class="tableMain">
        <mainInfo :info="tableData.info"></mainInfo>
        <mainTable :list="tableData.list"></mainTable>
    </div>
</template>

<script>
import mainInfo from './mainInfo.vue';
import mainTable from './mainTable.vue';
export default {
    name:'tableMain',
    props: ['tableData'],
    components:{
        mainInfo,
        mainTable
    }
}
</script>
