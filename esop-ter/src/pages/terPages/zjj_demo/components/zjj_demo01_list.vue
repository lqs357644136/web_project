<template>
    <div>
        <el-form class="baseInfo">
            <el-row>
                <el-col :xs="24" :sm="24" :md="7" :lg="7">
                    <el-form-item label="拉线" class="line">
                        <el-input :disabled="true" v-model="tableList.baseInfo.line" placeholder="线别"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7" :lg="7">
                    <el-form-item label="应出勤人数" class="onlineNum">
                        <el-input :disabled="true" v-model="tableList.baseInfo.onlineNum" placeholder="应出勤人数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7" :lg="7">
                    <el-form-item label="实际出勤人数" class="realOnlineNum">
                        <el-input :disabled="true" v-model="tableList.baseInfo.realOnlineNum" placeholder="实际出勤人数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :highlight-current-row="true" :row-class-name="tableRowClassName" :data="tableList.list" border>
            <!-- <el-table :highlight-current-row="true" :row-class-name="tableRowClassName" :data="testList" border> -->
            <el-table-column align="center" width="150rem" prop="orderNo" label="订单编号">
                <template slot-scope="scope">
                    <div class="td_text">{{ scope.row.orderNo }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" width="150rem" prop="customer" label="客户名称">
                <template slot-scope="scope">
                    <div class="td_text">{{ scope.row.customer }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="prno" label="产品名称">
                <template slot-scope="scope">
                    <div class="td_text">{{ scope.row.prno }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" width="100rem" prop="plantNo" label="计划产量"></el-table-column>
            <el-table-column align="center" width="100rem" prop="realNo" label="实际产量"></el-table-column>
            <el-table-column align="center" width="90rem" prop="reachRate" label="达成率%">
                <template slot-scope="scope">
                    <div v-if="scope.row.reachRate>90" class="reachRate">
                        <div class="rh rhColor01">{{ scope.row.reachRate }}%</div>
                    </div>
                    <div v-else-if="scope.row.reachRate>70&&scope.row.reachRate<=90" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.reachRate }}%</div>
                    </div>
                    <div v-else-if="scope.row.reachRate.length<=0" class="reachRate"></div>
                    <div v-else class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.reachRate }}%</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" width="100rem" prop="notGoodNum" label="不良数"></el-table-column>
            <el-table-column align="center" width="90rem" prop="notGood" label="不良率%">
                <template slot-scope="scope">
                    <div v-if="scope.row.reachRate.length<=0"></div>
                    <div v-else>{{ scope.row.notGood }}%</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Table,
  TableColumn,
  Row,
  Col,
  Form,
  FormItem,
  Input
} from "element-ui";
import { $dataFormat } from "common/filiter/index.js";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
/////////////////////////////
export default {
  name: "zjj_demo01_list",
  props: ["tableList"],
  data() {
    return {
      testList: [
        {
          line: 123, //拉线
          orderNo: 20180411001, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        },
        {
          line: 123, //拉线
          orderNo: 123, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        },
        {
          line: 123, //拉线
          orderNo: 123, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        },
        {
          line: 123, //拉线
          orderNo: 123, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        },
        {
          line: 123, //拉线
          orderNo: 123, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        },
        {
          line: 123, //拉线
          orderNo: 123, //订单编号
          customer: 123, //客户名称
          prno: "反倒是看见恢复看见的世界更好地发挥更好", //产品名称
          plantNo: "计划产量", //计划产量
          realNo: "计划产量", //实际产量
          reachRate: "100", //达成率
          notGoodNum: "计划产量", //不良数
          notGood: "100" //不良率
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.haveBron > 0.7) {
        return "haveBron";
      } else if (row.haveBron > 0.3 && row.haveBron <= 0.7) {
        return "onBron";
      } else {
        return "";
      }
    }
  }
};
</script>

