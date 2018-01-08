<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body">

            <el-form :model="macInfo" :rules="rules" ref="macInfo" class="dailywork">
                <!-- 报工信息 -->
                <el-card class="box-card dailywork-INfo">
                    <div slot="header" class="clearfix">
                        <span>报工信息</span>
                    </div>
                    <div class="dailywork-body">
                        <div class="dailyFrom">
                            <el-row class="" :gutter="20">
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="异常类型" prop="recType">
                                        <el-select :disabled="!isDailyStart" @change="recTypeChange(macInfo.recType)" v-model="macInfo.recType" placeholder="请选择">
                                            <el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="机台">
                                        <el-input :disabled="true" v-model="macInfo.equipNo" placeholder="机台"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="工号/姓名">
                                        <el-input :disabled="true" v-model="macInfo.empNo" placeholder="工号/姓名"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="开始时间">
                                        <el-input :disabled="true" v-model="startTime" placeholder="-"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="结束时间">
                                        <el-input :disabled="true" v-model="overTime" placeholder="-"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="异常工时">
                                        <el-input :disabled="true" v-model="allTime" placeholder="-"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="dailyBtn">
                            <el-form-item class="subBtn">
                                <el-button @click="dailyStart()" v-if="isDailyStart" :disabled="dailyStartHidden" type="primary">
                                    <i class="fa fa-hand-pointer-o"></i> 开始报工</el-button>
                                <el-button @click="dailyEnd()" v-else type="success">
                                    <i class="fa fa-step-forward"></i> 结束报工</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-card>

                <!-- 报工列表 -->
                <el-card class="box-card dailywork-list">
                    <div slot="header" class="clearfix">
                        <span>异常清单</span>
                    </div>
                    <div class="list">
                        <el-table :row-class-name="tableRowClassName" :highlight-current-row="false" :data="dailyworkList" height="100%" border style="width: 100%">
                            <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
                            <el-table-column align="center" prop="recType" label="异常类型"></el-table-column>
                            <el-table-column prop="createTime" label="开始时间">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.createTime">
                                        <i class="el-icon-time"></i>
                                        <span>{{ scope.row.createTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
                                    </div>
                                    <div v-else>-</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="endTime" label="结束时间">
                                <template slot-scope="scope" v-if="scope.row.endTime">
                                    <div v-if="scope.row.endTime">
                                        <i class="el-icon-time"></i>
                                        <span>{{ scope.row.endTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
                                    </div>
                                    <div v-else>-</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="abnormalTime" label="异常工时(小时)"></el-table-column>
                        </el-table>
                    </div>
                </el-card>

            </el-form>

        </div>
    </div>

</template>

<script>
import { panelTitle } from "components";
import { mapGetters } from "vuex";
import url from "api";
import { $dataFormat } from "common/filiter/index.js";

export default {
  name: "adnDailywork",
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      isDailyStart: false,
      dailyStartHidden: true,
      macInfo: {
        equipNo: "", //机台编号
        empNo: "", //工号
        recType: "", //报工类型
        createTime: "", //开始时间
        endTime: "", //结束时间
        abnormalTime: "", //异常工时
        id: "" //id
      },
      typeSelect: [],
      dailyworkList: [],
      rules: {
        //验证规则
        recType: [{ validator: checkSelect, trigger: "blur" }]
      }
    };
  },
  computed: {
    startTime: {
      get() {
        if (
          this.macInfo.createTime &&
          this.macInfo.createTime.toString().length > 0
        ) {
          return $dataFormat(
            new Date(this.macInfo.createTime),
            "yyyy/MM/dd hh:mm:ss"
          );
        }
      }
    },
    overTime: {
      get() {
        if (
          this.macInfo.endTime &&
          this.macInfo.endTime.toString().length > 0
        ) {
          return $dataFormat(
            new Date(this.macInfo.endTime),
            "yyyy/MM/dd hh:mm:ss"
          );
        }
      }
    },
    allTime: {
      get() {
        if (
          this.macInfo.abnormalTime &&
          this.macInfo.abnormalTime.toString().length > 0
        ) {
          return this.macInfo.abnormalTime + "小时";
        }
      }
    }
  },
  created() {
    this.mac_init();
  },
  methods: {
    //初始化机器信息
    mac_init() {
      let macInfo = Window.GETMACINFO();
      this.macInfo.equipNo = macInfo.equipNo;
      this.macInfo.empNo = macInfo.empNo;
      this.getAdnList();
    },
    //获取列表信息,
    getAdnList() {
      this.$get_noToken({
        url: url.abnDailywork_list,
        params: { equipNo: this.macInfo.equipNo }
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.dailyworkList = [];
          for (let obj of res.data.allList) {
            let item = {
              recType: obj.recType,
              createTime: obj.createTime,
              endTime: obj.endTime,
              abnormalTime: obj.abnormalTime||obj.abnormalTime==0
                ? Math.floor(obj.abnormalTime / 60 * 100) / 100
                : "-"
            };
            this.dailyworkList.push(item);
          }
          if (res.data.unFinishList.length > 0) {
            this.dailyworkList[0].abn = true;
            this.dailyworkList[0].endTime = null;
            this.dailyworkList[0].abnormalTime = null;
            this.isDailyStart = false;
            this.macInfo.recType = res.data.unFinishList[0].recType;
            this.macInfo.id = res.data.unFinishList[0].id;
            this.macInfo.createTime = res.data.unFinishList[0].createTime;
            this.macInfo.endTime = res.data.unFinishList[0].endTime;
            this.macInfo.abnormalTime = res.data.unFinishList[0].abnormalTime
              ? Math.floor(res.data.unFinishList[0].abnormalTime / 60 * 100) /100 : "-";
          } else {
            this.isDailyStart = true;
            this.dailyStartHidden = true;
            this.typeSelect_init(0);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化类型下拉列表
    typeSelect_init(type) {
      this.$get_noToken({
        url: url.dailywork_type,
        params: { type: type }
      }).then(res => {
        if (res.code == 1) {
          this.typeSelect = [];
          this.$message.success(res.msg);
          for (let obj of res.data) {
            let option = {
              label: obj.typename,
              value: obj.typecode
            };
            this.typeSelect.push(option);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //点选某个报工类型
    recTypeChange(recType) {
      if (this.isDailyStart && recType) {
        this.$get_noToken({
          url: url.abnDailywork_forOne,
          params: {
            recType: recType,
            equipNo: this.macInfo.equipNo,
            empNo: this.macInfo.empNo
          }
        }).then(res => {
          if (res.code == 1) {
            this.$message.success(res.msg);
            if (!res.data.id) {
              //允许开始报工
              this.dailyStartHidden = false;
              this.isDailyStart = true;
            } else {
              //允许结束报工
              this.isDailyStart = false;
              this.macInfo.id = res.data.id;
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //开始报工
    dailyStart() {
      let data = {
        createUser: this.macInfo.empNo,
        equipNo: this.macInfo.equipNo,
        recType: this.macInfo.recType
      };
      this.$post_noToken({
        url: url.abnDailywork_add,
        data
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.getAdnList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //结束报工
    dailyEnd() {
      let data = {
        id: this.macInfo.id
      };
      this.$post_noToken({
        url: url.abnDailywork_add,
        data
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.macInfo.endTime = null;
          this.macInfo.abnormalTime = null;
          this.macInfo.recType = null;
          this.macInfo.createTime = null;
          this.getAdnList();
          this.isDailyStart = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //列表状态
    tableRowClassName(row, index) {
      if (row.abn) {
        return "noDaily";
      } else {
        return "isDaily";
      }
    }
  },
  components: {
    panelTitle
  }
};
</script>

