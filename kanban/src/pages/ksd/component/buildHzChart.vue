<template>
    <div class="buildHzChart" ref="buildHzChart">

    </div>
</template>

<script>
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/legendScroll";
export default {
  name: "buildHzChart",
  props: ["chartData"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.buildHzChart_init();
    }, 1000);
  },
  methods: {
    buildHzChart_init() {
      this.chart01 = echart.init(this.$refs.buildHzChart);
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
          orient: "vertical",
          top: "50%",
          right: "1%",
          data: ["计划产量", "实际产量"],
          textStyle: {
            color: "#fff",
            fontSize: "26"
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
            //data: this.chartData.xAxis,
            data: ["1线", "2线", "3线", "4线"],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              fontSize: 26
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
            axisLabel: {
              fontSize: 26
            }
          }
        ],
        series: [
          {
            name: "计划产量",
            type: "bar",
            //data: this.chartData.planNum,
            data: [123, 234, 345, 456],
            label: {
              normal: {
                show: true,
                position: "insideTop",
                fontWeight: 100,
                fontSize: 20
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
            }
            //barWidth: "40"
          },
          {
            name: "实际产量",
            type: "bar",
            //data: this.chartData.realNum,
            data: [234, 345, 456, 567],
            label: {
              normal: {
                show: true,
                position: "insideTop",
                fontWeight: 100,
                fontSize: 20
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
              },
            }
            //barWidth: "40"
          }
        ]
      };
      this.chart01.setOption(option);
    }
  }
};
</script>
