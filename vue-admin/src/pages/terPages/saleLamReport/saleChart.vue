<template>
  <div class="saleChart">
    <el-row class="saleChartRow" :gutter="20">
      <el-col class="saleChartCol" :xs="24" :sm="24" :md="12" :lg="12">
        <div class="chartView" ref="pala_chart"></div>
      </el-col>
      <el-col class="saleChartCol" :xs="24" :sm="24" :md="12" :lg="12">
        <div class="chartView" ref="pie_chart"></div>
      </el-col>
    </el-row>
    <div class="noData" v-if="hasData">
      <span>没有查到相关数据</span>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters } from "vuex";
export default {
  name: "saleChart",
  data() {
    return {
      initPala_chart: null,
      initPie_chart: null
    };
  },
  beforeDestroy() {
    if (!this.initPala_chart || !this.initPie_chart) {
      return;
    }
    this.initPala_chart.dispose();
    this.initPie_chart.dispose();
    this.initPala_chart = null;
    this.initPie_chart = null;
  },
  computed: {
    ...mapGetters({
      chartData: "get_salelam_chartdata"
    }),
    hasData: {
      get: function() {
        return this.chartData ? false : true;
      }
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.set_pala_chart();
        this.set_pie_chart();
      }
    }
  },
  mounted() {
    this.initPala_chart_init();
    this.initPie_chart_init();
  },
  methods: {
    //初始化帕拉图
    initPala_chart_init() {
      this.initPala_chart = echarts.init(this.$refs.pala_chart);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "纪录数",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "占比",
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ]
      };

      this.initPala_chart.setOption(option);
    },
    //初始化饼图
    initPie_chart_init() {
      this.initPie_chart = echarts.init(this.$refs.pie_chart);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        }
      };

      this.initPie_chart.setOption(option);
    },
    //刷新PALA图数据
    set_pala_chart() {
      let saleType = this.chartData.info.saleType == "plant" ? "车间" : "预警类型";
      let option = {
        legend: {
          data: [saleType, "占比"]
        },
        xAxis: [
          {
            type: "category",
            data: this.eleResult(this.chartData.bar, "name"),
            axisLabel: {}
          }
        ],
        series: [
          {
            name: saleType,
            type: "bar",
            data: this.eleResult(this.chartData.bar, "value"),
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = ["#1d90e6"];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            name: "占比",
            type: "line",
            min: 0,
            max: 100,
            yAxisIndex: 1,
            data: this.chartData.line
          }
        ]
      };
      this.initPala_chart.setOption(option);
    },
    //刷新PIE图数据
    set_pie_chart() {
      let saleType = this.chartData.info.saleType == "plant" ? "车间" : "预警类型";
      let option = {
        legend: {
          orient: "vertical",
          left: "left",
          data: this.eleResult(this.chartData.pie, "name")
        },
        series: [
          {
            name: saleType,
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.chartData.pie,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.initPie_chart.setOption(option);
    },
    //获取指定属性结果集
    eleResult(arr, eleName) {
      let eleArr = [];
      for (let obj of arr) {
        eleArr.push(obj[eleName]);
      }
      return eleArr;
    }
  }
};
</script>

