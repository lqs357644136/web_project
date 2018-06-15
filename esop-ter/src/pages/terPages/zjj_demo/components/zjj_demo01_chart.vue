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
  props: ["chartData"],
  data() {
    return {
      chart01: null,
      chart02: null
    };
  },
  mounted() {
    setTimeout(() => {
    this.totalChart_init();
    this.hourChart_init();
    }, 1000);
  },
  methods: {
    totalChart_init() {
      this.chart01 = echart.init(this.$refs.totalChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        xAxis: {
          type: "category",
          data: this.chartData.chart01.xAxis,
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
            data: this.chartData.chart01.data,
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
      this.chart01.setOption(option);
    },
    hourChart_init() {
      this.chart02 = echart.init(this.$refs.hourChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: false,
          text: "每两小时产量",
          top: "10px",
          left: "center"
        },
        xAxis: {
          type: "category",
          data: this.chartData.chart02.xAxis,
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
            data: this.chartData.chart02.data,
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
      this.chart02.setOption(option);
    }
  }
};
</script>

