<template>
    <el-dialog  :modal="false" :visible.sync="dialogVisible" :before-close="closeDialog" :show-close="false">
        <div v-if=" 'Plant' == flagType " class="mainBody">
            <el-tree :data="plantData" ref="Plant" show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
        </div>
        <div v-if=" 'Line' == flagType " class="mainBody">
            <el-tree :data="lineData" ref="Line" show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
        </div>
        <div v-if=" 'Linegroup' == flagType " class="mainBody">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="车间">
                        <el-select @change="plantSelectChange()" v-model="inputs.plant" placeholder="请选择">
                            <el-option v-for="item in selects.plantOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="制程">
                        <el-select @change="lineSelectChange()" :disabled="inputs.plant.length<=0" v-model="inputs.line" placeholder="请选择">
                            <el-option v-for="item in selects.lineOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tree v-if="inputs.line.length>0&&inputs.plant.length>0" :data="linegroupData" ref="Linegroup" show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
        </div>
        <div v-if=" 'Process' == flagType " class="mainBody">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="车间">
                        <el-select @change="plantSelectChange()" v-model="inputs.plant" placeholder="请选择">
                            <el-option v-for="item in selects.plantOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="制程">
                        <el-select @change="lineSelectChange()" :disabled="inputs.plant.length<=0" v-model="inputs.line" placeholder="请选择">
                            <el-option v-for="item in selects.lineOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tree v-if="inputs.line.length>0&&inputs.plant.length>0" :data="processData" ref="Process" show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="flagCondSub()">确 定</el-button>
            <el-button @click="closeDialog()">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import url from "api";
