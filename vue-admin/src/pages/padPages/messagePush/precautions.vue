<template>
  <div class="panel messagePush">
    <panel-title :title="$route.meta.title"></panel-title>
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
                  <el-select v-model="inputs.ptno" placeholder="请选择">
                    <el-option v-for="item in selects.ptnoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-form-item label="机台">
                  <el-select v-model="inputs.process" placeholder="请选择">
                    <el-option v-for="item in selects.processOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-form-item label="状态">
                  <el-select v-model="inputs.status" placeholder="请选择">
                    <el-option v-for="item in selects.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="btn">
              <el-button type="primary" @click="search()">查询</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
      <el-table :data="preList" align="center" height="100%" border class="tabelList">
        <el-table-column align="center" type="index" label="序号" width="70px"></el-table-column>
        <el-table-column prop="warnContent" label="内容">
          <template slot-scope="scope">
            <span class="listContent">{{ scope.row.warnContent}}</span>
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
import { panelTitle } from "components";
import url from "api";

export default {
  name: "precautions",
  data() {
    return {
      firstOpen: true,
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
      this.plantOptions_init();
      this.ptnoOptions_init();
      this.get_preList();
    },
    //获取列表
    get_preList() {
      this.$get({
        url: url.precautions_list,
        params: {
          ptno: this.inputs.ptno,
          process: this.inputs.process,
          status: this.inputs.status
        }
      }).then(res => {
        console.log(res);
        if (this.firstOpen) {
          this.firstOpen = false;
          for (let item of res.data.statusList) {
            let obj = {
              label: item.typecode + "-" + item.typename,
              value: item.typecode
            };
            this.selects.statusOptions.push(obj);
          }
        }
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
    //初始化机台下拉
    plantOptions_init() {
      this.$get_noToken({
        url: url.check_getProcess
      }).then(res => {
        if (res.code == 1) {
          for (let item of res.data) {
            let obj = {
              label: item.process + "-" + item.processname,
              value: item.process
            };
            this.selects.processOptions.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化产品编码下拉框
    ptnoOptions_init() {
      this.$get_noToken({
        url: url.check_getPartno
      }).then(res => {
        if (res.code == 1) {
          for (let item of res.data) {
            let obj = {
              label: item.ptno + "-" + item.ptnm,
              value: item.ptno
            };
            this.selects.ptnoOptions.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //按条件查询
    search(){
      this.preList = [];
      this.get_preList();
    }
  },
  components: {
    panelTitle
  }
};
</script>
