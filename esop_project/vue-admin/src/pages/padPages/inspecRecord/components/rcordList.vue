<template>
  <div class="rcordList">
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
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="车间">
                <el-select @change="plantSelectChange()" v-model="inputs.plant" placeholder="请选择">
                  <el-option v-for="item in selects.plantOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="线程">
                <el-select @change="lineSelectChange()" v-model="inputs.line" placeholder="请选择">
                  <el-option v-for="item in selects.lineOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="工位">
                <el-select v-model="inputs.process" placeholder="请选择">
                  <el-option v-for="item in selects.processOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="产品编号">
                <el-select v-model="inputs.ptno" placeholder="请选择">
                  <el-option v-for="item in selects.ptnoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="检验结果">
                <el-select v-model="inputs.flag" placeholder="请选择">
                  <el-option v-for="item in selects.flagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16">
              <el-form-item label="日期" prop="dates">
                <el-date-picker v-model="inputs.dates" :editable="false" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn">
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </div>
      </el-card>
    </el-form>

    <el-table @expand-change="expandChange" :highlight-current-row="false" :data="tableList" align="center" height="100%" :row-class-name="rowStyle" border class="tabelList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="类型">
              <span class="listInfoContent" v-if="props.row.type==0">终端首检</span>
              <span class="listInfoContent" v-if="props.row.type==1">QC首检</span>
              <span class="listInfoContent" v-if="props.row.type==2">自检</span>
              <span class="listInfoContent" v-if="props.row.type==3">巡检</span>
            </el-form-item>
            <el-form-item label="车间">
              <span class="listInfoContent">{{ props.row.plant }}</span>
            </el-form-item>
            <el-form-item label="线程">
              <span class="listInfoContent">{{ props.row.line }}</span>
            </el-form-item>
            <el-form-item label="工位">
              <span class="listInfoContent">{{ props.row.process }}</span>
            </el-form-item>
            <el-form-item label="产品编码">
              <span class="listInfoContent">{{ props.row.ptno }}</span>
            </el-form-item>
            <el-form-item label="检验结果">
              <span class="listInfoContent" :style="props.row.flag==0?'color:red':'color:green'">{{ props.row.flag==0?'不合格':'合格' }}</span>
            </el-form-item>
            <el-form-item label="检验时间">
              <span class="listInfoContent">{{ props.row.inspectTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
            </el-form-item>
            <el-form-item label="审核备注">
              <span class="listInfoContent">{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="检测备注">
              <span class="listInfoContent">
                <el-button size="mini" type="primary" @click="showImageSlide(props.row.pictures)">备注图</el-button>
              </span>
            </el-form-item>
            <el-form-item label="">
              <span class="listInfoContent">
                <el-button size="mini" type="primary" @click="gotoInfo(props.row)">检验结果明细</el-button>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" width="100px" prop="flag" label="结果">
        <template slot-scope="scope">
          <div>
            <span :style="scope.row.flag==0?'color:red':'color:green'">{{ scope.row.flag==0?'不合格':'合格' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" width="120px" prop="type" label="类型">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.type==0">终端首检</span>
            <span v-else-if="scope.row.type==1">QC首检</span>
            <span v-else-if="scope.row.type==2">自检</span>
            <span v-else-if="scope.row.type==3">巡检</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="inspectTime " label="检验时间">
        <template slot-scope="scope">
          <div>
            <i v-if="scope.row.inspectTime" class="el-icon-time"></i>
            <span>{{ scope.row.inspectTime | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable prop="plant" label="车间"></el-table-column>
      <el-table-column sortable prop="process" label="机台"></el-table-column>
      <el-table-column sortable prop="ptno" label="产品"></el-table-column>

      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <div class="audi">
            <el-button v-if="scope.row.flag==0&&scope.row.isFinish==1" @click="audi(scope)" type="primary">审核</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="esop-goPage inspecRecord-list-goPage ">
      <el-pagination @current-change="goPage" :page-size="pageSize" background layout="prev, pager, next" :total="count">
      </el-pagination>
    </div>

    <el-dialog :modal="false" title="是否允许将此纪录审核通过?" :visible.sync="dialogFormVisible">
      <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入审核备注信息" v-model="inputs.audiTextareas">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="audiSub()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图片轮播 -->
    <transition name="slide-fade" class="fadeView">
      <div v-if="imgInfoShow">
        <image-view class="imgViewBox" :imgArr="imgArr" :showImageView="true" :imageIndex="imageIndex" v-on:hideImage="imgInfoHidefn"></image-view>
      </div>
    </transition>
  </div>
</template>
<script>
import url from "api";
import imageView from "vue-imageview";
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "rcordList",
  data() {
    return {
      dialogFormVisible: false,
      curPage: 8,
      pageSize: 15,
      count: 0,
      formShow: false,
      tableList: [],
      inputs: {
        plant: "",
        line: "",
        process: "",
        ptno: "",
        flag: "",
        id: "",
        audiTextareas: "",
        dates: []
      },
      selects: {
        plantOptions: [],
        lineOptions: [],
        processOptions: [],
        ptnoOptions: [],
        flagOptions: [
          {
            label: "合格",
            value: "1"
          },
          {
            label: "不合格",
            value: "0"
          }
        ]
      },
      //图片查看
      imgInfoShow: false,
      imgArr: [],
      imageIndex: 0,

      dateRangeOpt: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.date_init();
    this.init();
  },
  methods: {
    //时间初始化
    date_init() {
      let fmtStart = "yyyy-MM-dd 00:00:00";
      let fmtEnd = "yyyy-MM-dd 23:59:59";
      let oneDay = 86400000;
      let dayBefore90 = new Date() - oneDay * 30;
      this.inputs.dates = [
        $dataFormat(new Date(dayBefore90), fmtStart),
        $dataFormat(new Date(), fmtEnd)
      ];
    },
    //初始化
    init() {
      this.getPlantSelect();
      this.get_list(1);
    },
    //请求列表信息
    get_list(page) {
      let params = {
        plant: this.inputs.plant,
        line: this.inputs.line,
        process: this.inputs.process,
        ptno: this.inputs.ptno,
        flag: this.inputs.flag,
        page: page,
        pageSize: this.pageSize,
        startTime: this.inputs.dates[0],
        endTime: this.inputs.dates[1]=="NaN-aN-aN aN:aN:aN"?'':this.inputs.dates[1]
      };
      console.log(params);
      this.$get({
        url: url.getInspectRecord,
        params: params
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.count = res.data.count;
          this.tableList = [];
          for (let item of res.data.resultList) {
            this.tableList.push(item);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //按条件查询
    search() {
      this.get_list(1);
    },
    goPage(curPage) {
      this.get_list(curPage);
    },
    //审核
    audi(scope) {
      this.inputs.id = scope.row.id;
      this.dialogFormVisible = true;
    },
    //通过审核
    audiSub() {
      let data = {
        id: this.inputs.id,
        remark: this.inputs.audiTextareas
      };
      this.$post({
        url: url.aduitInspect,
        data: data
      }).then(res => {
        if (res.code == 1) {
          this.get_list(this.curPage);
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //筛选信息
    //查询车间下拉信息
    getPlantSelect() {
      this.selects.plantOptions = [];
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.set_optionFam("plant", this.selects.plantOptions, res.data);
        }
      });
    },
    //查询制程下拉信息
    getLineSelect(plant) {
      this.selects.lineOptions = [];
      this.$get({
        url: url.check_getLine,
        params: { plant: plant }
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam("line", this.selects.lineOptions, res.data);
        }
      });
    },
    //查询机台下拉信息
    getProcessSelect(plant, line) {
      this.selects.processOptions = [];
      this.$get({
        url: url.check_getProcess,
        params: { plant: plant, line: line }
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.set_optionFam("process", this.selects.processOptions, res.data);
        }
      });
    },
    //查询产品编码下拉信息
    getPtnoSelect(plant) {
      this.selects.ptnoOptions = [];
      this.$get({
        url: url.check_getPartno,
        params: { plant: plant }
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.set_optionFam("ptno", this.selects.ptnoOptions, res.data);
        }
      });
    },
    //设置下拉信息
    set_optionFam(type, tagArr, data) {
      for (let opt of data) {
        let label = null;
        let value = null;
        if (type == "plant") {
          label = opt.plant + "-" + opt.plantdesc;
          value = opt.plant;
        } else if (type == "line") {
          label = opt.line + "-" + opt.linedesc;
          value = opt.line;
        } else if (type == "process") {
          label = opt.process + "-" + opt.processname;
          value = opt.process;
        } else if (type == "ptno") {
          label = opt.ptno + "-" + opt.ptnm;
          value = opt.ptno;
        }
        let option = {
          label: label,
          value: value
        };
        tagArr.push(option);
      }
    },
    //车间发生选择
    plantSelectChange() {
      let plant = this.inputs.plant;
      this.inputs.line = "";
      this.inputs.process = "";
      this.getLineSelect(plant);
      this.getPtnoSelect(plant);
    },
    //制程发生选择
    lineSelectChange() {
      let plant = this.inputs.plant;
      let line = this.inputs.line;
      this.inputs.process = "";
      if (this.inputs.line != "") {
        this.getProcessSelect(plant, line);
      }
    },
    //展示备注图
    showImageSlide(imgs) {
      if (imgs.length < 1) {
        this.$message.error("没有相关备注图");
        return;
      }
      for (let imgPath of imgs) {
        console.log(imgPath);
        this.$get_file({
          url: url.file_get,
          params: { path: imgPath }
        }).then(res => {
          console.log(res);
          this.imgArr.push(res);
        });
      }
      this.imgInfoShow = true;
    },
    imgInfoHidefn() {
      this.imgInfoShow = false;
    },
    //曾经审核过得
    rowStyle(obj) {
      if(1==obj.row.isAudit){
        return "beforError";
      }
    },
    //跳转到明细
    gotoInfo(obj) {
      let params = {
        id: obj.id
      };
      this.$get({
        url: url.getInspectRecordDetail,
        params: params
      }).then(res => {
        if (res.code == 1) {
          console.log(res);
          this.$store.dispatch("set_checklist", res.data);
          this.$emit("choiceListen", false);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //张开行时候的事件
    expandChange(row,erow){
      console.log(row);
      console.log(erow);
    }
  },
  components: {
    imageView
  }
};
</script>
