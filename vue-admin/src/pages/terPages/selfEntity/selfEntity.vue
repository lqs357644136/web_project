<template>
    <div class="panel">
        <panel-title :back="true" :title="$route.meta.title"></panel-title>
        <div class="panel-body">
            <check></check>
        </div>
    </div>
</template>
<script>
import check from "./check/check.vue";
import { panelTitle } from "components";
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
        macInfo:{
            equipNo:'',
            empNo:'',
            plant:'',
            line:''
        }
    };
  },
  created() {
    this.check_init();
  },
  components: {
    panelTitle,
    check
  },
  methods: {
    //下拉数据提交
    selectSuccess(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            plant: this.checkInfoInputs.plantInput,
            line: this.checkInfoInputs.lineInput,
            process: this.checkInfoInputs.processInput,
            type: this.$router.currentRoute.name == "firstEntity" ? "0" : "1"
          };
          this.get_checkInfo(params);
        } else {
          return false;
        }
      });
    },
    //初始化检查信息
    check_init() {
      //获取机器信息
      let macInfo = Window.GETMACINFO();
      this.macInfo.equipNo = macInfo.equipNo;
      this.macInfo.empNo = macInfo.empNo;
      this.macInfo.plant = macInfo.plant;
      this.macInfo.line = macInfo.line;
      //请求检查信息
      this.get_checkInfo();
    },
    //请求检查页面信息
    get_checkInfo() {
      let params = {
          process:this.macInfo.equipNo,
          plant:this.macInfo.plant,
          line:this.macInfo.line,
      };
      this.$get_noToken({
          url: url.terCheck_info,
          params: params
        }).then(res =>{
          console.log(res)
          if (res.code == 1) {
            this.$message.success(res.msg);
            this.$store.dispatch("set_checklist", res.data);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    //
    //设置下拉信息
    set_optionFam(type, tagArr, data) {
      for (let opt of data) {
        let label = null;
        let value = null;
        if (type == "plant") {
          label = opt.plantdesc;
          value = opt.plant;
        } else if (type == "line") {
          label = opt.linedesc;
          value = opt.line;
        } else if (type == "process") {
          label = opt.processdesc;
          value = opt.process;
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
      let plant = this.checkInfoInputs.plantInput;
      this.checkInfoInputs.lineInput = "";
      this.checkInfoInputs.processInput = "";
      this.getLineSelect(plant);
    },
    //制程发生选择
    lineSelectChange() {
      let plant = this.checkInfoInputs.plantInput;
      let line = this.checkInfoInputs.lineInput;
      this.checkInfoInputs.processInput = "";
      if (this.checkInfoInputs.lineInput != "") {
        this.getProcessSelect(plant, line);
      }
    },
    //查询车间下拉信息
    getPlantSelect() {
      this.selectOptions.plantOption = [];
      this.$get({
        url: url.check_getPlant
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam("plant", this.selectOptions.plantOption, res.data);
        }
      });
    },
    //查询制程下拉信息
    getLineSelect(plant) {
      this.selectOptions.lineOption = [];
      this.$get({
        url: url.check_getLine,
        params: { plant: plant }
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam("line", this.selectOptions.lineOption, res.data);
        }
      });
    },
    //查询机台下拉信息
    getProcessSelect(plant, line) {
      this.selectOptions.processOption = [];
      this.$get({
        url: url.check_getProcess,
        params: { plant: plant, line: line }
      }).then(res => {
        if (res.code == 1) {
          this.set_optionFam(
            "process",
            this.selectOptions.processOption,
            res.data
          );
        }
      });
    }
  }
};
</script>

