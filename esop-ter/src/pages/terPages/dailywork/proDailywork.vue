<template>
  <div class="panel">
    <panel-title :back="true" :title="$route.meta.title"></panel-title>
    <div class="panel-body">

      <el-form :model="macInfo" :rules="rules" ref="macInfo" class="dailywork">
        <!-- 报工信息 -->
        <el-card :class="dailyShow?'box-card dailywork-INfo':'box-card dailywork-INfo card-body-hidden'">
          <div slot="header" class="clearfix">
            <span>报工信息</span>
            <span class="card-hidden-btn" @click="dailyShow=!dailyShow">
              <i :class="dailyShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
            </span>
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
                  <el-form-item label="班次" prop="shift">
                    <el-select @change="shiftChange(macInfo.shift)" v-model="macInfo.shift" placeholder="请选择">
                      <el-option v-for="item in shiftSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 可配置 start -->
                <el-col v-show="recTypeMenu.qty==1" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="生产数量">
                    <el-input @change="qtyChange()" type="number" v-model="macInfo.qty" placeholder="请输入生产数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="recTypeMenu.scrapQty==1" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="报废数">
                    <el-input @change="scrapQtyChange()" type="number" v-model="macInfo.scrapQty" placeholder="请输入报废数"></el-input>
                  </el-form-item>
                </el-col>

                <el-col v-show="recTypeMenu.topMould==1" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="上模">
                    <el-input @change="topChange()" type="text" v-model="macInfo.topMould" placeholder="请输入上模"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="recTypeMenu.middleMould==1" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="中模">
                    <el-input @change="middleChange()" type="text" v-model="macInfo.middleMould" placeholder="请输入中模"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="recTypeMenu.bottomMould==1" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="下模">
                    <el-input @change="bottomChange()" type="text" v-model="macInfo.bottomMould" placeholder="请输入下模"></el-input>
                  </el-form-item>
                </el-col>

                <el-col v-show="true" :xs="24" :sm="24" :md="6" :lg="6">
                  <el-form-item label="休息时间">
                    <el-select @change="restTimeChange()" v-model="macInfo.restTime" placeholder="请输入休息时间">
                      <el-option v-for="item in restTimeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 可配置 end -->
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
                  <el-form-item label="产品编码">
                    <el-input :disabled="true" v-model="macInfo.ptno" placeholder="产品编码"></el-input>
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
        <el-table class="dailywork-list" :row-class-name="tableRowClassName" :highlight-current-row="false" :data="dailyworkList" height="100%" border style="width: 100%">
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="orderNo" width="120px" label="工单"></el-table-column>
          <el-table-column align="center" prop="procItem" width="120px" label="工位"></el-table-column>
          <el-table-column align="center" prop="empNo" width="120px" label="工号"></el-table-column>
          <el-table-column align="center" prop="shift" label="班次"></el-table-column>
          <!-- <el-table-column align="center" prop="schQty" label="计划数"></el-table-column> -->
          <el-table-column align="center" prop="partNo" width="150px" label="产品编码"></el-table-column>
          <el-table-column align="center" prop="recType" width="120px" label="报工类型"></el-table-column>
          <el-table-column align="center" prop="topMould" width="120px" label="上模"></el-table-column>
          <el-table-column align="center" prop="middleMould" width="120px" label="中模"></el-table-column>
          <el-table-column align="center" prop="bottomMould" width="120px" label="下模"></el-table-column>
          <el-table-column prop="createTime" width="240px" label="开始时间">
            <template slot-scope="scope">
              <div v-if="scope.row.createTime">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.createTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" width="240px" label="结束时间">
            <template slot-scope="scope" v-if="scope.row.endTime">
              <div v-if="scope.row.endTime">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.endTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="procTime" width="180px" label="实际工时(小时)"></el-table-column>
          <el-table-column align="center" prop="qty" width="120px" label="生产数量"></el-table-column>
          <el-table-column align="center" prop="scrapQty" width="120px" label="报废数量"></el-table-column>
        </el-table>

      </el-form>

    </div>
  </div>

</template>

