<template>
    <div class="lineHzChart" ref="lineHzChart"></div>
</template>
<script>
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/legendScroll";
export default {
  name: "lineHzChart",
  props: ["chartData"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.lineHzChart_init();
    }, 1000);
  },
  methods: {
    lineHzChart_init() {
      this.chart = echart.init(this.$refs.lineHzChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: true,
          text: "计划达成率",
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
          show: false,
          orient: "vertical",
          top: "50%",
          right: "1%",
          data: ["计划达成率"],
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
              fontSize: 12,
              rotate: 35
            },
            axisTick: {
              alignWithLabel: true
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
              fontSize: 14,
              formatter: "{value} %"
            },
            splitLine: {
              show: false
            },
            max: 100,
            min: 0
          }
        ],
        series: [
          {
            name: "计划达成率",
            type: "bar",
            data: this.chartData.data,
            label: {
              normal: {
                show: true,
                position: "top",
                fontWeight: 100,
                fontSize: 14,
                color: "#ffffff",
                fontWeight: 600,
                formatter: function(e) {
                  if (e.data > 0) {
                    return e.data + "%";
                  } else {
                    return "";
                  }
                }
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
            barWidth: "20px"
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>

