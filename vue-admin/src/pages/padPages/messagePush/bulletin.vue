<template>
  <div class="panel messagePush">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-if="openInfoType=='list'">
      <!-- 查询表单 -->
      <el-form class="listForm">
        <el-card :class="formShow?'box-card':'box-card card-body-hidden'">
          <div slot="header" class="clearfix">
            <span>筛选信息</span>
            <span class="card-hidden-btn" @click="formShow=!formShow">
              <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
            </span>
          </div>
          <div class="form_body">
            <el-row class="forms" :gutter="10">
              <el-col :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="文件名称">
                  <el-select v-model="inputs.fileId" placeholder="请选择">
                    <el-option v-for="item in selects.fileIdOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="等级">
                  <el-select v-model="inputs.showLevel" placeholder="请选择">
                    <el-option v-for="item in selects.showLevelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="所选条件">
                  <el-input type="text" v-model="inputs.levelCond" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="状态">
                  <el-select v-model="inputs.status" placeholder="请选择">
                    <el-option v-for="item in selects.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="btn">
              <el-button type="primary" @click="search()">查询</el-button>
              <el-button type="primary" @click="goEntity('add')">新增</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
      <el-table :data="notList" align="center" height="100%" border class="tabelList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="文件名称">
                <span class="listInfoContent">{{ props.row.fileIdName }}</span>
              </el-form-item>
              <el-form-item label="等级">
                <span class="listInfoContent">{{ props.row.showLevelName }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span class="listInfoContent">{{ props.row.statusName }}</span>
              </el-form-item>
              <el-form-item label="所选条件">
                <span class="listInfoContent">{{ props.row.levelCond }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span class="listInfoContent">{{ props.row.startTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span class="listInfoContent">{{ props.row.endTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
              </el-form-item>
              <el-form-item v-if="props.row.cycleFlag==1" label="循环日期">
                <span class="listInfoContent">{{ props.row.cycle }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span class="listInfoContent">{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fileIdName" label="文件名称" ></el-table-column>
        <el-table-column align="center" prop="showLevelName" label="等级" ></el-table-column>
        <el-table-column align="center" prop="statusName" label="状态" ></el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <div class="edit">
              <el-button @click="goEntity('edit',scope)" type="primary">编辑</el-button>
              <el-button @click="deleteMess(scope.$index,scope.row.id)" type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="panel-body" v-else>
      <bulletinInfo class="animated slideInRight" :type="openInfoType" :options="selects" :info="info" v-on:chioceListen="chioceListen"></bulletinInfo>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import { $dataFormat } from "common/filiter/index.js";
import bulletinInfo from "./components/bulletinInfo.vue";
import url from "api";

export default {
  name: "bulletin",
  data() {
    return {
      firstOpen: true,
      formShow: true,
      openInfoType: "list",
      notList: [],
      inputs: {
        fileId: "",
        showLevel: "",
        levelCond:"",
        status: "",
      },
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      selects: {
        fileIdOptions: [],
        showLevelOptions: [],
        statusOptions: []
      },
      notList: [],
      info: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      this.get_list();
    },
    //请求列表信息
    get_list() {
      this.$get({
        url: url.bulletin_list,
        params: {
          fileId: this.inputs.fileId,
          showLevel: this.inputs.showLevel,
          levelCond: this.inputs.levelCond,
          status: this.inputs.status,
        }
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          //首次进入,初始化下拉框
          if (this.firstOpen) {
            this.firstOpen = false;
            for (let item of res.data.fileList) {
              let obj = {
                label: item.typecode + "-" + item.typename,
                value: item.typecode
              };
              this.selects.fileIdOptions.push(obj);
            }
            for (let item of res.data.levelList) {
              let obj = {
                label: item.typecode + "-" + item.typename,
                value: item.typecode
              };
              this.selects.showLevelOptions.push(obj);
            }
            for (let item of res.data.statusList) {
              let obj = {
                label: item.typecode + "-" + item.typename,
                value: item.typecode
              };
              this.selects.statusOptions.push(obj);
            }
          }
          this.notList = [];
          for (let item of res.data.list) {
            let obj = {
              fileId: item.fileId,
              status: item.status,
              showLevel: item.showLevel,
              levelCond: item.levelCond,
              cycle: item.cycle,
              cycleFlag: item.cycleFlag,
              fileIdName: this.get_fileIdName(item.fileId),
              showLevelName: this.get_showLevelName(item.showLevel),
              statusName: this.get_statusName(item.status),
              remark: item.remark,
              id: item.id,
              startTime: item.startTime,
              endTime: item.endTime,
              dates :[item.startTime,item.endTime],
              cycleFlagCheck:item.cycleFlag==1?true:false,
            };
            this.notList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //根据 文件代号返回文件名称
    get_fileIdName(fileIdCode) {
      let fileIdName = "";
      for (let fileIdOption of this.selects.fileIdOptions) {
        if (fileIdOption.value == fileIdCode) {
          fileIdName = fileIdOption.label;
        }
      }
      return fileIdName.split('-')[1];
    },
    //根据 等级代号返回等级名称
    get_showLevelName(showLevelCode) {
      let showLevelName = "";
      for (let showLevelOption of this.selects.showLevelOptions) {
        if (showLevelOption.value == showLevelCode) {
          showLevelName = showLevelOption.label;
        }
      }
      return showLevelName.split('-')[1];
    },
    //根据 状态代号返回状态名称
    get_statusName(statusCode) {
      let statusName = "";
      for (let statusOption of this.selects.statusOptions) {
        if (statusOption.value == statusCode) {
          statusName = statusOption.label;
        }
      }
      return statusName.split('-')[1];
    },
    //时间初始化
    date_init() {
      let fmt = "yyyy-MM-dd hh:mm:ss";
      let oneDay = 86400000;
      let dayBefore90 = new Date() - oneDay * 366;
      this.inputs.dates = [
        $dataFormat(new Date(dayBefore90), fmt),
        $dataFormat(new Date(), fmt)
      ];
    },
    //按条件查询
    search() {
      this.get_list();
    },
    //跳转至录入页面
    goEntity(type, scope) {
      this.openInfoType = type;
      if ("edit" == type) {
        this.info = scope.row;
      }
    },
    //删除消息
    deleteMess(index, id) {
      this.$confirm("此操作将永久删除该消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$get({
          url: url.bulletin_delete,
          params: { id: id }
        }).then(res => {
          if (res.code == 1) {
            this.notList.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    //监听子组件
    chioceListen(type) {
      this.openInfoType = type;
      this.info = null;
      this.get_list();
    }
  },
  components: {
    panelTitle,
    bulletinInfo
  }
};
</script>
