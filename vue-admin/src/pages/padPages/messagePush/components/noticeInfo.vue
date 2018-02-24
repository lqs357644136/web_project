<template>
  <el-form :model="inputs" :rules="rules" ref="inputs" label-position="right" class="messagePushInfo">
    <el-tabs type="border-card" class="forms">
      <el-tab-pane>
        <span slot="label">主题内容</span>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="主题" prop="title">
              <el-input v-model="inputs.title" type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入主题">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="inputs.status" placeholder="请选择">
                <el-option v-for="item in selects.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="18" :lg="12">
            <el-form-item label="日期" prop="dates">
              <el-date-picker v-model="inputs.dates" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="内容" prop="context">
              <el-input v-model="inputs.context" type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容">
              </el-input>
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
            <el-form-item label="等级" prop="flag">
              <el-select  @change="flagChange()" v-model="inputs.flag" placeholder="请选择">
                <el-option v-for="item in selects.flagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item class="flagCloud" label="条件">
              <el-input v-model="inputs.flagCond" type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入条件">
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
    <flagCond v-if="dialogVisible" :dialogVisible="dialogVisible" :flagType="inputs.flag" v-on:flagCondListen="flagCondListen" :flagCond="inputs.flagCond"></flagCond>
  </el-form>
</template>

<script>
import flagCond from "./flagCond.vue";
import { $dataFormat } from "common/filiter/index.js";
import url from "api";
export default {
  name: "messagePushInfo",
  props: ["type", "statusOption", "info"],
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible:false,
      inputs: {
        title: "",
        context: "",
        starttime: "",
        endtime: "",
        flag: "",
        flagCond: "",
        status: "",
        id: "",
        remark: "",
        dates: []
      },
      selects: {
        statusOptions: this.statusOption,
        flagOptions: [
          { label: "Plant-车间", value: "Plant" },
          { label: "Line-线别", value: "Line" },
          { label: "Linegroup-组别", value: "Linegroup" },
          { label: "Process-工位", value: "Process" }
        ]
      },
      editInfo: this.info,
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        title: [{ validator: checkSelect, trigger: "blur" }],
        context: [{ validator: checkSelect, trigger: "blur" }],
        flag: [{ validator: checkSelect, trigger: "blur" }],
        flagCond: [{ validator: checkSelect, trigger: "blur" }],
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
      this.inputs.dates = [this.inputs.starttime, this.inputs.endtime];
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
    //提交
    goSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            context: this.inputs.context,
            flag: this.inputs.flag,
            flagCond: this.inputs.flagCond,
            id: this.inputs.id,
            remark: this.inputs.remark,
            status: this.inputs.status,
            title: this.inputs.title,
            starttime: this.inputs.dates[0],
            endtime: this.inputs.dates[1]
          };
          console.log(data);
          this.$post({
            url: url.notice_add,
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
    flagCondListen(flagCond){
      this.dialogVisible = false;
      if(flagCond){
        this.inputs.flagCond = flagCond;
      }
    },
    //等级发生改变
    flagChange(){
      this.inputs.flagCond = '';
    }
  },
  components: {
    flagCond
  }
};
</script>
