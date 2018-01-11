<template>
    <div class="panel">
        <panel-title :center="true" :title="$route.meta.title"></panel-title>
        <div class="panel-body">
            <div class="saleLamReport">

                <!-- 条件查询 -->
                <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" class="saleLamFrom">
                    <el-card class="box-card dailywork-INfo">
                        <div slot="header" class="clearfix">
                            <span>报表查找</span>
                        </div>
                        <div class="dailywork-body">
                            <div class="dailyFrom">
                                <el-row class="dailyFromRow" :gutter="20">
                                    <el-col class="dailyFromCol" :xs="24" :sm="24" :md="8" :lg="8">
                                        <el-form-item label="安灯类型" prop="saleType">
                                            <el-select v-model="inputs.saleType" placeholder="请选择">
                                                <el-option v-for="item in selectOptions.saleOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="dailyFromCol" :xs="24" :sm="24" :md="11" :lg="11">
                                        <el-form-item label="日期范围" prop="dateRange">
                                            <el-date-picker v-model="inputs.dateRange" range-separator=" - " format="yyyy年MM月dd日" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="dailyBtn">
                                <el-form-item class="subBtn">
                                    <el-button @click="findChart('inputs')" type="primary">
                                        <i class="fa fa-search"></i>
                                        <span> 查询</span>
                                    </el-button>
                                </el-form-item>
                            </div>
                        </div>
                    </el-card>
                </el-form>
                <!-- 图表 -->
                <saleChart :chartData="chartData"></saleChart>
            </div>
        </div>
    </div>
</template>
<script>
import { panelTitle } from "components";
import saleChart from "./saleChart.vue";
export default {
  name: "saleLamReport",
  data() {
    var rulesFn = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写数据"));
      } else {
        callback();
      }
    };
    return {
      chartData: {
          pala:{
              bar:[
                {name:'类型1',value:10},
                {name:'类型2',value:20},
                {name:'类型3',value:30},
                {name:'类型4',value:40},
              ],
              line:[0.25,0.5,0.75,1],
          },
          pie:[
              {name:'类型1',value:10},
              {name:'类型2',value:20},
              {name:'类型3',value:30},
              {name:'类型4',value:40},
          ]
      },
      inputs: {
        saleType: "",
        dateRange: ""
      },
      selectOptions: {
        saleOption: [
          { label: "车间", value: 'plant' },
          { label: "预警类型", value: 'ReasonID' },
        ]
      },
      rules: {
        saleType: [{ validator: rulesFn, trigger: "blur" }],
        dateRange: [{ validator: rulesFn, trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击查询按钮
    findChart(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //通过表单验证
        } else {
          return false;
        }
      });
    }
  },
  components: {
    panelTitle,
    saleChart
  }
};
</script>

