<template>
    <div class="saleChart">
        <el-row class="saleChartRow" :gutter="20">
            <el-col class="saleChartCol" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="chartView" ref="pala_chart"></div>
            </el-col>
            <el-col class="saleChartCol" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="chartView" ref="pie_chart"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "saleChart",
  props: ["chartData"],
  data() {
    return {
      initPala_chart: null,
      initPie_chart: null
    };
  },
  beforeDestroy() {
    if (!this.initPala_chart || !this.initPie_chart) {
      return;
    }
    this.initPala_chart.dispose();
    this.initPie_chart.dispose();
    this.initPala_chart = null;
    this.initPie_chart = null;
  },
  mounted() {
    this.initPala_chart_init();
    this.initPie_chart_init();
  },
  methods: {
    //初始化帕拉图
    initPala_chart_init() {
      this.initPala_chart = echarts.init(this.$refs.pala_chart);

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        legend: {
          data: ["蒸发量", "降水量", "占比"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "占比",
            interval: 0,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "占比",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };

      this.initPala_chart.setOption(option);
    },
    //初始化饼图
    initPie_chart_init() {
      this.initPala_chart = echarts.init(this.$refs.pie_chart);
    },
    //获取指定属性结果集
    eleResult(arr,eleName){
        let eleArr = [];
        for(obj of arr){
            eleArr.push(obj[eleName]);
        }
        return eleArr;
    }
  }
};
</script>

