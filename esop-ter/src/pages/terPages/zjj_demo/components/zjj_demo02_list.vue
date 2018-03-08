<template>
    <div>
        <el-form class="baseInfo">
            <el-row>
                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                    <el-form-item label="车间人数">
                        <el-input :disabled="true" v-model="baseInfo.plantNum" placeholder="应出勤人数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                    <el-form-item label="出勤人数">
                        <el-input :disabled="true" v-model="baseInfo.onlineNum" placeholder="实际出勤人数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :highlight-current-row="false" :row-class-name="tableRowClassName" :data="list_data" height="100%" border style="width: 100%">
            <el-table-column align="center" prop="line" label="拉线"></el-table-column>
            <el-table-column align="center" prop="orderNo" label="订单编号"></el-table-column>
            <el-table-column align="center" prop="customer" label="客户名称"></el-table-column>
            <el-table-column align="center" prop="ptno" label="产品名称"></el-table-column>
            <el-table-column align="center" prop="planNo" label="计划产量"></el-table-column>
            <el-table-column align="center" prop="realNo" label="实际产量"></el-table-column>
            <el-table-column align="center" prop="reachRate" label="达成率%">
                <template slot-scope="scope">
                    <div v-if="scope.row.reachRate>90" class="reachRate">
                        <div class="rh rhColor01">{{ scope.row.reachRate }}%</div>
                    </div>
                    <div v-else-if="scope.row.reachRate>70&&scope.row.reachRate<=90" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.reachRate }}%</div>
                    </div>
                    <div v-else class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.reachRate }}%</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="lack" label="缺料">
                <template slot-scope="scope">
                    <div v-if="scope.row.lack>30" class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.lack }}</div>
                    </div>
                    <div v-else-if="scope.row.lack>0&&scope.row.lack<=30" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.lack }}</div>
                    </div>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="notGoodlack" label="不良来料">
                <template slot-scope="scope">
                   <div v-if="scope.row.notGoodlack>30" class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.notGoodlack }}</div>
                    </div>
                    <div v-else-if="scope.row.notGoodlack>0&&scope.row.notGoodlack<=30" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.notGoodlack }}</div>
                    </div>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="macError" label="设备故障">
                <template slot-scope="scope">
                   <div v-if="scope.row.macError>30" class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.macError }}</div>
                    </div>
                    <div v-else-if="scope.row.macError>0&&scope.row.macError<=30" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.macError }}</div>
                    </div>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="changeLine" label="转线">
                <template slot-scope="scope">
                   <div v-if="scope.row.changeLine>30" class="reachRate">
                        <div class="rh rhColor03">{{ scope.row.changeLine }}</div>
                    </div>
                    <div v-else-if="scope.row.changeLine>0&&scope.row.changeLine<=30" class="reachRate">
                        <div class="rh rhColor02">{{ scope.row.changeLine }}</div>
                    </div>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="haveBron" label="生成状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.haveBron>30" class="reachRate">
                        <div class="rh rhColor01">生产</div>
                    </div>
                    <div v-else class="reachRate">
                        <div class="rh rhColor03">暂停</div>
                    </div>
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
  name: "zjj_demo02_list",
  props: ["tableList"],
  data() {
    return {
      list_data: this.tableList.list,
      baseInfo: this.tableList.baseInfo
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //   if (row.haveBron > 0.7) {
      //     return "haveBron";
      //   } else if (row.haveBron > 0.3 && row.haveBron <= 0.7) {
      //     return "onBron";
      //   } else {
      //     return "";
      //   }
    }
  }
};
</script>

