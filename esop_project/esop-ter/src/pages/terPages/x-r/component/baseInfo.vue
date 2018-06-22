<template>
  <el-form class="baseInfo">
    <el-row justify="center" :gutter="10">
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="制品名称">
          <el-input :disabled="true" v-model="inputs.ptno" placeholder="制品名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="管制项目">
          <el-input :disabled="true" v-model="inputs.item" placeholder="管制项目"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="测量单位">
          <el-input :disabled="true" v-model="inputs.unit" placeholder="测量单位"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="制造部门">
          <el-input :disabled="true" v-model="inputs.line" placeholder="制造部门"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="机别">
          <el-input :disabled="true" v-model="inputs.plantInput" placeholder="制品名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="测定者">
          <el-input :disabled="true" v-model="inputs.tester" placeholder="测定者"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item label="抽样方法">
          <el-input :disabled="true" v-model="inputs.method" placeholder="抽样方法"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="12">
        <el-form-item label="期间">
          <el-date-picker v-model="inputs.dates" :disabled="true" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <table class="baseInfo-table">
      <tr>
        <td>规格</td>
        <td>标准</td>
        <td>群组数大小</td>
        <td>管制</td>
        <td>X 图</td>
        <td>R 图</td>
      </tr>
      <tr>
        <td>上限USL</td>
        <td>{{inputs.stdUpperLimit}}</td>
        <td>{{inputs.groupSize}}</td>
        <td>上限USL</td>
        <td>{{inputs.xUpperLimit }}</td>
        <td>{{inputs.rUpperLimit }}</td>
      </tr>
      <tr>
        <td>中心限UL</td>
        <td>{{inputs.stdCenterLimit}}</td>
        <td>总组数</td>
        <td>中心限UL</td>
        <td>{{inputs.xCenterLimit}}</td>
        <td>{{inputs.rCenterLimit}}</td>
      </tr>
      <tr>
        <td>下限LSL</td>
        <td>{{inputs.stdLowerLimit}}</td>
        <td>{{inputs.totalGroup}}</td>
        <td>下限LSL</td>
        <td>{{inputs.xLowerLimit}}</td>
        <td>{{inputs.rLowerLimit}}</td>
      </tr>
    </table>
    <table class="baseInfo-table">

    </table>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "baseInfo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      inputs: "get_xbar"
    })
  },
  mounted() {},
  methods: {}
};
</script>