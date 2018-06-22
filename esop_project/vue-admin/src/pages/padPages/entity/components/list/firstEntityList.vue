<template>
    <div class="entityList">
        <!-- <el-form :model="checkInfoInputs" :inline="true" status-icon :rules="rules" ref="inputs" class="listForm">
            <el-row class="selectForm">
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="车间" prop="plantInput">
                        <el-select @change="plantSelectChange()" v-model="checkInfoInputs.plantInput" placeholder="请选择车间">
                            <el-option v-for="item in selectOptions.plantOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="制程" prop="lineInput">
                        <el-select @change="lineSelectChange()" v-model="checkInfoInputs.lineInput" placeholder="请选择线程">
                            <el-option v-for="item in selectOptions.lineOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="机台" prop="processInput">
                        <el-select v-model="checkInfoInputs.processInput" placeholder="请选择机台">
                            <el-option v-for="item in selectOptions.processOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="subBtn">
                <el-button type="primary" @click="search()">查询</el-button>
            </div>
        </el-form> -->
        <el-table class="prodschTable" :stripe="true" :data="tableList" height="100%" border style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="工单编号">
                            <span class="listInfoContent">{{ props.row.orderNo }}</span>
                        </el-form-item>
                        <el-form-item label="产品编号">
                            <span class="listInfoContent">{{ props.row.partNo }}</span>
                        </el-form-item>
                        <el-form-item label="计划开始">
                            <span class="listInfoContent">{{ props.row.schStart | dataFormat('yyyy-MM-dd')}}</span>
                        </el-form-item>
                        <el-form-item label="计划结束">
                            <span class="listInfoContent">{{ props.row.schEnd | dataFormat('yyyy-MM-dd')}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="plant" label="车间"></el-table-column>
            <el-table-column prop="partNo" label="产品"></el-table-column>
            <el-table-column prop="process" label="机台"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <div class="edit">
                        <el-button @click="getCheckInfo(scope.row)" type="primary">检验</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import url from "api";
export default {
  name: "search",
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        s;
        callback();
      }
    };
    return {
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
      //排程列表
      tableList: [],
      //下拉验证规则
      rules: {
        plantInput: [{ validator: checkSelect, trigger: "blur" }],
        lineInput: [{ validator: checkSelect, trigger: "blur" }],
        processInput: [{ validator: checkSelect, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getPlantSelect();
    this.tableList_init();
  },
  methods: {
    //获取正在执行的生产排程
    tableList_init() {
      let params = {
        plant: this.checkInfoInputs.plantInput,
        line: this.checkInfoInputs.lineInput,
        process: this.checkInfoInputs.processInput
      };
      this.$get({
        url: url.getProdSchedule,
        params: params
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.tableList = [];
          for (let item of res.data) {
            this.tableList.push(item);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //筛选查询
    search() {
      this.tableList_init();
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
        console.log(res);
        if (res.code == 1) {
          this.set_optionFam(
            "process",
            this.selectOptions.processOption,
            res.data
          );
        }
      });
    },
    //设置下拉信息
    set_optionFam(type, tagArr, data) {
      for (let opt of data) {
        let label = null;
        let value = null;
        if (type == "plant") {
          label = opt.plant + "-" + opt.plantdesc;
          value = opt.plant;
        } else if (type == "line") {
          label = opt.line + "-" + opt.linedesc;
          value = opt.line;
        } else if (type == "process") {
          label = opt.process + "-" + opt.processname;
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
    //获取检验详细信息
    getCheckInfo(info) {
      let params = {
        id: info.id
      };
      this.$get({
        url: url.firstCheck_info,
        params: params
      }).then(res => {
        if (res.code == 1) {
          console.log(res)
          this.$store.dispatch("set_checklist", res.data);
          this.$emit("searchListen", false);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
