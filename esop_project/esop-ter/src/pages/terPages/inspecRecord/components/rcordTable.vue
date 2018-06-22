<template>
    <div class="rcordTable animated slideInRight">
        <tableMain :tableData="tableData"></tableMain>
        <div class="backBtn">
            <el-button type="primary" plain @click="backBtn()">返回</el-button>
        </div>
    </div>
</template>

<script>
import tableMain from './table/tableMain.vue'
import { mapGetters } from "vuex";
export default {
  name: "rcordTable",
  data() {
    return {
        tableData:{
            info:{},
            list:[]
        },
    };
  },
  computed: {
    ...mapGetters({
      checkList: "get_checklist"
    })
  },
  mounted() {
    this.data_init();
  },
  methods: {
    //初始化数据格式
    data_init() {
      this.tableData.info  = this.checkList.inspect;
      this.tableData.list  = this.checkList.specList;
    },
    backBtn() {
      this.$emit("choiceListen", true);
    }
  },
  components: {
    tableMain
  }
};
</script>

