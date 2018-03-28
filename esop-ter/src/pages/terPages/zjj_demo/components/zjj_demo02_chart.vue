<template>
  <div class="plantChart" ref="plantChart"></div>
</template>

<script>
import Vue from "vue";
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/legendScroll";
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "zjj_demo02_chart",
  props: ["chartData"],
  data() {
    return {
      chart01: null
    };
  },
 
  mounted() {
    setTimeout(() => {
      this.plantChart_init();
    }, 1000);
  },
  methods: {
    reLoadChart() {},
    plantChart_init() {
      this.chart01 = echart.init(this.$refs.plantChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: "10px",
          data: ["计划产量", "实际产量"],
          textStyle: {
            color: "#fff",
            fontSize: "16"
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.chartData.xAxis,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "计划产量",
            type: "bar",
            data: this.chartData.planNum,
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = ["#3a8ee6"];
                  return colorList[params.dataIndex];
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            barWidth: "40"
          },
          {
            name: "实际产量",
            type: "bar",
            data: this.chartData.realNum,
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = ["#67c23a"];
                  return colorList[params.dataIndex];
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            barWidth: "40"
          }
        ]
      };
      this.chart01.setOption(option);
    }
  }
};
</script>