export default {
  name: "flagCond",
  data() {
    return {
      plantData: [],
      lineData: [],
      linegroupData: [],
      processData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      inputs: {
        flagCond: "",
        plant: "",
        line: ""
      },
      selects: {
        plantOptions: [],
        lineOptions: []
      }
    };
  },
  props: ["dialogVisible", "flagType", "flagCond"],
  mounted() {
    this.init();
  },
  methods: {
    //初始化条件信息
    init() {
      this.chooseFlagType();
    },
    chooseFlagType() {
      if ("Plant" == this.flagType) {
        this.plantData_init();
      } else if ("Line" == this.flagType) {
        this.lineData_init();
      } else if ("Linegroup" == this.flagType) {
        if (this.flagCond.length > 0) {
          this.defaultLinegroup();
        } else {
          this.plantSelectOption_init();
        }
      } else if ("Process" == this.flagType) {
        if (this.flagCond.length > 0) {
          this.defaultLinegroup();
        } else {
          this.plantSelectOption_init();
        }
      }
    },
    //获取车间信息
    plantData_init() {
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        if (res.code == 1) {
          this.plantData = [];
          for (let item of res.data) {
            let obj = {
              id: item.plant,
              label: item.plant + "-" + item.plantdesc
            };
            this.plantData.push(obj);
          }
          if (this.flagCond.length > 0) {
            this.defaultPlant();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //获取线别信息
    lineData_init() {
      this.$get({
        url: url.check_getPlantAndLine
      }).then(res => {
        if (res.code == 1) {
          this.LineData = [];
          for (let item of res.data) {
            let objPlant = {
              id: item.plant,
              label: item.plant + "-" + item.plantdesc
            };
            if (item.children) {
              objPlant.children = [];
              for (let itemChild of item.children) {
                let objLine = {
                  id: itemChild.line,
                  label: itemChild.line + "-" + itemChild.linedesc
                };
                objPlant.children.push(objLine);
              }
              this.lineData.push(objPlant);
            }
          }
          if (this.flagCond.length > 0) {
            this.defaultLine();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //获取组别信息
    linegroup_init() {
      this.$get({
        url: url.check_getGroup,
        params: {
          plant: this.inputs.plant,
          line: this.inputs.line
        }
      }).then(res => {
        if (res.code == 1) {
          this.linegroupData = [];
          for (let item of res.data) {
            let obj = {
              id: item.groupNo,
              label: item.groupNo + "-" + item.groupDesc
            };
            this.linegroupData.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //获取工位信息
    process_init() {
      this.$get({
        url: url.check_getProcess,
        params: {
          plant: this.inputs.plant,
          line: this.inputs.line
        }
      }).then(res => {
        if (res.code == 1) {
          this.processData = [];
          for (let item of res.data) {
            let obj = {
              id: item.process,
              label: item.process + "-" + item.processname
            };
            this.processData.push(obj);
            console.log(this.processData)
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //默认选中车间信息
    defaultPlant() {
      let flagCondArr = this.flagCond.split(",");
      let defaultArr = [];
      for (let item of flagCondArr) {
        defaultArr.push(item);
      }
      this.$refs.Plant.setCheckedKeys(defaultArr);
    },
    //默认选中线别信息
    defaultLine() {
      let flagCondArr = this.flagCond.split(",");
      let defaultArr = [];
      for (let item of flagCondArr) {
        let line = item.split("@")[0];
        defaultArr.push(line);
      }
      this.$nextTick(() => {
        this.$refs.Line.setCheckedKeys(defaultArr);
      });
    },
    //默认选中组别信息
    defaultLinegroup() {
      new Promise((resolve, reject) => {
        resolve(this.plantSelectOption_init());
      })
        .then(res => {
          this.lineSelectOption_init();
        })
        .then(res => {
          let flagCondArr = this.flagCond.split(",");
          let plant = flagCondArr[0].split("@")[2];
          let line = flagCondArr[0].split("@")[1];
          this.inputs.plant = plant;
          this.inputs.line = line;
          this.linegroup_init();
        })
        .then(res => {
          let flagCondArr = this.flagCond.split(",");
          let defaultArr = [];
          for (let item of flagCondArr) {
            let linegroup = item.split("@")[0];
            defaultArr.push(linegroup);
          }
          this.$nextTick(() => {
            this.$refs.Linegroup.setCheckedKeys(defaultArr);
          });
        });
    },

    //默认选中工位信息
    defaultProcess() {
      new Promise((resolve, reject) => {
        resolve(this.plantSelectOption_init());
      })
        .then(res => {
          this.lineSelectOption_init();
        })
        .then(res => {
          let flagCondArr = this.flagCond.split(",");
          let plant = flagCondArr[0].split("@")[2];
          let line = flagCondArr[0].split("@")[1];
          this.inputs.plant = plant;
          this.inputs.line = line;
          this.process_init();
        })
        .then(res => {
          let flagCondArr = this.flagCond.split(",");
          let defaultArr = [];
          for (let item of flagCondArr) {
            let process = item.split("@")[0];
            defaultArr.push(process);
          }
          this.$nextTick(() => {
            this.$refs.Process.setCheckedKeys(defaultArr);
          });
        });
    },
    //初始化车间下拉选项
    plantSelectOption_init() {
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        if (res.code == 1) {
          for (let item of res.data) {
            let obj = {
              value: item.plant,
              label: item.plant + "-" + item.plantdesc
            };
            this.selects.plantOptions.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化制程下拉选项
    lineSelectOption_init() {
      this.$get({
        url: url.check_getLine,
        params: {
          plant: this.inputs.plant
        }
      }).then(res => {
        if (res.code == 1) {
          for (let item of res.data) {
            let obj = {
              value: item.line,
              label: item.line + "-" + item.linedesc
            };
            this.selects.lineOptions.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //车间下拉发生改变
    plantSelectChange() {
      this.selects.lineOptions = [];
      this.inputs.line = "";
      this.lineSelectOption_init();
    },
    //制程下拉发生改变
    lineSelectChange() {
      if (this.flagType == "Linegroup") {
        this.linegroup_init();
      } else {
        this.process_init();
      }
    },
    //确定条件并关闭窗口
    flagCondSub() {
      let flagCond = this.flagCondCreated();
      this.$emit("flagCondListen", flagCond);
    },
    //拼写条件
    flagCondCreated() {
      let flagCond = "";
      if ("Plant" == this.flagType) {
        for (let item of this.$refs.Plant.getCheckedKeys()) {
          flagCond += item + ",";
        }
      } else if ("Line" == this.flagType) {
        for (let item of this.$refs.Line.getCheckedNodes()) {
          if (!item.children) {
            let line = item.id;
            for (let lineDataItem of this.lineData) {
              let plant = lineDataItem.id;
              if (lineDataItem.children) {
                for (let plantChild of lineDataItem.children) {
                  if (plantChild.id == line) {
                    flagCond += line + "@" + plant + ",";
                  }
                }
              }
            }
          }
        }
      } else if ("Linegroup" == this.flagType) {
        if (this.inputs.line.length > 0 && this.inputs.plant.length > 0) {
          for (let item of this.$refs.Linegroup.getCheckedKeys()) {
            flagCond +=
              item + "@" + this.inputs.line + "@" + this.inputs.plant + ",";
          }
        }
      }else if ("Process" == this.flagType) {
        if (this.inputs.line.length > 0 && this.inputs.plant.length > 0) {
          for (let item of this.$refs.Process.getCheckedKeys()) {
            flagCond +=
              item + "@" + this.inputs.line + "@" + this.inputs.plant + ",";
          }
        }
      }
      return flagCond;
    },
    //关闭弹窗
    closeDialog() {
      this.$emit("flagCondListen");
    }
  }
};
</script>