<template>
  <div class="rcordList">
    <el-form class="listForm">
      <el-card :class="formShow?'box-card':'box-card card-body-hidden'">
        <div slot="header" class="clearfix">
          <span>基础信息</span>
          <span class="card-hidden-btn" @click="formShow=!formShow">
            <i :class="formShow?'fa fa-angle-double-up':'fa fa-angle-double-down'"></i>
          </span>
        </div>
        <div class="form_body">
          <el-row class="forms" :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="车间">
                <el-input :disabled="true" v-model="inputs.plant" placeholder="车间"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="线程">
                <el-input :disabled="true" v-model="inputs.line" placeholder="线程"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="工位">
                <el-input :disabled="true" v-model="inputs.process" placeholder="工位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="产品编码">
                <el-input :disabled="true" v-model="inputs.plant" placeholder="产品编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16">
              <el-form-item label="日期" prop="dates">
                <el-date-picker @change="get_list(1)" v-model="inputs.dates" :editable="false" :picker-options="dateRangeOpt" :unlink-panels="true" range-separator=" - " format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-form>

    <el-table :highlight-current-row="false" :data="tableList" align="center" height="100%" border class="tabelList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="类型">
              <span class="listInfoContent" v-if="props.row.type==0">终端首检</span>
              <span class="listInfoContent" v-if="props.row.type==1">QC首检</span>
              <span class="listInfoContent" v-if="props.row.type==2">自检</span>
              <span class="listInfoContent" v-if="props.row.type==3">巡检</span>
              <span class="listInfoContent" v-if="props.row.type==4">末检</span>
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
            <el-form-item label="备注信息">
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
      <el-table-column align="center" prop="flag" label="结果">
        <template slot-scope="scope">
          <div>
            <span :style="scope.row.flag==0?'color:red':'color:green'">{{ scope.row.flag==0?'不合格':'合格' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.type==0">终端首检</span>
            <span v-else-if="scope.row.type==1">QC首检</span>
            <span v-else-if="scope.row.type==2">自检</span>
            <span v-else-if="scope.row.type==3">巡检</span>
            <span v-else-if="scope.row.type==4">末检</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="inspectTime " label="检验时间">
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
    </el-table>

    <div class="esop-goPage inspecRecord-list-goPage ">
      <el-pagination @current-change="goPage" :page-size="pageSize" background layout="prev, pager, next" :total="count">
      </el-pagination>
    </div>

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
        dates: []
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
      let fmt = "yyyy-MM-dd hh:mm:ss";
      let oneDay = 86400000;
      let dayBefore90 = new Date() - oneDay * 1;
      this.inputs.dates = [
        $dataFormat(new Date(), fmtStart),
        $dataFormat(new Date(), fmt)
      ];
    },
    //初始化
    init() {
      this.mac_init();
    },
    //初始化机器信息
    mac_init() {
      let macInfo = Window.GETMACINFO();
      this.inputs.plant = macInfo.plant;
      this.inputs.line = macInfo.line;
      this.inputs.process = macInfo.equipNo;
      this.inputs.ptno = macInfo.ptno;
      this.get_list(1);
    },
    //请求列表信息
    get_list(page) {
      this.$get_noToken({
        url: this.$api_baseurl(url.getInspectRecord),
        params: {
          plant: this.inputs.plant,
          line: this.inputs.line,
          process: this.inputs.process,
          //  ptno: this.inputs.ptno,
          page: page,
          pageSize: this.pageSize,
          startTime: this.inputs.dates[0],
          endTime: this.inputs.dates[1]
        }
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
    goPage(curPage) {
      this.get_list(curPage);
    },
    //展示备注图
    showImageSlide(imgs) {
      if (imgs.length < 1) {
        this.$message.error("没有相关备注图");
        return;
      }
      for (let imgPath of imgs) {
        this.$get_file({
          url: this.$api_baseurl(url.file_get),
          params: { path: imgPath }
        }).then(res => {
          this.imgArr.push(res);
        });
      }
      this.imgInfoShow = true;
    },
    imgInfoHidefn() {
      this.imgInfoShow = false;
    },
    //跳转到明细
    gotoInfo(obj) {
      let params = {
        id: obj.id
      };
      this.$get_noToken({
        url: this.$api_baseurl(url.getInspectRecordDetail),
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
    }
  },
  components: {
    imageView
  }
};
</script>
