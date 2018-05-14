<template>
  <div class="buildHzChart">
    <div class="chart" ref="buildHzChart01"></div>
    <div class="chart" ref="buildHzChart02"></div>
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
      chart01: null,
      chart02: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.buildHzChart_init01();
      this.buildHzChart_init02();
    }, 1000);
  },
  methods: {
    buildHzChart_init01() {
      this.chart01 = echart.init(this.$refs.buildHzChart01);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: true,
          text: "总产出",
          top:'2px',
          left:'center',
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
          show: false,
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
          left: "5%",
          right: "5%",
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
            name: "总产出",
            type: "bar",
            data: this.chartData.data01,
            label: {
              normal: {
                show: true,
                position: "top",
                fontWeight: 100,
                fontSize: 20,
                fontWeight:600,
                color:'white',
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
      this.chart01.setOption(option);
    },
    buildHzChart_init02() {
      this.chart01 = echart.init(this.$refs.buildHzChart02);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: true,
          text: "总达成率",
          top:'2px',
          left:'center',
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
          show: false,
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
          left: "5%",
          right: "5%",
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
            min: 0,
            max: 100,
            axisLabel: {
              fontSize: 26,
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: "总达成率",
            type: "bar",
            data: this.chartData.data02,
            label: {
              normal: {
                show: true,
                position: "top",
                fontWeight: 100,
                fontSize: 20,
                fontWeight:600,
                color:'white',
                formatter: '{c}%'
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
