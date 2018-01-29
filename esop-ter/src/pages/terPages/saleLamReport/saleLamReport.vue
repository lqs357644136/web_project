<template>
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
              <el-col class="dailyFromCol" :xs="24" :sm="24" :md="6" :lg="6">
                <el-form-item label="统计类型" prop="saleType">
                  <el-select v-model="inputs.saleType" placeholder="请选择">
                    <el-option v-for="item in selectOptions.saleOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="dailyFromCol" :xs="24" :sm="24" :md="11" :lg="11">
                <el-form-item label="日期范围" prop="dateRange">
                  <el-date-picker v-model="inputs.dateRange" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " value-format="yyyy-MM-dd" format="yyyy年MM月dd日" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
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
    <saleChart></saleChart>
  </div>
</template>
<script>
import { panelTitle } from "components";
import saleChart from "./saleChart.vue";
import { $dataFormat } from "common/filiter/index.js";
import { getQueryString } from "common/uitl.js";
import url from "api";
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
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      inputs: {
        saleType: "",
        dateRange: []
      },
      selectOptions: {
        saleOption: [
          { label: "车间", value: "plant" },
          { label: "预警类型", value: "ReasonID" }
        ]
      },
      rules: {
        saleType: [{ validator: rulesFn, trigger: "blur" }],
        dateRange: [{ validator: rulesFn, trigger: "blur" }]
      }
    };
  },
  created() {
    // let base_url = this.$route.query.ip
    // this.$store.dispatch('set_host',base_url).then(()=>{
    //   this.sale_init();
    // })
    this.sale_init();
  },
  methods: {
    //点击查询按钮
    findChart(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //通过表单验证
          this.get_chartDate();
        } else {
          return false;
        }
      });
    },
    //初始化默认时间,初始下拉首选项目,首次加载图表数据
    sale_init() {
      let oneDay = 86400000;
      let dayBefore90 = new Date() - oneDay * 90;
      this.inputs.saleType = this.selectOptions.saleOption[1].value;
      this.inputs.dateRange = [new Date(dayBefore90), new Date()];
      this.get_chartDate();
    },
    //获取图表数据
    get_chartDate() {
      let params = {
        Property: this.inputs.saleType,
        beginDate: $dataFormat(this.inputs.dateRange[0], "yyyy-MM-dd hh:mm:ss"),
        endDate: $dataFormat(this.inputs.dateRange[1], "yyyy-MM-dd hh:mm:ss")
        // beginDate: $dataFormat(this.inputs.dateRange[0], "2016-01-01 00:00:00"),
        // endDate: $dataFormat(this.inputs.dateRange[1], "2017-01-01 00:00:00")
      };
      this.$get_noToken({
        url: url.saleLam_get,
        params: params
      }).then(res => {
        if (res.code == "1") {
          if (res.data && res.data.length > 0) {
            //初始化bar图数据
            let chartData = {
              info: null,
              bar: [],
              line: [],
              pie: []
            };
            //总值
            let count = 0;
            for (let obj of res.data) {
              let item = {
                name: obj.propertyValue,
                value: obj.andonCount
              };
              count+=obj.andonCount;
              chartData.bar.push(item);
              //chartData.line.push(item);
              chartData.pie.push(item);
            }
            Array.reverse(chartData.bar);
            //Array.reverse(chartData.line);
            Array.reverse(chartData.pie);
            for(let obj of chartData.bar){
              chartData.line.push(Math.ceil(obj.value/count*100));
            }
            chartData.info = this.inputs;
            this.$store.dispatch("set_salelam_chartdata", chartData);
          } else {
            this.$message.error("没有找到相关数据");
          }
        } else {
          this.$message.error(res.msg);
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

