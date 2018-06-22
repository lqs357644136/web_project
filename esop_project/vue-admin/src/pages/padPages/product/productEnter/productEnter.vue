<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <productComponent :isInfo="true" :productInfo="info"></productComponent>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import productComponent from "../productComponent/productComponent.vue";
import url from "api";

export default {
  data() {
    return {
      info: {
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
          badCodeList:[],//不良代码
        }
      }
    };
  },
  created(){
    this.get_selectOption();
  },
  components: {
    panelTitle,
    productComponent
  },
  methods: {
    //获取下拉数据
    get_selectOption() {
      let self = this;
      self.$get({
        url:url.product_info
      }).then(res => {
        if(res.code == 1){
          self.$message.success(res.msg);
          self.info.productSelects.caseList = self.eachSetSelect(res.data.caseList);
          self.info.productSelects.customerList = self.eachSetSelect_customer(res.data.customerList);
          self.info.productSelects.partnoList = self.eachSetSelect_partno(res.data.partnoList);
          self.info.productSelects.resumeTypeList = self.eachSetSelect(res.data.resumeTypeList);
          self.info.productSelects.happenReasonList = self.eachSetSelect(res.data.happenReasonList);
          self.info.productSelects.happenFrequencyList = self.eachSetSelect(res.data.happenFrequencyList);
          self.info.productSelects.outputReasonList = self.eachSetSelect(res.data.outputReasonList);
          self.info.productSelects.progressList = self.eachSetSelect(res.data.progressList);
          self.info.productSelects.badCodeList = self.eachSetSelect(res.data.badCodeList);
        }else{
          self.$message.error(res.msg);
        }
      });
    },
    //循环录入下拉框数据
    eachSetSelect(targerArr){
      let arr = [];
      for(let item of targerArr){
        let obj = {
          label:item,
          value:item
        }
        arr.push(obj);
      }
      return arr;
    },
    //循环录入下拉框数据(客户)
    eachSetSelect_customer(targerArr){
      let arr = [];
      for(let item of targerArr){
        let obj = {
          label:item.custName,
          value:item.custNo
        }
        arr.push(obj);
      }
      return arr;
    },
    //循环录入下拉框数据(产品)
    eachSetSelect_partno(targerArr){
      let arr = [];
      for(let item of targerArr){
        let obj = {
          label:item.ptnm,
          value:item.ptno
        }
        arr.push(obj);
      }
      return arr;
    }
  }
};
</script>
