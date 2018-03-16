<template>
  <el-form class="baseInfo">
    <el-row justify="center" :gutter="10">
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.ptno">
          <el-input :disabled="true" v-model="inputs.ptno" :placeholder="langPackage.xr_pad.ptno"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.item">
          <el-input :disabled="true" v-model="inputs.item" :placeholder="langPackage.xr_pad.item"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.unit">
          <el-input :disabled="true" v-model="inputs.unit" :placeholder="langPackage.xr_pad.unit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.line">
          <el-input :disabled="true" v-model="inputs.line" :placeholder="langPackage.xr_pad.line"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.process">
          <el-input :disabled="true" v-model="inputs.plantInput" :placeholder="langPackage.xr_pad.process"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.tester">
          <el-input :disabled="true" v-model="inputs.tester" :placeholder="langPackage.xr_pad.tester"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-form-item :label="langPackage.xr_pad.method">
          <el-input :disabled="true" v-model="inputs.method" :placeholder="langPackage.xr_pad.method"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="12">
        <el-form-item :label="langPackage.xr_pad.dates">
          <el-date-picker v-model="inputs.dates" :disabled="true" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" type="datetimerange" :start-placeholder="langPackage.common_pad.startTime" :end-placeholder="langPackage.common_pad.startTime">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <table class="baseInfo-table">
      <tr>
        <td>{{langPackage.xr_pad.spec}}</td>
        <td>{{langPackage.xr_pad.stand}}</td>
        <td>{{langPackage.xr_pad.groupSize}}</td>
        <td>{{langPackage.xr_pad.control}}</td>
        <td>{{langPackage.xr_pad.xChart}}</td>
        <td>{{langPackage.xr_pad.rChart}}</td>
      </tr>
      <tr>
        <td>{{langPackage.xr_pad.stdUpperLimit}}</td>
        <td>{{inputs.stdUpperLimit}}</td>
        <td>{{inputs.groupSize}}</td>
        <td>{{langPackage.xr_pad.stdUpperLimit}}</td>
        <td>{{inputs.xUpperLimit}}</td>
        <td>{{inputs.rUpperLimit}}</td>
      </tr>
      <tr>
        <td>{{langPackage.xr_pad.stdCenterLimit}}</td>
        <td>{{inputs.stdCenterLimit}}</td>
        <td>{{langPackage.xr_pad.totalGroup}}</td>
        <td>{{langPackage.xr_pad.stdCenterLimit}}</td>
        <td>{{inputs.xCenterLimit}}</td>
        <td>{{inputs.rCenterLimit}}</td>
      </tr>
      <tr>
        <td>{{langPackage.xr_pad.stdLowerLimit}}</td>
        <td>{{inputs.stdLowerLimit}}</td>
        <td>{{inputs.totalGroup}}</td>
        <td>{{langPackage.xr_pad.stdLowerLimit}}</td>
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
  props: ["langPackage"],
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