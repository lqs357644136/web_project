<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">

      <div class="workStep">

        <div class="stepGroup">
          <div class="stepName">首件管理</div>
          <el-steps :space="230" :active="1" finish-status="success">
            <el-step title="等待开发"></el-step>
            <el-step title="正在开发"></el-step>
            <el-step title="开发完毕"></el-step>
          </el-steps>
        </div>

        <div class="stepGroup">
          <div class="stepName">产品履历</div>
          <el-steps :space="230" :active="1" finish-status="success">
            <el-step title="等待开发"></el-step>
            <el-step title="正在开发"></el-step>
            <el-step title="开发完毕"></el-step>
          </el-steps>
        </div>

        <div class="stepGroup">
          <div class="stepName">注意事项</div>
          <el-steps :space="230" :active="1" finish-status="success">
            <el-step title="等待开发"></el-step>
            <el-step title="正在开发"></el-step>
            <el-step title="开发完毕"></el-step>
          </el-steps>
        </div>

        <div class="stepGroup">
          <div class="stepName">自检管理</div>
          <el-steps :space="230" :active="1" finish-status="success">
            <el-step title="等待开发"></el-step>
            <el-step title="正在开发"></el-step>
            <el-step title="开发完毕"></el-step>
          </el-steps>
        </div>

        <div class="stepGroup">
          <div class="stepName">巡检管理</div>
          <el-steps :space="230" :active="1" finish-status="success">
            <el-step title="等待开发"></el-step>
            <el-step title="正在开发"></el-step>
            <el-step title="开发完毕"></el-step>
          </el-steps>
        </div>


      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

.workStep{
  .stepGroup{
    display: flex;
    flex-direction: row;
    margin-bottom:20px;
    .stepName{
      line-height:56px;
      margin-right: 30px;
    }
  }
}

</style>


<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      msg: "home page"
    };
  },
  components: {
    panelTitle
  }
};
</script>
