<template>
  <div class="panel precautions">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-form class="listForm">
        <!-- 报工信息 -->
        <el-card :class="formShow?'box-card':'box-card card-body-hidden'">
          <div slot="header" class="clearfix">
            <span>筛选信息</span>
            <span class="card-hidden-btn" @click="formShow=!formShow">
              <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
            </span>
          </div>
          <div class="form_body">
            <el-row class="forms" :gutter="30">
              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-form-item label="产品编码">
                  <el-input :disabled="true" v-model="inputs.ptno" placeholder="产品编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-form-item label="机台">
                  <el-input :disabled="true" v-model="inputs.process" placeholder="机台"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-form>
      <el-table :data="preList" align="center" height="100%" border class="tabelList">
        <el-table-column align="center" type="index" label="序号" width="70px"></el-table-column>
        <el-table-column prop="warnContent" label="内容">
          <template slot-scope="scope">
            <span class="listPreContent">{{ scope.row.warnContent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" sortable label="创建日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.createTime | dataFormat('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
//////////UI组件加载//////////
import Vue from 'vue'
import {
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Form,
  FormItem,
  Row,
  Col,
} from 'element-ui'

Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
/////////////////////////////
import { panelTitle } from "components";
import url from "api";

export default {
  name: "precautions",
  data() {
    return {
      formShow: true,
      inputs: {
        ptno: "",
        process: "",
        status: ""
      },
      selects: {
        ptnoOptions: [],
        processOptions: [],
        statusOptions: []
      },
      preList: []
    };
  },
  created() {
    this.pageInit();
  },
  methods: {
    //页面数据初始化
    pageInit() {
      let macInfo = Window.GETMACINFO();
      this.inputs.process = macInfo.equipNo;
      this.inputs.ptno = macInfo.ptno;
      this.get_preList();
    },
    //获取列表
    get_preList() {
      this.$get_noToken({
        url: this.$api_baseurl(url.precautions_list),
        params: {
          ptno: this.inputs.ptno,
          process: this.inputs.process,
          status: "1"
        }
      }).then(res => {
        for (let item of res.data.list) {
          let obj = {
            warnContent: item.warnContent,
            createTime: item.createTime,
            modifyTime: item.modifyTime
          };
          this.preList.push(obj);
        }
      });
    },
  },
  components: {
    panelTitle
  }
};
</script>
