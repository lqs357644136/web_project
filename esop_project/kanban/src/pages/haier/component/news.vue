<template>
  <div class="news">
    <div class="states">
      <div v-show="newsData==0" class="running isBegin">
        <span class="begin_animation">
          <div class="warning"></div>
        </span>
        <span class="text">
          <span>
            <b>正在生产</b>
          </span>
        </span>
      </div>
      <div v-show="newsData==1" class="running isResset">
        <span class="text">
          <i class="fa fa-pause"></i>
          <span>
            <b>生产休息</b>
          </span>
        </span>
      </div>
      <div v-show="newsData==4" class="running isStop">
        <span class="text">
          <i class="fa fa-pause"></i>
          <span>
            <b>生产故障</b>
          </span>
        </span>
      </div>
      <div v-show="newsData==2" class="running isBuild">
        <span class="text">
          <i class="fa fa-pause"></i>
          <span>
            <b>生产维修</b>
          </span>
        </span>
      </div>
      <div v-show="newsData==3" class="running isKeep">
        <span class="text">
          <i class="fa fa-pause"></i>
          <span>
            <b>生产保养</b>
          </span>
        </span>
      </div>
      <div v-show="newsData==-1" class="running">
        <span class="begin_animation">
          <!-- <div class="warning"></div> -->
        </span>
        <span class="text">
          <span>
            <!-- <b>正在生产</b> -->
          </span>
        </span>
      </div>
      <div class="statesBtns">
        <div :class="newsData=='0'?'bron':''">生产</div>
        <div :class="newsData=='1'?'resset':''">休息</div>
        <div :class="newsData=='4'?'error':''">故障</div>
        <div :class="newsData=='2'?'build':''">维修</div>
        <div :class="newsData=='3'?'keep':''">保养</div>
      </div>
    </div>
    <div class="msg">
      <!-- <marquee direction=right scrollamount=4 class="text">工位01出线问题工位01出线问题工位01出线问题工位01出线问题工位01出线问题</marquee> -->
      <!-- <span class="text">工位01出线问题工位01出线问题工位01出线问题工位01出线问题工位01出线问题</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "news",
  props: ["newsData"],
  data() {
    return {
      //newsData: -1
    };
  }
};
</script>
