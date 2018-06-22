<template>
    <div class="line_canvas">
        <div class="process_boxs">
            <div class="box" :style="'left:'+item.xAxis+'%'" v-for="(item,index) in lineCanvas" :key="index">
                <div class="info" :style="'background-color:'+item.color">{{index+1}}</div>
            </div>
        </div>
        <img class="line_png" :src="lineSrc" alt="生产线图">
    </div>
</template>

<script>
import linePng from "../img/kanban_line.png";
export default {
  name: "line_canvas",
  props: ['lineCanvas'],
  data() {
    return {
      lineSrc: linePng,
      boxs: [
        {
          name: "P01",
          title: "P01",
          color: "red",
          xAxis:0,
        },{
          name: "P02",
          title: "P02",
          color: "red",
          xAxis:2,
        },
        {
          name: "P03",
          title: "P03",
          color: "",
          xAxis:16,
        },{
          name: "P04",
          title: "P04",
          color: "",
          xAxis:22.5,
        },{
          name: "P05",
          title: "P05",
          color: "",
          xAxis:29,
        },{
          name: "P06",
          title: "P06",
          color: "orange",
          xAxis:35.5,
        },{
          name: "P07",
          title: "P07",
          color: "blue",
          xAxis:59,
        },{
          name: "P08",
          title: "P08",
          color: "",
          xAxis:64.5,
        },{
          name: "P09",
          title: "P09",
          color: "red",
          xAxis:76.5,
        },{
          name: "P10",
          title: "P10",
          color: "",
          xAxis:96.5,
        },{
          name: "P11",
          title: "P11",
          color: "",
          xAxis:96.5,
        },{
          name: "P12",
          title: "P12",
          color: "",
          xAxis:96.5,
        },{
          name: "P13",
          title: "P13",
          color: "",
          xAxis:96.5,
        },{
          name: "P14",
          title: "P14",
          color: "",
          xAxis:96.5,
        },
      ]
    };
  }
};
</script>

