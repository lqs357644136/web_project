<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body specification">
      <!-- 规范查询 -->
      <el-form :inline="true" class="specForm">
        <el-row class="selectForm" :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <el-form-item label="车间">
              <el-input :disabled="true" v-model="macInfo.plant" placeholder="车间"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <el-form-item label="线程">
              <el-input :disabled="true" v-model="macInfo.line" placeholder="线程"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <el-form-item label="产品">
              <el-input :disabled="true" v-model="macInfo.ptno" placeholder="产品编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 规范列表 -->
      <el-table :stripe="true" class="specTable" :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="ptno" label="产品编码"></el-table-column>
        <el-table-column prop="line" label="线程"></el-table-column>
        <el-table-column prop="item" label="项目"></el-table-column>
        <el-table-column prop="itemValue" label="项目代码"></el-table-column>
        <el-table-column prop="method" label="方法"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="getInfo(scope.$index,scope.row)" type="primary">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 规范详情  -->
      <el-dialog :modal="false" class="specInfo" :show-close="false" :visible.sync="dialogFormVisible">
        <el-collapse accordion>
          <el-collapse-item class="normal" title="基础信息" name="1">
            <p>
              <span class="name">产品编码</span>
              <span class="value">{{info.ptno}}</span>
            </p>
            <p>
              <span class="name">线程</span>
              <span class="value">{{info.line}}</span>
            </p>
            <p>
              <span class="name">项目</span>
              <span class="value">{{info.item}}</span>
            </p>
            <p>
              <span class="name">项目代号</span>
              <span class="value">{{info.itemValue}}</span>
            </p>
          </el-collapse-item>
          <el-collapse-item title="检验规则" name="2">
            <p>
              <span class="name">方法</span>
              <span class="value">{{info.method}}</span>
            </p>
            <p>
              <span class="name">规范类型</span>
              <span class="value">{{info.specificationType=='0'?'范围':'公差'}}</span>
            </p>
            <p>
              <span class="name">规范值</span>
              <span class="value">{{info.inspectSpecification}}</span>
            </p>
          </el-collapse-item>
          <el-collapse-item class="type" title="规范类型" name="3">
            <div class="typeItem">
              <span class="item-name">首检:</span>
              <i v-if="info.selfInspect=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
            <div class="typeItem">
              <span class="item-name">巡检:</span>
              <i v-if="info.routingInspect=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
            <div class="typeItem">
              <span class="item-name">xBar:</span>
              <i v-if="info.xBar=='Y'" class="fa fa-check yes"></i>
              <i v-else class="fa fa-close no"></i>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>


<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Input,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Row,
  Col,
  Dialog,
  Collapse,
  CollapseItem
} from "element-ui";
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Collapse);
Vue.use(Collapse);
Vue.use(CollapseItem);
/////////////////////////////F
import { panelTitle } from "components";
import url from "api";

export default {
  data() {
    return {
      dialogFormVisible: false,
      macInfo: {
        plant: "",
        line: "",
        ptno: ""
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
  components: {
    panelTitle
  },
  mounted() {
    this.spec_init();
  },
  methods: {
    spec_init() {
      let macInfo = Window.GETMACINFO();
      this.macInfo.plant = macInfo.plant;
      this.macInfo.line = macInfo.line;
      this.macInfo.ptno = macInfo.ptno;
      this.get_specList();
    },
    //获取列表
    get_specList() {
      let params = {
        line: this.macInfo.line,
        ptno: this.macInfo.ptno
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.inspectSpec_list),
        params: params
      }).then(res => {
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
    //显示详情
    getInfo(index, info) {
      this.info = info;
      this.dialogFormVisible = true;
    }
  }
};
</script>

