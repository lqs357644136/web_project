<template>
    <div class="dayBuildSzList">
        <div class="listHead">
            <table cellspacing="0">
                <tr>
                    <td class="titles">
                        <div>车间人数:</div>
                    </td>
                    <td class="titles"><div>{{lists.totalPersonQty }}</div></td>
                    <td class="titles">
                        <div>出勤人数:</div>
                    </td>
                    <td class="titles"><div>{{lists.attPersonQty }}</div></td>
                    <td class="titles">
                        <div>请假人数:</div>
                    </td>
                    <td class="titles"><div>{{lists.leavePersonQty }}</div></td>
                </tr>

            </table>
        </div>
        <div class="listMoreHead">
            <table cellspacing="0">
                <tr>
                    <td class="titles">
                        <div>生产单号</div>
                        <div>Production no</div>
                    </td>
                    <td class="titles">
                        <div>料号</div>
                        <div>Part No</div>
                    </td>
                    <td class="titles">
                        <div>产品名称</div>
                        <div>Product name</div>
                    </td>
                    <td class="titles">
                        <div>计划数量</div>
                        <div>Planned</div>
                        <div>quantity</div>
                    </td>
                    <td class="titles">
                        <div>产出数量</div>
                        <div>Output</div>
                        <div>quantity</div>
                    </td>
                    <td class="titles">
                        <div>不良数量</div>
                        <div>Unqualified</div>
                        <div>quantity</div>
                    </td>
                    <td class="titles">
                        <div>完成状态</div>
                        <div>Status</div>
                    </td>
                    <td class="titles">
                        <div>备注</div>
                        <div>remark</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="listBody" ref="listBody">
            <table cellspacing="0" ref="listTable">
                <tr class="fg" v-if="plantList.length>10">
                    <td colspan="10"></td>
                </tr>
                <tr v-for="(item,index) in plantList" :key="index">
                    <td>{{item.orderNo}}</td>
                    <td>{{item.partNo}}</td>
                    <td class="ptnmSmall">{{item.partDesc}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.outputQty }}</td>
                    <td>{{item.badQty }}</td>
                    <td :class="item.status==1?'over':''">{{item.status==1?'已完成':'未完成'}}</td>
                    <td class="ptnmSmall">{{item.remark}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
/////////////////////////////
export default {
  name: "dayBuildSzList",
  props: ["lists", "plantList"],
  data() {
    return {
      tableList: this.lists.list,
      temperStyleSeen: "none",
      humidityStyleSeen: "none"
    };
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
  watch: {
    lists: {
      handler(n, o) {
        this.temperStyle(this.lists.temper);
        this.humidityStyle(this.lists.temper);
      },
      deep: true
    }
  },
  methods: {
    //判断温度颜色
    temperStyle(str) {
      let num = str * 1;
      if (num > 28.5 || num < 20) {
        this.temperStyleSeen = "red";
      } else {
        this.temperStyleSeen = "#33CCFF";
      }
    },
    //判断湿度颜色
    humidityStyle(str) {
      let num = str * 1;
      if (num > 75 || num < 35) {
        this.humidityStyleSeen = "red";
      } else {
        this.humidityStyleSeen = "#33CCFF";
      }
    }
  }
};
</script>

