<template>
  <div class="checkTable">
    <div class="table-row">
      <label for="">
        <div class="text01">批次</div>
        <div class="text02">序号</div>
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
          <div>X平均值 : {{item.x}}</div>
          <div>R平均值 : {{item.r}}</div>
        </div>
        <div class="values">
          <span v-for="(itemVal,indexVal) in item.valueList" :key="indexVal">{{itemVal}}</span>
        </div>
      </el-tooltip>
    </div>
    <div class="table-row">
      <label for="">∑X总和</label>
      <div class="values">
        <span>{{datas.sum_x}}</span>
      </div>
      <label for="">∑R总和</label>
      <div class="values">
        <span>{{datas.sum_r}}</span>
      </div>
    </div>
    <div class="table-row">
      <label for="">X平均</label>
      <div class="values">
        <span>{{datas.avg_x}}</span>
      </div>
      <label for="">R平均</label>
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