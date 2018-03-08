<template>
  <div class="chartInfo">
    <div class="xChart" ref="xChart"></div>
    <div class="rChart" ref="rChart"></div>
  </div>
</template>

<script>
import echart from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import { mapGetters } from "vuex";
export default {
  name: "chartInfo",
  data() {
    return {
      xchart: null,
      rchart: null,
      xchartData:null,
      rchartData:null,
    };
  },
  computed: {
    ...mapGetters({
      leftSlide: "get_leftSlide_state",
      datas: "get_xbar"
    })
  },
  watch: {
    leftSlide: function() {
      this.xchart.resize();
      this.rchart.resize();
    }
  },
  mounted() {
    this.data_init();
  },
  methods: {
    data_init() {
      //初始化x图数据
      let xObj = {
        xAxis: [],
        data: []
      };
      this.datas.xChart.forEach((item, index) => {
        xObj.xAxis.push(index + 1);
        xObj.data.push(item);
      });
      this.xchartData = xObj;
      //初始化r图数据
      let rObj = {
        xAxis: [],
        data: []
      };
      this.datas.rChart.forEach((item, index) => {
        rObj.xAxis.push(index + 1);
        rObj.data.push(item);
      });
      this.rchartData = rObj;
      this.xChart_init();
      this.rChart_init();
    },
    xChart_init() {
      this.xchart = echart.init(this.$refs.xChart);
      let option = {
        backgroundColor: "#333333",
        title: {
          show: true,
          text: "X-管制图",
          top: "5%",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          data: this.xchartData.xAxis,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: this.xchartData.data,
            type: "line"
          }
        ]
      };
      this.xchart.setOption(option);
    },
    rChart_init() {
      this.rchart = echart.init(this.$refs.rChart);
      let option = {
        backgroundColor: "#333333",
        title: {
          show: true,
          text: "R-管制图",
          top: "5%",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          data: this.rchartData.xAxis,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: this.rchartData.data,
            type: "line"
          }
        ]
      };
      this.rchart.setOption(option);
    }
  }
};
</script>

