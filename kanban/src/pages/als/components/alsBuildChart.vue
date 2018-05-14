<template>
  <div class="alsBuildChart" ref="alsBuildChart"></div>
</template>

<script>
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/legendScroll";
export default {
  name: "alsBuildChart",
  props: ["chartData"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.alsBuildChart_init();
    }, 1000);
  },
  methods: {
    alsBuildChart_init() {
      this.chart = echart.init(this.$refs.alsBuildChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: true,
          text: "每时段产出量",
          top: "2px",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: "26"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: "10px",
          data: ["计划", "实际"],
          right: "2%",
          top: "center",
          orient: "vertical",
          textStyle: {
            color: "#fff",
            fontSize: "16"
          }
        },
        grid: {
          left: "10%",
          right: "10%",
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
            },

            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "计划",
            type: "bar",
            data: this.chartData.data.plan,
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
          },
          {
            name: "实际",
            type: "bar",
            data: this.chartData.data.real,
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
      this.chart.setOption(option);
    }
  }
};
</script>

