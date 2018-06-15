<template>
    <div class="mainTable">
        <div class="tableHead">
            <table>
                <tr>
                    <td>检验项目</td>
                    <td>检验方法</td>
                    <td>检验规格</td>
                    <td>检验明细</td>
                </tr>
            </table>
        </div>
        <div class="tableBody">
            <table>
                <tr v-for="(item,index) in list" :key="index">
                    <td>{{item.item.description}}({{item.itemValue}})</td>
                    <td>{{item.method.description}}</td>
                    <td>{{item.inspectSpecification}}</td>
                    <td>
                        <checkVals :detailsData="item.details"></checkVals>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import checkVals from './checkVals.vue';
export default {
    name:'mainTable',
    props: ['list'],
    components:{
        checkVals
    }
}
</script>

