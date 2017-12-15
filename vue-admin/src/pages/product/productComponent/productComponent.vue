<template>

    <el-form label-position="right" label-width="85px" class="product">

         <div class="formImg">

            <el-row :gutter="10">

                <el-col class="productFroms" :xs="24" :sm="24" :md="16" :lg="16">
                    <!-- 信息 -->
                    <el-tabs  type="border-card">

                        <el-tab-pane class="productFromsItem">
                            <span slot="label">履历信息</span>
                            <div class="productFromsItem-body">

                                <el-row :gutter="30">
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="案号">
                                            <el-input placeholder="案号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="客户">
                                            <el-input placeholder="客户"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="品名">
                                            <el-input placeholder="品名"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="不良数">
                                            <el-input placeholder="不良数"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="履历类型">
                                            <el-input placeholder="履历类型"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="发生源原因">
                                            <el-input placeholder="发生源原因"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="流出源原因">
                                            <el-input placeholder="流出源原因"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="发生频度">
                                            <el-input placeholder="发生频度"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="发生频度">
                                            <el-input placeholder="发生频度"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                        <el-form-item label="发生日期">
                                            <el-date-picker v-model="happenDate" type="date" placeholder="发生日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="不良内容">
                                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>
                        </el-tab-pane>

                        <el-tab-pane class="productFromsItem">
                            <span slot="label">对策原因</span>
                            <div class="productFromsItem-body">

                                <el-row :gutter="30">
                                    <el-col :span="12">
                                        <el-form-item label="对策进度">
                                            <el-input placeholder="对策进度"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="原因">
                                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="对策">
                                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="改善后数据">
                                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="有效时间">
                                            <el-radio-group v-model="timeRadio">
                                                <el-radio :label="3">30天</el-radio>
                                                <el-radio :label="6">60天</el-radio>
                                                <el-radio :label="9">90天</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </el-col>

                <el-col class="productImg" :xs="24" :sm="24" :md="8" :lg="8">
                    <!-- 产品图片 -->
                    <div >

                        <!-- 查看 -->
                        <div class="imgInfo" v-if="type">

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>不良写真</span>
                                </div>
                                <div>
                                    <img @click="imgInfoShowfn()" src="../img/testPicture.png" alt="">
                                </div>
                            </el-card>

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>改善后写真</span>
                                </div>
                                <div>
                                    <img @click="imgInfoShowfn()" src="../img/testPicture.png" alt="">
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
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-card>

                            <el-card class="box-card imgItem">
                                <div slot="header" class="clearfix">
                                    <span>改善后写真</span>
                                </div>
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-card>
                        </div>

                    </div>
                </el-col>
            </el-row>

      </div>

        
        <el-form-item class="subBtn">
            <el-button type="primary" @click="goSubmit()" v-if="!type">提交</el-button>
            <el-button type="primary" @click="goSave()" v-if="type">保存</el-button>
            <el-button v-if="type" @click="goInfo()">返回</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
import imageView from "vue-imageview";
import img from '../img/testPicture.png';
export default {
  data() {
    return {
      //表单群
      happenDate: "",
      timeRadio: 3,
      //图片查看
      imgInfoShow: false,
      imgArr: [img],
      imageIndex: 0,
      //图片上传
      imageUrl: ""
    };
  },
  props: ["productType"],
  created() {},
  computed: {
    type: function() {
      return this.productType == "enter" ? false : true;
    }
  },
  components: {
    imageView
  },
  methods: {
    imgInfoShowfn() {
      this.imgInfoShow = true;
    },
    imgInfoHidefn() {
      this.imgInfoShow = false;
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(res) {
      console.log(res);
      this.$message.error("上传失败,无法连接服务器");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goInfo() {
      this.$emit("chioceListen", "table");
    },
    goSubmit() {
      this.$notify({
        title: "提交成功",
        message: "请到列表查看",
        type: "success"
      });
    },
    goSave() {
      this.$notify({
        title: "保存成功",
        message: "请到列表查看",
        type: "success"
      });
    }
  }
};
</script>

