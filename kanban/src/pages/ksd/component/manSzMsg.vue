<template>
    <div class="manSzMsg">
        <table border="1" cellspacing="0">
            <tr>
                <td class="msgTitle">月累计直通率</td>
                <td class="msgBody">{{msgs.monthDirectRate}}</td>
                <td class="msgTitle">主要不良原因</td>
                <td class="msgBody">{{msgs.majorCauses}}</td>
            </tr>
            <tr>
                <td class="msgTitle">人员离岗信息</td>
                <td colspan="3">
                    <marquee class="scrollMsg">
                            <div class="scrollBox" v-for="(item,index) in msgs.empAwayInfo" :key="index">
                                <img :src="item.photo" alt="">
                                <span>{{item.scrollText}}</span>
                                |
                            </div>

                    </marquee>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: "manSzMsg",
  props: ["msgs"]
};
</script>
