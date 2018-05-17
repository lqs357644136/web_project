<template>
    <div class="andonChart">
        <phoneHeader :back="true" title="安灯图表"></phoneHeader>
        <div class="module-body">
            <div class="warp">
               <searchInfo></searchInfo>
                <div class="chart bar" ref="barChart"></div>
                <div class="chart pie" ref="pieChart"></div>
            </div>
        </div>
    </div>
</template>
<script>

import phoneHeader from "components/phoneMainContent/header.vue";
import searchInfo from './componets/andonChart/searchInfo.vue';
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/legendScroll";
export default {
  name: "andonChart",
  data() {
    return {
      barChart: null,
      pieChart: null,
    };
  },
  beforeDestroy() {
    if (!this.barChart || !this.pieChart) {
      return;
    }
    this.barChart.dispose();
    this.pieChart.dispose();
    this.barChart = null;
    this.pieChart = null;
  },
  mounted() {
    this.barChart_init();
    this.pieChart_init();
  },
  methods: {
    //时间选择
    //柱状图初始化
    barChart_init() {
      this.barChart = echart.init(this.$refs.barChart);
      let option = {
        backgroundColor: "#333333",
        animation: false,
        title: {
          show: true,
          text: "异常发生数",
          top: "5px",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: "18"
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
            data: ["a", "b", "c", "d", "e", "f", "g", "h"],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              fontSize: 12,
              rotate: 0
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
              formatter: "{value}"
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "计划达成率",
            type: "bar",
            data: [123, 234, 345, 456, 345, 234, 123, 234],
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

      this.barChart.setOption(option);
    },
    //饼图初始化
    pieChart_init() {
      this.pieChart = echart.init(this.$refs.pieChart);
      let option = {};
      this.pieChart.setOption(option);
    }
  },
  components: {
    phoneHeader,
    searchInfo
  }
};
</script>