<script>
//////////UI组件加载//////////
import Vue from "vue";
import {
  Input,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Row,
  Col
} from "element-ui";

Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
/////////////////////////////
import { panelTitle } from "components";
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
      //ls
      lsflag: false,
      //报工信息显示控制
      dailyShow: true,
      //是否允许开始报工
      isDailyStart: false,
      //开始报工按钮与结束报工按钮切换
      dailyStartHidden: true,
      //判断显示表单
      typeFlag: "",
      macInfo: {
        equipNo: "", //机台
        empNo: "", //工号
        partNo: "", //产品编码
        plant: "", //车间
        line: "", //线别
        ptno: "", //产品编号
        recType: "", //报工类型
        orderNo: "", //工单
        procItem: "", //工位
        createTime: "", //开始时间
        endTime: "", //结束时间
        procTime: "", //实际时间
        qty: "", //生产数量
        abnormalTime: "", //异常工时
        id: "", //id
        shift: "", //班次
        schQty: "", //计划数
        scrapQty: "", //报废数
        topMould: "", //上模
        middleMould: "", //中模
        bottomMould: "", //下模
        restTime: ""
      },
      typeSelect: [],
      partNoSelect: [],
      shiftSelect: [],
      restTimeSelect:[],
      dailyworkList: [],
      rules: {
        //验证规则
        recType: [{ validator: checkSelect, trigger: "blur" }],
        shift: [{ validator: checkSelect, trigger: "blur" }]
      },
      //动态菜单
      recTypeMenu: []
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
      this.macInfo.ptno = macInfo.ptno;
      if (!this.macInfo.ptno || !this.macInfo.ptno.length > 0) {
        this.$alert("当前没有可执行生产计划", "错误", {
          confirmButtonText: "确定",
          callback: action => {
            try {
              window.android.finish();
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
      this.getProList();
    },
    //获取列表信息,
    getProList() {
      this.$get_noToken({
        url: this.$api_baseurl(url.proDailywork_list),
        params: { equipNo: this.macInfo.equipNo }
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.dailyworkList = [];
          for (let obj of res.data.allList) {
            let item = {
              empNo: obj.empNo,
              equipNo: obj.empNo,
              partNo: obj.partNo,
              orderNo: obj.orderNo,
              procItem: obj.resNo,
              procTime: obj.procTime,
              scrapQty: obj.scrapQty,
              badReason: obj.badReason,
              qty: obj.qty,
              shift: obj.shift,
              schQty: obj.schQty,
              topMould: obj.topMould,
              middleMould: obj.middleMould,
              bottomMould: obj.bottomMould,
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
            this.lsflag = true;
            let finish = res.data.unFinishList[0];
            this.dailyworkList[0].pro = true;
            this.dailyworkList[0].endTime = null;
            this.dailyworkList[0].abnormalTime = null;
            this.dailyworkList[0].procTime = null;
            this.dailyworkList[0].qty = null;
            this.dailyworkList[0].scrapQty = null;
            this.isDailyStart = false;
            this.recTypeMenu = finish.recType ? finish.recType : [];
            this.macInfo.recType = finish.recType.name
              ? finish.recType.name
              : "";
            this.macInfo.empNo = finish.empNo ? finish.empNo : "";
            this.macInfo.equipNo = finish.equipNo ? finish.equipNo : "";
            this.macInfo.resNo = finish.resNo ? finish.resNo : "";
            this.macInfo.partNo = finish.partNo ? finish.partNo : "";
            this.macInfo.orderNo = finish.orderNo ? finish.orderNo : "";
            this.macInfo.procItem = finish.procItem ? finish.procItem : "";
            this.macInfo.badReason = finish.badReason ? finish.badReason : "";
            this.macInfo.shift = finish.shift ? finish.shift : "";
            this.macInfo.qty = finish.qty ? finish.qty : "";
            this.macInfo.scrapQty = finish.scrapQty ? finish.scrapQty : "";
            this.macInfo.schQty = finish.schQty ? finish.schQty : "";
            this.macInfo.topMould = finish.topMould ? finish.topMould : "";
            this.macInfo.middleMould = finish.middleMould
              ? finish.middleMould
              : "";
            this.macInfo.bottomMould = finish.bottomMould
              ? finish.bottomMould
              : "";
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
            this.lsflag = false;
            this.isDailyStart = true;
            this.dailyStartHidden = true;
            this.typeSelect_init();
            this.shiftSelect_init();
            this.restTimeSelect_init();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化休息时间
    restTimeSelect_init(){
       this.$get_noToken({
        url: this.$api_baseurl(url.daily_shiftType)
      }).then(res => {
        if (res.code == 1) {
          this.restTimeSelect = [];
          for (let obj of res.data) {
            let option = {
              label: obj.typename,
              value: obj.typename
            };
            this.restTimeSelect.push(option);
          }
          if (this.restTimeSelect.length > 0) {
            this.macInfo.restTime = this.restTimeSelect[0].label;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化班次号
    shiftSelect_init() {
      this.$get_noToken({
        url: this.$api_baseurl(url.daily_shiftType)
      }).then(res => {
        if (res.code == 1) {
          this.shiftSelect = [];
          for (let obj of res.data) {
            let option = {
              label: obj.typename,
              value: obj.typename
            };
            this.shiftSelect.push(option);
          }
          if (this.shiftSelect.length > 0) {
            this.macInfo.shift = this.shiftSelect[0].label;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化类型下拉列表
    typeSelect_init() {
      this.$get_noToken({
        url: this.$api_baseurl(url.proDailywork_type)
      }).then(res => {
        if (res.code == 1) {
          this.typeSelect = [];
          for (let obj of res.data) {
            let option = {
              label: obj.name,
              value: obj.code,
              isMould: obj.isMould
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
      let params = {
        recType: recType
      };
      if (this.isDailyStart && recType) {
        this.$get_noToken({
          url: this.$api_baseurl(url.proDailywork_forOne),
          params: params
        }).then(res => {
          if (res.code == 1) {
            //允许开始报工
            this.recTypeMenu = res.data;
            this.macInfo.qty = 0;
            this.macInfo.scrapQty = 0;
            this.macInfo.topMould = 0;
            this.macInfo.middleMould = 0;
            this.macInfo.bottomMould = 0;
            this.dailyStartHidden = true;
            let flag = this.dailyStartFlag();
            if (flag) {
              this.dailyStartHidden = false;
              this.isDailyStart = true;
            }
          } else {
            this.$message.error(res.msg);
          }
        });
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

    //班次改变
    shiftChange() {
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
    //上模发生改变
    topChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //中模发生改变
    middleChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //下模发生改变
    bottomChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //休息时间发生改变
    restTimeChange() {
      let flag = this.dailyStartFlag();
      if (flag) {
        this.dailyStartHidden = false;
        this.isDailyStart = true;
      }
    },
    //是否允许点击开始报工
    dailyStartFlag() {
      let flag = false;
      if (!this.lsflag) {
        flag = this.macInfo.recType.length > 0 && this.macInfo.shift.length > 0;
      }
      return flag;
    },
    //开始报工
    dailyStart() {
      let data = {
        empNo: this.macInfo.empNo,
        equipNo: this.macInfo.equipNo,
        recType: this.macInfo.recType,
        partNo: this.macInfo.ptno,
        resNo: this.macInfo.line,
        plant: this.macInfo.plant,
        qty: this.macInfo.qty,
        shift: this.macInfo.shift,
        scrapQty: this.macInfo.scrapQty,
        topMould: this.macInfo.topMould,
        middleMould: this.macInfo.middleMould,
        bottomMould: this.macInfo.bottomMould
      };
      console.log(data);
      this.$post_noToken({
        url: this.$api_baseurl(url.proDailywork_add),
        data
      }).then(res => {
        if (res.code == 1) {
          this.getProList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //结束报工
    dailyEnd() {
      let data = {
        id: this.macInfo.id,
        qty: this.macInfo.qty,
        shift: this.macInfo.shift,
        scrapQty: this.macInfo.scrapQty,
        topMould: this.macInfo.topMould,
        middleMould: this.macInfo.middleMould,
        bottomMould: this.macInfo.bottomMould
      };
      this.$post_noToken({
        url: this.$api_baseurl(url.proDailywork_add),
        data
      }).then(res => {
        if (res.code == 1) {
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
    tableRowClassName({ row }) {
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

