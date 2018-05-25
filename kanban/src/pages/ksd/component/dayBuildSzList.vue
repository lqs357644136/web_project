<template>
    <div class="dayBuildSzList">
        <div class="listHead">
            <table cellspacing="0">
                <tr>
                    <td class="titles">
                        <div>线别</div>
                        <div>Group</div>
                    </td>
                    <td class="titles">{{lists.lineDesc}}</td>
                    <td class="titles">
                        <div>拉线组长</div>
                        <div>Leader</div>
                    </td>
                    <td class="img"><img :src="lists.photo" alt=""></td>
                    <td class="titles">{{lists.empName}}</td>
                    <td class="titles">
                        <div>标准人数</div>
                        <div>Standard headcount</div>
                    </td>
                    <td class="titles">{{lists.stdPersonQty}}</td>
                    <td class="titles">
                        <div>排拉人数</div>
                        <div>Actual headcount</div>
                    </td>
                    <td class="titles">{{lists.schPersonQty}}</td>
                    <td class="titles">
                        <div>日期</div>
                        <div>Date</div>
                    </td>
                    <td class="titles">{{lists.date}}</td>
                    <td class="titles">
                        <div>车间环境温度</div>
                        <div>Workshop environment temperature</div>
                    </td>
                    <td class="wd">
                        <div>
                            <span :style="'background:'+temperStyleSeen">{{lists.temper}}℃</span>
                            <span :style="'background:'+humidityStyleSeen">{{lists.humidity}}%RH</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="titles">
                        <div>序号</div>
                        <div>No</div>
                    </td>
                    <td class="titles">
                        <div>时间段</div>
                        <div>Time</div>
                    </td>
                    <td class="titles">
                        <div>生产单号</div>
                        <div>Production no</div>
                    </td>
                    <td class="titles">
                        <div>料号</div>
                    </td>
                    <td class="titles">
                        <div>产品名称</div>
                        <div>Product name</div>
                    </td>
                    <td class="titles">
                        <div>计划数量</div>
                        <div>Planned quantity</div>
                    </td>
                    <td class="titles">
                        <div>目标产能</div>
                        <div>The target capacity</div>
                    </td>
                    <td class="titles">
                        <div>实际产能</div>
                        <div>Actual Capacity</div>
                    </td>
                    <td class="titles">
                        <div>产出数量</div>
                        <div>Output</div>
                    </td>
                    <td class="titles">
                        <div>达成率</div>
                        <div>rate of achievement</div>
                    </td>
                    <td class="titles">
                        <div>直通率</div>
                        <div>Rolled Yield</div>
                    </td>
                    <td class="titles">
                        <div>不良原因</div>
                        <div>Primary analysis</div>
                    </td>
                    <td class="titles">
                        <div>改善对策</div>
                        <div>Corrective Actions</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="listBody" ref="listBody">
            <table cellspacing="0">
                <tr v-for="(item,index) in plantList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.timeCycle}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.partNo}}</td>
                    <td :class="item.partDesc&&item.partDesc.length>15?'ptnmSmall':''">{{item.partDesc}}</td>
                    <td>{{item.schQty}}</td>
                    <td>{{item.standardQty}}</td>
                    <td>{{item.actQty}}</td>
                    <td>{{item.outputQty}}</td>
                    <td>{{item.reachRate}}</td>
                    <td>{{item.directRate}}</td>
                    <td>{{item.ngType}}</td>
                    <td>{{item.actions}}</td>
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
      humidityStyleSeen: "none",
    };
  },
  mounted() {
    setInterval(() => {
      this.$refs.listBody.scrollTop = this.$refs.listBody.scrollHeight;
    }, 5000);
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
      console.log(num);
      if (num > 28.5 || num < 20) {
        this.temperStyleSeen = "red";
      } else {
        this.temperStyleSeen = "#33CCFF";
      }
    },
    //判断湿度颜色
    humidityStyle(str) {
       let num = str * 1;
      console.log(num);
      if (num > 75 || num < 35){
        this.humidityStyleSeen = "red";
      } else {
        this.humidityStyleSeen = "#33CCFF";
      }
    }
  }
};
</script>

