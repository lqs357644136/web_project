<template>

    <el-form :model="productInputs" :rules="rules" ref="productInputs" label-position="right" class="product">

        <div class="formImg">

            <el-row :gutter="10">

                <el-col class="productFroms" :xs="24" :sm="24" :md="16" :lg="16">
                    <!-- 信息 -->
                    <el-tabs type="border-card">

                        <el-tab-pane class="productFromsItem">
                            <span slot="label">履历信息</span>
                            <div class="productFromsItem-body">

                                <el-row class="norm" :gutter="30">
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="案号" prop="caseNo">
                                            <el-select v-if="isInfo" v-model="productInputs.caseNo" placeholder="请选择">
                                                <el-option v-for="item in productSelects.caseList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.caseNo" v-else placeholder="案号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="客户" prop="customerName">
                                            <el-select v-if="isInfo" v-model="productInputs.customerName" placeholder="请选择">
                                                <el-option v-for="item in productSelects.customerList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.customerName" v-else placeholder="客户"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="品名" prop="productName">
                                            <el-select v-if="isInfo" v-model="productInputs.productName" placeholder="请选择">
                                                <el-option v-for="item in productSelects.partnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.productName" v-else placeholder="品名"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="不良数" prop="badNumber">
                                            <el-input :disabled="!isInfo" v-model="productInputs.badNumber" type="number" placeholder="不良数"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="不良代码" prop="badCode">
                                            <el-select v-if="isInfo" v-model="productInputs.badCode" placeholder="请选择">
                                                <el-option v-for="item in productSelects.badCodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.badCode" v-else placeholder="不良代码"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="履历类型" prop="resumeType">
                                            <el-select v-if="isInfo" v-model="productInputs.resumeType" placeholder="请选择">
                                                <el-option v-for="item in productSelects.resumeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.resumeType" v-else placeholder="履历类型"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="发生频度" prop="happenFrequency">
                                            <el-select v-if="isInfo" v-model="productInputs.happenFrequency" placeholder="请选择">
                                                <el-option v-for="item in productSelects.happenFrequencyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-else v-model="productInputs.happenFrequency" placeholder="发生频度"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12" prop="happenDate">
                                        <el-form-item label="发生日期">
                                            <el-date-picker :disabled="!isInfo" :editable="false" v-model="productInputs.happenDate" type="date" placeholder="发生日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>
                        </el-tab-pane>

                        <el-tab-pane class="productFromsItem">
                            <span slot="label">具体原因</span>
                            <div class="productFromsItem-body">

                                <el-row :gutter="30">
                                    <el-col :span="24">
                                        <el-form-item label="发生原因" prop="happenReason">
                                            <el-select v-if="isInfo" multiple collapse-tags v-model="productInputs.happenReason" placeholder="请选择">
                                                <el-option v-for="item in productSelects.happenReasonList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.happenReason" v-else placeholder="发生原因"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="24">
                                        <el-form-item label="输出原因" prop="outputReason">
                                            <el-select v-if="isInfo" multiple collapse-tags v-model="productInputs.outputReason" placeholder="请选择">
                                                <el-option v-for="item in productSelects.outputReasonList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-model="productInputs.outputReason" v-else placeholder="输出原因"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="原因" prop="reason">
                                            <el-input :disabled="!isInfo" v-model="productInputs.reason" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>
                        </el-tab-pane>

                        <el-tab-pane class="productFromsItem">
                            <span slot="label">对策内容</span>
                            <div class="productFromsItem-body">

                                <el-row :gutter="30">
                                    <el-col :span="24">
                                        <el-form-item label="对策进度" prop="progress">
                                            <el-select v-if="isInfo" v-model="productInputs.progress" placeholder="请选择">
                                                <el-option v-for="item in productSelects.progressList " :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                            <el-input :disabled="!isInfo" v-else v-model="productInputs.progress" placeholder="对策进度"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="对策" prop="countermeasure">
                                            <el-input :disabled="!isInfo" v-model="productInputs.countermeasure" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="改善后数据" prop="afterContent">
                                            <el-input :disabled="!isInfo" v-model="productInputs.afterContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="不良内容" prop="badContent">
                                            <el-input :disabled="!isInfo" v-model="productInputs.badContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="有效研究" prop="effectiveDate">
                                            <el-radio-group v-if="isInfo" v-model="productInputs.effectiveDate">
                                                <el-radio label="30天">30天</el-radio>
                                                <el-radio label="60天">60天</el-radio>
                                                <el-radio label="90天">90天</el-radio>
                                            </el-radio-group>
                                            <el-input :disabled="!isInfo" v-else v-model="productInputs.effectiveDate" placeholder="有效研究"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </el-col>

                <el-col class="productImg" :xs="24" :sm="24" :md="8" :lg="8">
                    <!-- 产品图片 -->
                    <div>
                        <!-- 查看 -->
                        <div class="imgInfo" v-if="!isInfo">

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>不良写真</span>
                                </div>
                                <div class="imgItemBody">
                                    <img @click="imgInfoShowfn()" :src="imgInfo.badPicture_imageUrl" alt="">
                                </div>
                            </el-card>

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>改善后写真</span>
                                </div>
                                <div class="imgItemBody">
                                    <img @click="imgInfoShowfn()" :src="imgInfo.improvePicture_imageUrl" alt="">
                                </div>
                            </el-card>

                            <transition name="slide-fade" class="fadeView">
                                <div v-if="imgInfoShow">
                                    <image-view class="imgViewBox" :imgArr="imgArr" :showImageView="true" :imageIndex="imageIndex" v-on:hideImage="imgInfoHidefn"></image-view>
                                </div>
                            </transition>
                        </div>

                        <!-- 上传 -->
                        <div class="imgUpdate" v-else>
                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>不良写真</span>
                                </div>
                                <el-upload class="avatar-uploader imgItemBody" :action="imgUpload.uploadUrl" :headers="imgUpload.headers" :show-file-list="false" :on-success="badPicture_Success" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
                                    <img v-if="imgUpload.badPicture_imageUrl" :src="imgUpload.badPicture_imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-card>

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>改善后写真</span>
                                </div>
                                <el-upload class="avatar-uploader imgItemBody" :action="imgUpload.uploadUrl" :headers="imgUpload.headers" :show-file-list="false" :on-success="improvePicture__Success" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
                                    <img v-if="imgUpload.improvePicture_imageUrl" :src="imgUpload.improvePicture_imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-card>
                        </div>

                    </div>
                </el-col>
            </el-row>

        </div>

        <el-form-item class="subBtn">
            <el-button type="primary" @click="goSubmit('productInputs')" v-if="isInfo">提交</el-button>
            <!-- <el-button type="primary" @click="goSave()" v-if="isInfo">保存</el-button> -->
            <el-button v-else @click="goInfo()">返回</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
