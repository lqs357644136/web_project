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
              <el-col :xs="24" :sm="9" :md="9" :lg="9">
                <el-form-item label="主题">
                  <el-input type="text" v-model="inputs.title" placeholder="请输入主题" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="9" :md="9" :lg="9">
                <el-form-item label="内容">
                  <el-input type="text" v-model="inputs.context" placeholder="请输入内容" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <el-form-item label="状态">
                  <el-select v-model="inputs.status" placeholder="请选择">
                    <el-option v-for="item in selects.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="18" :lg="18">
                <el-form-item label="日期">
                  <el-date-picker v-model="inputs.dates" :editable="false" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
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
              <el-form-item label="主题">
                <span class="listInfoContent">{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span class="listInfoContent">{{ props.row.statusName }}</span>
              </el-form-item>
              <el-form-item label="等级">
                <span class="listInfoContent">{{ props.row.flag }}</span>
              </el-form-item>
              <el-form-item label="条件">
                <span class="listInfoContent">{{ props.row.flagCond }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span class="listInfoContent">{{ props.row.starttime }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span class="listInfoContent">{{ props.row.endtime }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span class="listInfoContent">{{ props.row.context }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="主题" width="150px"></el-table-column>
        <el-table-column prop="context" label="内容">
          <template slot-scope="scope">
            <span class="listContent">{{ scope.row.context}}</span>
          </template>
        </el-table-column>
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
      <noticeInfo class="animated slideInRight" :type="openInfoType" :statusOption="selects.statusOptions" :info="info" v-on:chioceListen="chioceListen"></noticeInfo>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import { $dataFormat } from "common/filiter/index.js";
import noticeInfo from "./components/noticeInfo.vue";
import url from "api";

export default {
  name: "notice",
  data() {
    return {
      firstOpen: true,
      formShow: true,
      openInfoType: "list",
      notList: [],
      inputs: {
        title: "",
        context: "",
        status: "",
        dates: []
      },
      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      selects: {
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
      this.date_init();
    },
    //请求列表信息
    get_list() {
      this.$get({
        url: url.notice_list,
        params: {
          title: this.inputs.title,
          context: this.inputs.context,
          status: this.inputs.status,
          startTime: this.inputs.dates[0],
          endTime: this.inputs.dates[1]
        }
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
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
          this.notList = [];
          for (let item of res.data.list) {
            let obj = {
              title: item.title,
              context: item.context,
              starttime: item.starttime,
              endtime: item.endtime,
              flag: item.flag,
              flagCond: item.flagCond,
              status: item.status,
              statusName: this.get_statusName(item.status),
              uper: item.uper,
              uptm: item.uptm,
              id: item.id,
              remark: item.remark
            };
            this.notList.push(obj);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //根据 状态代号返回状态名称
    get_statusName(statusCode) {
      let statusName = "";
      for (let statusOption of this.selects.statusOptions) {
        if (statusOption.value == statusCode) {
          statusName = statusOption.label;
        }
      }
      return statusName;
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
    deleteMess(index,id) {
      this.$confirm("此操作将永久删除该消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$get({
          url: url.notice_delete,
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
    noticeInfo
  }
};
</script>
