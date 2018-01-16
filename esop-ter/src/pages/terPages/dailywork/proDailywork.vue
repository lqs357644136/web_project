<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
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
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="报工类型" prop="recType">
                    <el-select :disabled="!isDailyStart" @change="recTypeChange(macInfo.recType)" v-model="macInfo.recType" placeholder="请选择">
                      <el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="产品编码" prop="partNo">
                    <el-select :disabled="!isDailyStart" @change="partNoChange()" v-model="macInfo.partNo" placeholder="请选择">
                      <el-option v-for="item in partNoSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="产量">
                    <el-input :disabled="!isDailyStart" @change="qtyChange()" type="number" v-model="macInfo.qty" placeholder="请输入产量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="报废数">
                    <el-input :disabled="!isDailyStart" @change="scrapQtyChange()" type="number" v-model="macInfo.scrapQty" placeholder="请输入报废数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="不良原因">
                    <el-input :disabled="!isDailyStart" @change="badReasonChange()" v-model="macInfo.badReason" placeholder="请输入不良原因"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="工号/姓名">
                    <el-input :disabled="true" v-model="macInfo.empNo" placeholder="工号/姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="制程">
                    <el-input :disabled="true" v-model="macInfo.line" placeholder="资源"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="机台">
                    <el-input :disabled="true" v-model="macInfo.equipNo" placeholder="机台"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="开始时间">
                    <el-input :disabled="true" v-model="startTime" placeholder="-"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="结束时间">
                    <el-input :disabled="true" v-model="overTime" placeholder="-"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="异常工时">
                    <el-input :disabled="true" v-model="allTime" placeholder="-"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="实际工时">
                    <el-input :disabled="true" v-model="macInfo.procTime" placeholder="-"></el-input>
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
            <span>生产清单</span>
          </div>
          <div class="list">
            <el-table :row-class-name="tableRowClassName" :highlight-current-row="false" :data="dailyworkList" height="100%" border style="width: 100%">
              <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
              <el-table-column align="center" prop="gongdan" label="工单"></el-table-column>
              <el-table-column align="center" prop="procItem" label="工位"></el-table-column>
              <el-table-column align="center" prop="empNo" label="工号"></el-table-column>
              <el-table-column align="center" prop="partNo" label="产品编码"></el-table-column>
              <el-table-column align="center" prop="recType" label="报工类型"></el-table-column>
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
              <el-table-column align="center" prop="procTime" label="实际工时(小时)"></el-table-column>
              <el-table-column align="center" prop="qty" label="产量"></el-table-column>
              <el-table-column align="center" prop="scrapQty" label="报废数"></el-table-column>
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
        equipNo: "", //机台
        empNo: "", //工号
        partNo: "", //产品编码
        plant: "", //车间
        line: "", //线别
        recType: "", //报工类型
        orderNo: "", //工单
        procItem: "", //工位
        createTime: "", //开始时间
        endTime: "", //结束时间
        procTime: "", //实际时间
        badReason: "", //不良原因
        qty: "", //产量
        abnormalTime: "", //异常工时
        scrapQty: "", //报废数
        id: "" //id
      },
      typeSelect: [],
      partNoSelect: [],
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
          return this.macInfo.abnormalTime + " 小时";
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
      this.macInfo.line = macInfo.line;
      this.macInfo.plant = macInfo.plant;
      this.getProList();
    },
    //获取列表信息,
    getProList() {
      this.$get_noToken({
        url: url.proDailywork_list,
        params: { equipNo: this.macInfo.equipNo }
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.dailyworkList = [];
          for (let obj of res.data.allList) {
            let item = {
              empNo: obj.empNo,
              equipNo: obj.empNo,
              partNo: obj.partNo,
              orderNo: obj.orderNo,
              procItem: obj.resNo,
              procTime: obj.procTime,
              badReason: obj.badReason,
              qty: obj.qty,
              scrapQty: obj.scrapQty,
              recType: obj.recType,
              createTime: obj.createTime,
              endTime: obj.endTime,
              procTime:
                obj.procTime || obj.procTime == 0
                  ? Math.floor(obj.procTime / 60 * 100) / 100
                  : "0.00",
              abnormalTime:
                obj.abnormalTime || obj.abnormalTime == 0
                  ? Math.floor(obj.abnormalTime / 60 * 100) / 100
                  : "0.00"
            };
            this.dailyworkList.push(item);
          }
          //判断是否存在开启的报工
          if (res.data.unFinishList && res.data.unFinishList.length > 0) {
            let finish = res.data.unFinishList[0];
            this.dailyworkList[0].pro = true;
            this.dailyworkList[0].endTime = null;
            this.dailyworkList[0].abnormalTime = null;
            this.dailyworkList[0].procTime = null;
            this.dailyworkList[0].qty = null;
            this.dailyworkList[0].scrapQty = null;
            this.isDailyStart = false;
            this.macInfo.empNo = finish.empNo ? finish.empNo : "";
            this.macInfo.equipNo = finish.equipNo ? finish.equipNo : "";
            this.macInfo.resNo = finish.resNo ? finish.resNo : "";
            this.macInfo.partNo = finish.partNo ? finish.partNo : "";
            this.macInfo.orderNo = finish.orderNo ? finish.orderNo : "";
            this.macInfo.procItem = finish.procItem ? finish.procItem : "";
            this.macInfo.badReason = finish.badReason ? finish.badReason : "";
            this.macInfo.qty = finish.qty ? finish.qty : "";
            this.macInfo.scrapQty = finish.scrapQty ? finish.scrapQty : "";
            this.macInfo.recType = finish.recType ? finish.recType : "";
            this.macInfo.id = finish.id;
            this.macInfo.createTime = finish.createTime;
            this.macInfo.endTime = finish.endTime;
            this.macInfo.procTime = finish.procTime
              ? Math.floor(finish.procTime / 60 * 100) / 100
              : "0.00";
            this.macInfo.abnormalTime = finish.abnormalTime
              ? Math.floor(finish.abnormalTime / 60 * 100) / 100
              : "0.00";
          } else {
            this.isDailyStart = true;
            this.dailyStartHidden = true;
            this.typeSelect_init(1);
            this.partNoSelect_init(this.macInfo.plant);
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
    //初始化产品编码下拉列表
    partNoSelect_init(plant) {
      this.$get_noToken({
        url: url.check_getPartno,
        params: { plant: plant }
      }).then(res => {
        if (res.code == 1) {
          this.partNoSelect = [];
          this.$message.success(res.msg);
          for (let obj of res.data) {
            let option = {
              label: obj.ptnm,
              value: obj.ptno
            };
            this.partNoSelect.push(option);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //点选某个报工类型
    recTypeChange(recType) {
      let params = {
        recType: recType,
        equipNo: this.macInfo.equipNo,
        empNo: this.macInfo.empNo
      };
      if (this.isDailyStart && recType) {
        this.$get_noToken({
          url: url.proDailywork_forOne,
          params: params
        }).then(res => {
          if (res.code == 1) {
            this.$message.success(res.msg);
            if (!res.data.id) {
              //允许开始报工
              let flag = this.dailyStartFlag();
              if (flag) {
                this.dailyStartHidden = false;
                this.isDailyStart = true;
              }
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
    //点选某个产品编码
    partNoChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //不良原因发生改变
    badReasonChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //产量发生改变
    qtyChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //报废数发生改变
    scrapQtyChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //是否允许点击开始报工
    dailyStartFlag() {
      let flag =
        this.macInfo.recType.length > 0 &&
        this.macInfo.partNo.length > 0 &&
        this.macInfo.qty.length > 0 &&
        this.macInfo.scrapQty.length > 0 &&
        this.macInfo.badReason.length > 0;
      return flag;
    },
    //开始报工
    dailyStart() {
      let data = {
        empNo: this.macInfo.empNo,
        equipNo: this.macInfo.equipNo,
        recType: this.macInfo.recType,
        partNo: this.macInfo.partNo,
        resNo: this.macInfo.line,
        scrapQty:this.macInfo.scrapQty,
        qty: this.macInfo.qty,
        badReason: this.macInfo.badReason,
        orderNo: this.macInfo.orderNo
      };
      console.log(data)
      this.$post_noToken({
        url: url.proDailywork_add,
        data
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.getProList();
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
        url: url.proDailywork_add,
        data
      }).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg);
          this.macInfo.endTime = "";
          this.macInfo.abnormalTime = "";
          this.macInfo.recType = "";
          this.macInfo.partNo = "";
          this.macInfo.createTime = "";
          this.macInfo.qty = "";
          this.macInfo.scrapQty = "";
          this.macInfo.badReason = "";
          this.getProList();
          this.isDailyStart = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //列表状态
    tableRowClassName(row, index) {
      if (row.pro) {
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

