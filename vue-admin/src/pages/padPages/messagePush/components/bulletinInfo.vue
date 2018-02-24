<template>
    <el-form :model="inputs" :rules="rules" ref="inputs" label-position="right" class="messagePushInfo">
        <el-tabs type="border-card" class="forms">
            <el-tab-pane>
                <span slot="label">文件日期</span>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="16" :lg="12">
                        <el-form-item label="文件名称" prop="fileId">
                            <el-select v-model="inputs.fileId" placeholder="请选择">
                                <el-option v-for="item in selects.fileIdOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="6">
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="inputs.status" placeholder="请选择">
                                <el-option v-for="item in selects.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="16" :lg="12">
                        <el-form-item label="日期" prop="dates">
                            <el-date-picker v-model="inputs.dates" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <el-form-item label="循环">
                            <el-checkbox v-model="inputs.cycleFlagCheck"></el-checkbox>
                            <el-checkbox-group v-if="inputs.cycleFlagCheck" v-model="inputs.cycleList">
                                <el-checkbox label="1">星期一</el-checkbox>
                                <el-checkbox label="2">星期二</el-checkbox>
                                <el-checkbox label="3">星期三</el-checkbox>
                                <el-checkbox label="4">星期四</el-checkbox>
                                <el-checkbox label="5">星期五</el-checkbox>
                                <el-checkbox label="6">星期六</el-checkbox>
                                <el-checkbox label="7">星期日</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <el-form-item label="备注">
                            <el-input v-model="inputs.remark" type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入备注">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">等级条件</span>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="8" :lg="6">
                        <el-form-item label="等级" prop="showLevel">
                            <el-select @change="flagChange()" v-model="inputs.showLevel" placeholder="请选择">
                                <el-option v-for="item in selects.showLevelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <el-form-item class="flagCloud" label="条件">
                            <el-input v-model="inputs.levelCond" type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入条件">
                            </el-input>
                            <el-button @click="dialogVisible=true" type="primary">编辑条件</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-form-item class="subBtn">
            <el-button type="primary" @click="goSubmit('inputs')">保存</el-button>
            <el-button @click="backList()">返回</el-button>
        </el-form-item>
        <levelCond v-if="dialogVisible" :dialogVisible="dialogVisible" :flagType="inputs.showLevel" v-on:flagCondListen="flagCondListen" :flagCond="inputs.levelCond"></levelCond>
    </el-form>
</template>

<script>
import levelCond from "./levelCond.vue";
import { $dataFormat } from "common/filiter/index.js";
import url from "api";
export default {
  name: "messagePushInfo",
  props: ["type", "options", "info"],
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      inputs: {
        fileId: "",
        starttime: "",
        endtime: "",
        levelCond:"",
        showLevel:'',
        status: "",
        id: "",
        remark: "",
        dates: [],
        cryleFlag:0,
        cycleFlagCheck:false,
        cycle: "",
        cycleList: []
      },
      selects: {
        fileIdOptions:this.options.fileIdOptions ,
        showLevelOptions:this.options.showLevelOptions ,
        statusOptions: this.options.statusOptions ,
      },
      editInfo: this.info,
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        fileId: [{ validator: checkSelect, trigger: "blur" }],
        showLevel: [{ validator: checkSelect, trigger: "blur" }],
        status: [{ validator: checkSelect, trigger: "blur" }],
        dates: [{ validator: checkSelect, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.noticeInfo_init();
  },
  methods: {
    //初始化
    noticeInfo_init() {
      //判断是编辑还是新增
      if (this.type == "edit") {
        this.editData_init();
      } else {
        //this.date_init();
      }
    },
    //编辑情况下,初始化数据
    editData_init() {
      this.inputs = this.editInfo;
      if (this.inputs.cycleFlagCheck) {
        this.inputs.cycleList = this.inputs.cycle.split('');
      }
    },
    //时间初始化
    date_init(times) {
      let fmt = "yyyy-MM-dd hh:mm:ss";
      if (times) {
        this.inputs.dates = [
          $dataFormat(new Date(times.starttime), fmt),
          $dataFormat(new Date(times.endtime), fmt)
        ];
      } else {
        let oneDay = 86400000;
        let dayBefore90 = new Date() - oneDay * 366;
        this.inputs.dates = [
          $dataFormat(new Date(dayBefore90), fmt),
          $dataFormat(new Date(), fmt)
        ];
      }
    },
    goSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            fileId: this.inputs.fileId,
            showLevel: this.inputs.showLevel,
            levelCond: this.inputs.levelCond,
            id: this.inputs.id,
            remark: this.inputs.remark,
            status: this.inputs.status,
            startTime: this.inputs.dates[0],
            endTime: this.inputs.dates[1],
            cycleFlag: this.inputs.cycleFlagCheck?1:0,
            cycle: this.inputs.cycleList.toString(),
          };
          console.log(data);
          this.$post({
            url: url.bulletin_add,
            data: data
          }).then(res => {
            if (res.code == 1) {
              this.$message.success(res.msg);
              this.$emit("chioceListen", "list");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    //返回
    backList() {
      this.$emit("chioceListen", "list");
    },
    //监听条件窗口
    flagCondListen(flagCond) {
      this.dialogVisible = false;
      if (flagCond) {
        this.inputs.levelCond = flagCond;
      }
    },
    //等级发生改变
    flagChange() {
      this.inputs.levelCond = "";
    }
  },
  components: {
    levelCond
  }
};
</script>
