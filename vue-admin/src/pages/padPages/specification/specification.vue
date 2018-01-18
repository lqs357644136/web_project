<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body specification">
      <!-- 规范查询 -->
      <el-form :model="searchInput" :inline="true" status-icon :rules="rules" ref="inputs" class="specForm">
        <el-row class="selectForm" :gutter="10">
          <el-col :xs="24" :sm="24" :md="7" :lg="6">
            <el-form-item class="plant" label="车间" prop="plantInput">
              <el-select @change="plantSelectChange()" v-model="searchInput.plantInput" placeholder="请选择">
                <el-option v-for="item in searchSelect.plantOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="7" :lg="6">
            <el-form-item class="line" label="制程" prop="lineInput">
              <el-select v-model="searchInput.lineInput" placeholder="请选择">
                <el-option v-for="item in searchSelect.lineOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item class="ptno" label="产品编号" prop="ptnoInput">
              <el-select v-model="searchInput.ptnoInput" placeholder="请选择">
                <el-option v-for="item in searchSelect.ptnoOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="subBtn">
          <el-button type="primary" @click="search('searchInput')">查询</el-button>
        </div>
      </el-form>

      <!-- 规范列表 -->
      <el-table :stripe="true" class="" :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="ptno" label="产品编号"></el-table-column>
        <el-table-column prop="line" label="制程"></el-table-column>
        <el-table-column prop="item" label="项目名称"></el-table-column>
        <el-table-column prop="itemValue" label="项目代号"></el-table-column>
        <el-table-column prop="method" label="检验方法"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="getInfo(scope.$index,scope.row)" type="primary">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog class="specInfo" :show-close="false" :visible.sync="dialogFormVisible">
        <el-collapse accordion>
          <el-collapse-item class="normal" title="基础信息" name="1">
            <p><span class="name">产品编号</span><span class="value">{{info.ptno}}</span></p>
            <p><span class="name">制程</span><span class="value">{{info.line}}</span></p>
            <p><span class="name">项目名称</span><span class="value">{{info.item}}</span></p>
            <p><span class="name">项目代号</span><span class="value">{{info.itemValue}}</span></p>
          </el-collapse-item>
          <el-collapse-item title="检验规则" name="2">
            <p><span class="name">检验方法</span><span class="value">{{info.method}}</span></p>
            <p><span class="name">检验规格</span><span class="value">{{info.inspectSpecification}}</span></p>
            <p><span class="name">规格类型</span><span class="value">{{info.specificationType=='0'?'范围':'公差'}}</span></p>
            <p><span class="name">项目代号</span><span class="value">{{info.itemValue}}</span></p>
            <template v-if="info.specificationType==0">
              <p><span class="name">{{info.specificationType=='0'?'范围':'公差'}}</span>:<span class="value">{{info.lowerLimit}}~{{info.upperLimit}}</span></p>    
            </template>
            <template v-else>
              <p><span class="name">标准值</span><span class="value">{{info.stdValue}}</span></p>
              <p><span class="name">标准值-</span><span class="value">{{info.stdValueMinus}}</span></p>
              <p><span class="name">标准值+</span><span class="value">{{info.stdValuePlus}}</span></p>
            </template>
          </el-collapse-item>
          <el-collapse-item class="type" title="检测类型" name="3">
              <div class="typeItem">
                <span class="item-name">自检:</span>
                <i v-if="info.selfInspect=='Y'" class="fa fa-check yes"></i>
                <i v-else class="fa fa-close no"></i>
              </div>
              <div class="typeItem">
                <span class="item-name">巡检:</span>
                <i v-if="info.routingInspect=='Y'" class="fa fa-check yes"></i>
                <i v-else class="fa fa-close no"></i>
              </div>
              <div class="typeItem">
                <span class="item-name">x-bar:</span>
                <i v-if="info.xBar=='Y'" class="fa fa-check yes"></i>
                <i v-else class="fa fa-close no"></i>
              </div>
          </el-collapse-item>
        </el-collapse>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>


<script>
import { panelTitle } from "components";
import url from "api";

export default {
  data() {
    var checkStep = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择查询条件"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      searchInput: {
        plantInput: "",
        lineInput: "",
        ptnoInput: ""
      },
      searchSelect: {
        plantOption: [],
        lineOption: [],
        ptnoOption: []
      },
      rules: {
        lineInput: [{ validator: checkStep, trigger: "blur" }],
        ptnoInput: [{ validator: checkStep, trigger: "blur" }]
      },
      tableData: [],
      info: {
        ptno:'',
        line:'',
        item:'',
        itemValue:'',
        method:'',
        inspectSpecification:'',
        specificationType:'',
        upperLimit:'',
        lowerLimit:'',
        stdValue:'',
        stdValueMinus:'',
        stdValuePlus:'',
        symbol:'',
        selfInspect:'',
        routingInspect:'',
        xBar:'',
      }
    };
  },
  components: {
    panelTitle
  },
  created() {
    this.spec_init();
  },
  methods: {
    spec_init() {
      this.get_specList();
      this.get_plantSelect();
    },
    //车间发生选择
    plantSelectChange() {
      let plant = this.searchInput.plantInput;
      this.searchInput.lineInput = "";
      this.searchInput.ptnoInput = "";
      this.get_lineSelect(plant);
      this.get_ptnoSelect(plant);
    },
    //获取车间下拉数据
    get_plantSelect() {
      this.searchSelect.plantOption = [];
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.plant + "-" + opt.plantdesc,
              value: opt.plant
            };
            this.searchSelect.plantOption.push(option);
          }
        }
      });
    },
    //获取制程下拉数据
    get_lineSelect(plant) {
      this.searchSelect.lineOption = [];
      this.$get({
        url: url.check_getLine,
        params: plant
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
    get_ptnoSelect(plant) {
      this.searchSelect.ptnoOption = [];
      this.$get({
        url: url.check_getPartno,
        params: plant
      }).then(res => {
        if (res.code == 1) {
          for (let opt of res.data) {
            let option = {
              label: opt.ptno + "-" + opt.ptnm,
              value: opt.ptno
            };
            this.searchSelect.ptnoOption.push(option);
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
        console.log(res);
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
              xBar: item.xBar //x-bar
            };
            this.tableData.push(obj);
          }
        } else {
          this.$message.error(res.msg);
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
    }
  }
};
</script>

