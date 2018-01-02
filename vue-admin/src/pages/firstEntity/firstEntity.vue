<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">

      <!-- 不从检查清单跳转过来,都需要填写信息 -->
      <div class="esop-pageloading checkInfoInput" v-if="fromCheckList">
        <div class="msg inputBox">
          <el-form :model="checkInfoInputs" :rules="rules" ref="checkInfoInputs" label-position="right" label-width="50px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>请先录入信息</span>
              </div>
              <div class="">
                <el-row type="flex" justify="center" :gutter="30">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="车间" prop="plantInput">
                      <el-select @change="plantSelectChange()" v-model="checkInfoInputs.plantInput" placeholder="请选择">
                        <el-option v-for="item in selectOptions.plantOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center" :gutter="30">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="制程" prop="lineInput">
                      <el-select @change="lineSelectChange()" v-model="checkInfoInputs.lineInput" placeholder="请选择">
                        <el-option v-for="item in selectOptions.lineOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center" :gutter="30">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="机台" prop="processInput">
                      <el-select v-model="checkInfoInputs.processInput" placeholder="请选择">
                        <el-option v-for="item in selectOptions.processOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-form-item class="subBtn">
                    <el-button type="primary" @click="selectSuccess('checkInfoInputs')">确定</el-button>
                    <el-button>返回</el-button>
                  </el-form-item>
                </el-row>
              </div>
            </el-card>
          </el-form>
        </div>
      </div>

      <check v-else></check>
    </div>
  </div>
</template>
<script>
import check from "components/check/check.vue";
import { panelTitle } from "components";
import { mapGetters } from "vuex";
import url from "api";

export default {
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      //属否需要手动输入下拉数据
      fromCheckList: true,
      //下拉框数据
      selectOptions: {
        plantOption: [],
        lineOption: [],
        processOption: []
      },
      //下拉选择
      checkInfoInputs: {
        plantInput: "",
        lineInput: "",
        processInput: ""
      },
      //下拉验证规则
      rules: {
        plantInput: [{ validator: checkSelect, trigger: "blur" }],
        lineInput: [{ validator: checkSelect, trigger: "blur" }],
        processInput: [{ validator: checkSelect, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      //获取到的检查信息
      checkList: "get_checklist"
    })
  },
  mounted() {
    this.isFromCheckList();
  },
  created() {
  },
  components: {
    panelTitle,
    check
  },
  methods: {
    //下拉数据提交
    selectSuccess(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            plant: this.checkInfoInputs.plantInput,
            line: this.checkInfoInputs.lineInput,
            process: this.checkInfoInputs.processInput,
            type: this.$router.currentRoute.name == "firstEntity" ? "0" : "1"
          };
          this.get_checkInfo(params);
        } else {
          return false;
        }
      });
    },
    //检查是否由检查清单跳转过来
    isFromCheckList() {
      this.$store.dispatch("set_fromchecklist", true);
      if (this.$router.currentRoute.query.fromCheckList&&this.checkList!=null) {//是 
          this.fromCheckList = false;
      } else {//否
        this.$store.dispatch("set_checklist", null);
        this.fromCheckList = true;
        this.getPlantSelect();
      }
    },
    //请求检查页面信息
    get_checkInfo(params) {
      let self = this;
      self.$get({
        url: url.check_info,
        params: params
      }).then(res => {
        if (res.code == 1) {
          self.$store.dispatch("set_checklist", res.data);
          self.fromCheckList = false;
        } else {
          let path = params.type == "0" ? "/firstEntity" : "/tourEntity";
          self.$message.error("没有找到对应检测信息,请手动录入");
          self.fromCheckList = true;
          // if (!self.fromCheckList) {
          //   setTimeout(res => {
          //     self.$router.push(path);
          //   }, 200);
          // }
        }
      });
    },
    //
    //设置下拉信息
    set_optionFam(type, tagArr, data) {
      for (let opt of data) {
        let label = null;
        let value = null;
        if (type == "plant") {
          label = opt.plantdesc;
          value = opt.plant;
        } else if (type == "line") {
          label = opt.linedesc;
          value = opt.line;
        } else if (type == "process") {
          label = opt.processdesc;
          value = opt.process;
        }
        let option = {
          label: label,
          value: value
        };
        tagArr.push(option);
      }
    },
    //车间发生选择
    plantSelectChange() {
      let plant = this.checkInfoInputs.plantInput;
      this.checkInfoInputs.lineInput = "";
      this.checkInfoInputs.processInput = "";
      this.getLineSelect(plant);
    },
    //制程发生选择
    lineSelectChange() {
      let plant = this.checkInfoInputs.plantInput;
      let line = this.checkInfoInputs.lineInput;
      this.checkInfoInputs.processInput = "";
      if (this.checkInfoInputs.lineInput != "") {
        this.getProcessSelect(plant, line);
      }
    },
    //查询车间下拉信息
    getPlantSelect() {
      this.selectOptions.plantOption = [];
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam("plant", this.selectOptions.plantOption, res.data);
        }
      });
    },
    //查询制程下拉信息
    getLineSelect(plant) {
      this.selectOptions.lineOption = [];
      this.$get({
        url: url.check_getLine,
        params: { plant: plant }
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam("line", this.selectOptions.lineOption, res.data);
        }
      });
    },
    //查询机台下拉信息
    getProcessSelect(plant, line) {
      this.selectOptions.processOption = [];
      this.$get({
        url: url.check_getProcess,
        params: { plant: plant, line: line }
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam(
            "process",
            this.selectOptions.processOption,
            res.data
          );
        }
      });
    }
  }
};
</script>

