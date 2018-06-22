<template>
  <div class="fileWatch">
    <el-select v-model="filePath" placeholder="请选文件">
      <el-option v-for="item in fileOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="primary" plain @click="msgWatch()">查看图纸</el-button>
  </div>
</template>

<script>
import { androidSOP } from "common/uitl.js";
import { mapGetters } from "vuex";
import url from "api";
export default {
  name: "fileWatch",
  data() {
    return {
      filePath: ""
    };
  },
  computed: {
    ...mapGetters({
      fileOption: "get_entity_filepaths"
    })
  },
  watch: {
    fileOption: function() {
      this.get_filePath();
    }
  },
  methods: {
    //获取图纸
    get_filePath() {
      if (this.fileOption.length > 0) {
        this.filePath = this.fileOption[0].value;
      }
    },
    //查看图纸
    msgWatch() {
      if (this.filePath.length <= 0) return;
      let host = this.$store.getters.get_host;
      let path =
        "http://" + host + "/esop" + url.file_get + "?path=" + this.filePath;
      androidSOP(path);
    }
  }
};
</script>
