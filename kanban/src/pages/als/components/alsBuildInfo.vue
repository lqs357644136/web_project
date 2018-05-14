<template>
    <div class="alsBuildInfo">
        <table class="table01" border="1" cellspacing="0">
            <tr>
                <td class="managerTd">
                    <b>人员信息</b>
                </td>
                <td rowspan="4" class="attendanceTd">
                    <div class="attendance">
                        <span>
                            <b>应出勤人数 : </b>{{info.attendance.attPersonQty}}</span>
                        <span>
                            <b>实际勤人数 : </b>{{info.attendance.actPersonQty}}</span>
                    </div>
                </td>

            </tr>
            <tr>
                <td class="managerTd">
                    <div>
                        <span class="title">leader:</span>
                        <span>{{info.manager.leader}}</span>
                    </div>

                </td>
            </tr>
            <tr>
                <td class="managerTd">
                    <div>
                        <span class="title">PQC:</span>
                        <span>{{info.manager.qc}}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="managerTd">
                    <div>
                        <span class="title">PT:</span>
                        <span>{{info.manager.pt}}</span>
                    </div>
                </td>
            </tr>
        </table>
        <div class="table02">
            <table class="table02" border="1" cellspacing="0">
                <thead>
                    <tr>
                        <td>工位</td>
                        <td>问题</td>
                        <td>呼叫时间</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in info.andon" :key="index">
                        <td>{{item.processDesc}}</td>
                        <td>{{item.reasonDesc }}</td>
                        <td>{{item.wanringTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default {
  name: "alsBuildInfo",
  props: ["info"],
  data() {
    return {};
  }
};
</script>
