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
  data() {
    return {};
  },
  mounted() {
    this.plantChart_init();
  },
  methods: {
    plantChart_init() {
      let chart = echart.init(this.$refs.plantChart);
      let option = {
        backgroundColor: "#333333",
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
            data: ["L1线", "L2线", "L3线", "L4线", "L5线", "L6线", "L7线"],
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
            data: [320, 332, 301, 334, 390, 330, 320],
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
            data: [120, 132, 101, 134, 90, 230, 210],
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
      chart.setOption(option);
    }
  }
};
</script>

