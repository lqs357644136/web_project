<template>
  <div>
    <div class="totalChart" ref="totalChart"></div>
    <div class="hourChart" ref="hourChart"></div>
  </div>
</template>

<script>
import Vue from "vue";
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "zjj_demo01_chart",
  data() {
    return {};
  },
  mounted() {
    this.totalChart_init();
    this.hourChart_init();
  },
  methods: {
    totalChart_init() {
      let chart = echart.init(this.$refs.totalChart);
      let option = {
        backgroundColor: "#333333",
       
        xAxis: {
          type: "category",
          data: ["总计划", "总产量"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          top:"22px",
          bottom: "22px"
        },
        series: [
          {
            data: [120, 200],
            type: "bar",
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
                }
              },
              textStyle: {
                color: "#fff"
              }
            },
            barWidth: "60"
          }
        ]
      };
      chart.setOption(option);
    },
    hourChart_init() {
      let chart = echart.init(this.$refs.hourChart);
      let option = {
        backgroundColor: "#333333",
        title: {
          show: false,
          text: "每两小时产量",
          top: "10px",
          left: "center"
        },
        xAxis: {
          type: "category",
          data: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00"
          ],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: "30px",
          right: "30px",
          top:"22px",
          bottom: "22px"
        },
        series: [
          {
            data: [120, 200, 123, 435, 534, 345, 234, 34, 355, 123],
            type: "bar",
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
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