import imageView from "vue-imageview";
import { mapGetters } from "vuex";
import url from "api";
export default {
  data() {
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请进行选择"));
      } else {
        callback();
      }
    };
    return {
      //下拉选择数据
      productSelects: {
        caseList: [], //案号
        customerList: [], //客户
        partnoList: [], //品名
        resumeTypeList: [], //履历类型
        happenReasonList: [], //发生原因
        happenFrequencyList: [], //发生频度
        outputReasonList: [], //输出原因
        progressList: [], //对策进度
        badCodeList: [] //不良代码
      },
      //所需提交的数据
      productInputs: {
        caseNo: "", //案号
        customerName: "", //客户
        productName: "", //品名
        resumeType: "", //履历类型
        badNumber: "", //不良数
        happenReason: "", //发生原因
        happenFrequency: "", //发生频度
        outputReason: "", //输出原因
        happenDate: "", //发生日期
        progress: "", //对策进度
        reason: "", //原因
        countermeasure: "", //对策
        afterContent: "", //改善后数据
        effectiveDate: "", //有效研究
        badPicture: "", //不良写真
        improvePicture: "", //改善后写真
        badContent: "", //不良内容
        badCode: "" //不良代码
        //多余字段
        // bpmStatus: "string",
        // createBy: "string",
        // createDate: "2018-01-03T06:39:13.260Z",
        // createName: "string",
        // id: "string",
        // sysCompanyCode: "string",
        // sysOrgCode: "string",
        // updateBy: "string",
        // updateDate: "2018-01-03T06:39:13.260Z",
        // updateName: "string"
      },
      //下拉验证规则
      rules: {
        caseNo: [{ validator: checkSelect, trigger: "blur" }],
        customerName: [{ validator: checkSelect, trigger: "blur" }],
        productName: [{ validator: checkSelect, trigger: "blur" }],
        resumeType: [{ validator: checkSelect, trigger: "blur" }],
        badNumber: [{ validator: checkSelect, trigger: "blur" }],
        happenReason: [{ validator: checkSelect, trigger: "blur" }],
        happenFrequency: [{ validator: checkSelect, trigger: "blur" }],
        outputReason: [{ validator: checkSelect, trigger: "blur" }],
        happenDate: [{ validator: checkSelect, trigger: "blur" }],
        progress: [{ validator: checkSelect, trigger: "blur" }],
        reason: [{ validator: checkSelect, trigger: "blur" }],
        countermeasure: [{ validator: checkSelect, trigger: "blur" }],
        afterContent: [{ validator: checkSelect, trigger: "blur" }],
        effectiveDate: [{ validator: checkSelect, trigger: "blur" }],
        badContent: [{ validator: checkSelect, trigger: "blur" }],
        badCode: [{ validator: checkSelect, trigger: "blur" }]
      },
      timeRadio: 3,
      //图片查看
      imgInfoShow: false,
      imgArr: [],
      imageIndex: 0,
      imgInfo: {
        badPicture_imageUrl: "",
        improvePicture_imageUrl: ""
      },
      //图片上传
      imgUpload: {
        uploadUrl:
          this.$api_baseurl(
            this.$store.getters.get_host ? this.$store.getters.get_host : ""
          ) + url.file_POST, //上传地址
        badPicture_imageUrl: "",
        improvePicture_imageUrl: "",
        headers: {
          token: this.$store.getters.get_token,
          Accept: "application/json"
        }
      }
    };
  },
  props: ["isInfo", "productInfo"],
  created() {},
  mounted() {
    this.product_inti();
  },
  computed: {
    ...mapGetters({
      pInfo: "get_productinfo"
    })
  },
  components: {
    imageView
  },
  methods: {
    //初始化下拉框
    product_inti() {
      if (this.isInfo) {
        this.productSelects = this.productInfo.productSelects;
      } else {
        this.productInputs = this.pInfo;
        this.get_productInfo_imgPath({
          badPicture: this.productInputs.badPicture,
          improvePicture: this.productInputs.improvePicture
        });
      }
    },
    //获取履历信息图片地址
    get_productInfo_imgPath(getUrls) {
      this.$get_file({
        url: url.file_get,
        params: { path: getUrls.badPicture }
      }).then(res => {
        this.imgInfo.badPicture_imageUrl = res;
        this.imgArr.push(res);
      });
      this.$get_file({
        url: url.file_get,
        params: { path: getUrls.improvePicture }
      }).then(res => {
        this.imgInfo.improvePicture_imageUrl = res;
        this.imgArr.push(res);
      });
    },
    imgInfoShowfn() {
      this.imgInfoShow = true;
    },
    imgInfoHidefn() {
      this.imgInfoShow = false;
    },
    badPicture_Success(res, file) {
      this.$message.success(res.msg);
      this.productInputs.badPicture = res.data;
      this.imgUpload.badPicture_imageUrl = URL.createObjectURL(file.raw);
    },
    improvePicture__Success(res, file) {
      this.$message.success(res.msg);
      this.productInputs.improvePicture = res.data;
      this.imgUpload.improvePicture_imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(res) {
      this.$message.error(res.msg);
    },
    //上传图片格式大小验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLtM = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLtM) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLtM;
    },
    //履历详情放回列表
    goInfo() {
      this.$emit("chioceListen", "table");
    },
    //履历录入提交
    goSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.productInputs.badPicture.length > 0 &&
            this.productInputs.improvePicture.length > 0
          ) {
            this.productInputs.happenReason = this.reasonSubmitChange(
              this.productInputs.happenReason
            );
            this.productInputs.outputReason = this.reasonSubmitChange(
              this.productInputs.outputReason
            );
            this.$post({
              url: url.product_add,
              data: this.productInputs
            }).then(res => {
              if (res.code == 1) {
                this.$message.success(res.msg);
                this.$alert(res.msg, "录入成功", {
                  confirmButtonText: "前往列表",
                  callback: action => {
                   this.$router.push('/product/productInfo')
                  }
                });
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$notify({
              message: "请上传写真",
              type: "error"
            });
          }
        } else {
          this.$notify({
            title: "表单填写有误",
            message: "请检查表单是否点写有误",
            type: "error"
          });
        }
      });
    },
    //发生原因与输出原因,提交格式处理
    reasonSubmitChange(reasonArr) {
      return reasonArr.toString();
    },
    goSave(formName) {}
  }
};
</script>

