  <template>
    <div>
        <el-switch v-model="tableFlag" active-text="关闭列表" inactive-text="打开列表">
        </el-switch>
        <el-table v-if="tableFlag" :data="tableList" style="width: 100%">
            <el-table-column prop="num01" label="数据01" width="180">
            </el-table-column>
            <el-table-column prop="num02" label="数据02" width="180">
            </el-table-column>
            <el-table-column label="总数">
                <template slot-scope="scope">
                    <span>{{ scope.row.num01+scope.row.num02 }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.use(ElementUI);

export default {
  name: "secondPages",
  data() {
    return {
        tableFlag:false,
      tableList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        type: "get",
        url: "http://rapapi.org/mockjsdata/31776/testList"
      }).then(res => {
        console.log(res);
        this.tableList = res.data.tableList;
      });
    }
  }
};
</script>

<style>
table td {
  padding: 10px;
}
</style>

