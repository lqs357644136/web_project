<template>
  <div class="panel">
    <panel-title :title="langPackage.menu_pad.specification"></panel-title>
    <div v-if="!xbarVisible" class="panel-body specification">
      <!-- 规范查询 -->
      <el-form :model="searchInput" :inline="true" status-icon :rules="rules" ref="inputs" class="specForm">
        <el-row class="selectForm" :gutter="10">
          <!-- <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item class="plant" :label="langPackage.common.plant" prop="plantInput">
              <el-select @change="plantSelectChange()" v-model="searchInput.plantInput" :placeholder="langPackage.common_pad.choose">
                <el-option v-for="item in searchSelect.plantOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-form-item class="ptno" :label="langPackage.common.ptno" prop="ptnoInput">
              <el-select @change="selectChange()" v-model="searchInput.ptnoInput" :placeholder="langPackage.common.choose">
                <el-option v-for="item in searchSelect.ptnoOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-form-item class="line" :label="langPackage.common.line" prop="lineInput">
              <el-select @change="selectChange()" v-model="searchInput.lineInput" :placeholder="langPackage.common.choose">
                <el-option v-for="item in searchSelect.lineOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 规范列表 -->
      <el-table :stripe="true" class="specTable" :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="ptno" :label="langPackage.common.ptno"></el-table-column>
        <el-table-column prop="line" :label="langPackage.common.line"></el-table-column>
        <el-table-column prop="item" :label="langPackage.specification_pad.item"></el-table-column>
        <el-table-column prop="itemValue" :label="langPackage.specification_pad.itemNo"></el-table-column>
        <el-table-column prop="method" :label="langPackage.specification_pad.method"></el-table-column>
        <el-table-column :label="langPackage.common_pad.operate" width="200px">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="getInfo(scope.$index,scope.row)" type="primary">{{langPackage.common_pad.info}}</el-button>
              <el-button v-if="scope.row.xBar=='Y'&&scope.row.specificationType==0" @click="getXbar(scope.$index,scope.row)" type="success">{{langPackage.specification_pad.xbar}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- xbar查询条件 -->
      <el-dialog :modal="false" :title="langPackage.specification_pad.searchxbarDialog_title" class="xbarDialog" :visible.sync="xbarSearchDialog" width="50%">
        <span>
          <el-select v-model="searchXbarInput.processInput" :placeholder="langPackage.specification_pad.chooseProssce">
            <el-option v-for="item in searchSelect.processOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model="searchXbarInput.dates" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" type="datetimerange" :start-placeholder="langPackage.common_pad.startTime" :end-placeholder="langPackage.common_pad.startTime">
          </el-date-picker>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xbarSearch()" type="primary">{{langPackage.common_pad.enter}}</el-button>
          <el-button @click="xbarSearchDialog = false">{{langPackage.common_pad.cancel}}</el-button>
        </span>
      </el-dialog>

      <!-- 规范详情  -->
      <el-dialog :modal="false" class="specInfo" :show-close="false" :visible.sync="dialogFormVisible">
        <el-collapse accordion>
          <el-collapse-item class="normal" :title="langPackage.specification_pad.base" name="1">
            <p>
              <span class="name">{{langPackage.common.ptno}}</span>
              <span class="value">{{info.ptno}}</span>
            </p>
            <p>
              <span class="name">{{langPackage.common.line}}</span>
              <span class="value">{{info.line}}</span>
            </p>
            <p>
              <span class="name">{{langPackage.specification_pad.item}}</span>
              <span class="value">{{info.item}}</span>
            </p>
            <p>
              <span class="name">{{langPackage.specification_pad.itemNo}}</span>
              <span class="value">{{info.itemValue}}</span>
            </p>
          </el-collapse-item>
          <el-collapse-item :title="langPackage.specification_pad.rule" name="2">
            <p>
              <span class="name">{{langPackage.specification_pad.method}}</span>
              <span class="value">{{info.method}}</span>
            </p>
            <p v-if="info.specificationType!='2'">
              <span class="name">{{langPackage.specification_pad.inspectSpecification}}</span>
              <span class="value">{{info.inspectSpecification}}</span>
            </p>
            <p v-if="info.specificationType!='2'">
              <span class="name">{{langPackage.specification_pad.specificationType}}</span>
              <span class="value">{{info.specificationType=='0'?langPackage.specification_pad.range:langPackage.specification_pad.tolerance}}</span>
            </p>
            <p>
              <span class="name">{{langPackage.specification_pad.itemNo}}</span>
              <span class="value">{{info.itemValue}}</span>
            </p>
          </el-collapse-item>
          <el-collapse-item class="type" :title="langPackage.specification_pad.specType" name="3">
            <div class="typeItem">
              <span class="item-name">{{langPackage.specification_pad.firstChek}}:</span>
              <i v-if="info.selfInspect=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
            <div class="typeItem">
              <span class="item-name">{{langPackage.specification_pad.tourCheck}}:</span>
              <i v-if="info.routingInspect=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
            <div class="typeItem">
              <span class="item-name">{{langPackage.specification_pad.xbar}}:</span>
              <i v-if="info.xBar=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">{{langPackage.common_pad.enter}}</el-button>
        </div>
      </el-dialog>
    </div>
    <xr v-else v-on:xBarChooseListen="xBarChooseListen" :xBarInfo="xBarInfo" class="panel-body"></xr>
  </div>

</template>


<script>
import { mapGetters } from "vuex";
import { panelTitle } from "components";
import xr from "pages/padPages/x-r/x-r.vue";
import url from "api";

export default {
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.langPackage.common_pad.pleaseChoose));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      xbarSearchDialog: false,
      xbarVisible: false,
      xBarInfo: null,
      searchInput: {
        plantInput: "",
        lineInput: "",
        ptnoInput: ""
      },
      searchSelect: {
        plantOption: [],
        lineOption: [],
        ptnoOption: [],
        processOption: []
      },
      searchXbarInput: {
        id: "",
        processInput: "",
        line: "",
        dates: []
      },
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        lineInput: [{ validator: checkStep, trigger: "blur" }],
        ptnoInput: [{ validator: checkStep, trigger: "blur" }]
      },
      tableData: [],
      info: {
        ptno: "",
        line: "",
        item: "",
        itemValue: "",
        method: "",
        inspectSpecification: "",
        specificationType: "",
        upperLimit: "",
        lowerLimit: "",
        stdValue: "",
        stdValueMinus: "",
        stdValuePlus: "",
        symbol: "",
        selfInspect: "",
        routingInspect: "",
        xBar: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      langPackage: "get_langpackage"
    })
  },
  components: {
    panelTitle,
    xr
  },
  created() {
    this.spec_init();
  },
  methods: {
    spec_init() {
      this.get_ptnoSelect();
      this.get_lineSelect();
    },
    //下拉发生选择
    selectChange(){
      this.get_specList();
    },
    //获取制程下拉数据
    get_lineSelect() {
      this.searchSelect.lineOption = [];
      this.$get({
        url: url.check_getLine
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.line + "-" + opt.linedesc,
              value: opt.line
            };
            this.searchSelect.lineOption.push(option);
          }
        }
      });
    },
    //获取产品编号下拉数据
    get_ptnoSelect() {
      this.searchSelect.ptnoOption = [];
      this.$get({
        url: url.check_getPartno
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.ptno + "-" + opt.ptnm,
              value: opt.ptno
            };
            this.searchSelect.ptnoOption.push(option);
          }
          if (this.searchSelect.ptnoOption[0]) {
            this.searchInput.ptnoInput = this.searchSelect.ptnoOption[0].value;
            this.get_specList();
          }
        }
      });
    },
    //获取列表
    get_specList() {
      let params = {
        line: this.searchInput.lineInput,
        ptno: this.searchInput.ptnoInput
      };
      this.$get_noToken({
        url: url.inspectSpec_list,
        params: params
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.tableData = [];
          for (let item of res.data) {
            let obj = {
              ptno: item.ptno, //产品编号
              line: item.line, //制程
              item: item.item.description, //项目名称
              itemValue: item.itemValue, //项目代号
              method: item.method.description, //检验方法
              inspectSpecification: item.inspectSpecification, //检验规格
              specificationType: item.specificationType, //规格类型
              upperLimit: item.upperLimit, //上限
              lowerLimit: item.lowerLimit, //下限
              stdValue: item.stdValue, //标准值
              stdValueMinus: item.stdValueMinus, //标准值-
              stdValuePlus: item.stdValuePlus, //标准值+
              symbol: item.symbol, //符号
              selfInspect: item.selfInspect, //自检
              routingInspect: item.routingInspect, //巡检
              xBar: item.xBar, //x-bar
              id: item.id //id
            };
            this.tableData.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化工位
    get_processSelect() {
      this.searchSelect.processOption = [];
      this.$get({
        url: url.check_getProcess,
        params: {
          line: this.searchXbarInput.line
        }
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.process + "-" + opt.processname,
              value: opt.process
            };
            this.searchSelect.processOption.push(option);
          }
        }
      });
    },
    //按条件查询列表
    search(formName) {
      this.get_specList();
    },
    //显示详情
    getInfo(index, info) {
      this.info = info;
      this.dialogFormVisible = true;
    },
    //显示Xbar查询菜单
    getXbar(index, row) {
      this.searchXbarInput.id = row.id;
      this.searchXbarInput.line = row.line;
      this.get_processSelect();
      this.xbarSearchDialog = true;
    },
    //查询xBar
    xbarSearch() {
      let params = {
        id: this.searchXbarInput.id
        // process:this.searchXbarInput.processInpu,
        // startTime:this.searchXbarInput.dates[0],
        //endTime:this.searchXbarInput.dates[0],
      };
      this.$get({
        url: url.get_xBar,
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.xBarInfo = res.data;
          this.$store.dispatch("set_xbar", res.data);
          this.xbarSearchDialog = false;
          this.xbarVisible = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //监听xBar
    xBarChooseListen() {
      this.xbarVisible = false;
    }
  }
};
</script>

