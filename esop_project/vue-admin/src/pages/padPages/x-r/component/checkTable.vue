<template>
  <div class="checkTable">
    <div class="table-row">
      <label for="">
        <div class="text01">{{langPackage.xr_pad.batch}}</div>
        <div class="text02">{{langPackage.xr_pad.id}}</div>
        <div class="line"></div>
      </label>
      <div class="values">
        <span v-for="(itemVal,indexVal) in 20" :key="indexVal">{{indexVal+1}}</span>
      </div>
    </div>
    <div class="table-row" v-for="(item,index) in datas.details" :key="index">
      <label for="">{{index+1}}</label>
      <el-tooltip placement="top">
        <div slot="content">
          <div>∑ X : {{item.sum}}</div>
          <div>{{langPackage.xr_pad.xavg}} : {{item.x}}</div>
          <div>{{langPackage.xr_pad.ravg}} : {{item.r}}</div>
        </div>
        <div class="values">
          <span v-for="(itemVal,indexVal) in item.valueList" :key="indexVal">{{itemVal}}</span>
        </div>
      </el-tooltip>
    </div>
    <div class="table-row">
      <label for="">{{langPackage.xr_pad.xtotal}} </label>
      <div class="values">
        <span>{{datas.sum_x}}</span>
      </div>
      <label for="">{{langPackage.xr_pad.rtotal}}</label>
      <div class="values">
        <span>{{datas.sum_r}}</span>
      </div>
    </div>
    <div class="table-row">
      <label for="">{{langPackage.xr_pad.xavg_total}}</label>
      <div class="values">
        <span>{{datas.avg_x}}</span>
      </div>
      <label for="">{{langPackage.xr_pad.ravg_total}}</label>
      <div class="values">
        <span>{{datas.avg_r}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "checkTable",
  props: ["langPackage"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      datas: "get_xbar"
    })
  }
};
</script>