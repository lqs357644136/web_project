<template>
  <div class="batchEnter">
    <!-- 批次录入 -->
    <el-form :model="inputs" :inline="true" status-icon :rules="rules" ref="inputs" label-width="100px" class="detectionFrom">
      <el-card :class="formShow?'box-card':'box-card card-body-hidden'">

        <div slot="header" class="clearfix detectionFrom-header">
          <div class="name">批次录入</div>
          <span class="card-hidden-btn" @click="formShow=!formShow">
            <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
          </span>
        </div>
        <div class="detectionFrom-body">
          <el-row :gutter="10" class="detectionFrom-input">
            <el-col :xs="24" :sm="24" :md="8" :lg="6">
              <el-form-item :label="materialNo" class="" prop="materialNo">
                <el-input type="text" v-if="batchType == 0" v-model="inputs.materialNo" auto-complete="off"></el-input>
                <el-input type="text" :disabled="true" v-else v-model="inputs.matRawDesc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="6">
              <el-form-item label="批次号" class="" prop="batchNo">
                <el-input type="text" v-model="inputs.batchNo" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="6">
              <el-form-item label="数量" class="" prop="quantity">
                <el-input-number v-model="inputs.quantity" :min="1" label="请输入数量"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col v-if="batchType == 0" :xs="24" :sm="24" :md="8" :lg="6">
              <el-form-item label="单位">
                <el-select v-model="inputs.unit" placeholder="请选择">
                  <el-option v-for="item in selects.blendUnit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="detectionFrom-btn">
            <el-button type="primary" @click="submitForm('inputs')">提交</el-button>
          </el-form-item>
        </div>

      </el-card>
    </el-form>

    <!-- 批次录入列表 -->
    <el-table class="tableBox" :stripe="true" :data="tableData" border height="100%" style="width: 100%">
      <el-table-column prop="materialNo" :label="materialNo"></el-table-column>
      <el-table-column prop="batchNo" label="批次号"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column prop="createDate" width="250px" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="edit">
            <el-button @click="deteleBatchEnter(scope.$index,scope.row.id)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { panelTitle } from "components";
import url from "api";

export default {
  props: ["batchType"],
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测值"));
      } else {
        callback();
      }
    };
    return {
      formShow: true,
      materialNo: null,
      tableData: null,
      macInfo: {
        plant: "",
        line: "",
        process: ""
      },
      inputs: {
        materialNo: "",
        batchNo: "",
        quantity: 1,
        matRawDesc: "",
        unit: ""
      },
      selects: {
        blendUnit: [{ label: "g", value: "g" }, { label: "kg", value: "kg" }]
      },
      rules: {
        materialNo: [{ validator: checkStep, trigger: "blur" }],
        batchNo: [{ validator: checkStep, trigger: "blur" }],
        quantity: [{ validator: checkStep, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.batchType_init();
  },
  created() {
    this.macInfo_info();
    this.get_batchList();
  },
  components: {
    panelTitle
  },
  comouted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    //获取机器基础信息
    macInfo_info() {
      let macInfo = Window.GETMACINFO();
      this.macInfo.plant = macInfo.plant;
      this.macInfo.line = macInfo.line;
      this.macInfo.process = macInfo.equipNo;
    },
    //初始化判断是原来还是调和
    batchType_init() {
      if (this.batchType == 0) {
        this.materialNo = "粉号";
        this.inputs.unit = this.selects.blendUnit[0].value;
      } else {
        this.materialNo = "原料";
        this.getRawInfo();
      }
    },
    //获取工位对应原料信息
    getRawInfo() {
      this.$get_noToken({
        url: this.$api_baseurl(url.getMaterial),
        params: {
          plant: this.macInfo.plant,
          line: this.macInfo.line,
          process: this.macInfo.process
        }
      }).then(res => {
        if (res.code == 1) {
          this.inputs.materialNo = res.data.matNo;
          this.inputs.unit = res.data.unit;
          this.inputs.matRawDesc =
            res.data.matDesc + "(" + this.inputs.unit + ")";
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //批次录入
    submitForm(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            batchNo: self.inputs.batchNo,
            materialNo: self.inputs.materialNo,
            quantity: self.inputs.quantity,
            type: self.batchType,
            unit:self.inputs.unit
          };
          this.$post_noToken({
            url: this.$api_baseurl(url.terBatch_List_add),
            data: params
          }).then(res => {
            if (res.code == 1) {
              if(this.batchType == 0){
                this.inputs.materialNo = "";
              }
              this.inputs.batchNo = "";
              this.inputs.quantity = "";
              this.get_batchList();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "录入失败,请检查表单"
          });
          return false;
        }
      });
    },
    //删除批次清单
    deteleBatchEnter(index, id) {
      this.$confirm("此操作将删除该批次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$get_noToken({
          url: this.$api_baseurl(url.terBatch_List_delete),
          params: { id: id }
        }).then(res => {
          if (res.code == 1) {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    //获取清单数据
    get_batchList() {
      this.$get_noToken({
        url: this.$api_baseurl(url.terBatch_List),
        params: { type: this.batchType }
      }).then(res => {
        if (res.code == 1) {
          this.tableData = res.data;
        }
      });
    }
  }
};
</script>

