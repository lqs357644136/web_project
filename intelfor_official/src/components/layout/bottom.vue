<template>
    <div v-if="bottomShow" class="bottom animated fadeIn">
        <img class="mobileImg" src="~assets/images/bottom/mobile.png" alt="图片">
        <div class="info">
            <div class="compyInfo">
                <div class="phone">
                    <p>咨询热线:
                        <img class="icon" src="~assets/images/navbar/tel.png" alt="tel">
                        <a class="phoneNum" href="tel:400-8166-116">400-8166-116</a>
                    </p>
                    <p>
                        <span>客服邮箱:</span>
                        <a class="email" href="mailto:Sales@intelfor.net">Sales@intelfor.net</a>
                    </p>
                </div>
                <div class="logos">
                    <div class="logo">
                        <p class="text01">INTELFOR</p>
                        <p class="text02">广州智企信息技术有限公司</p>
                    </div>
                </div>
            </div>
            <div class="planInfo">
                <div class="planInfoBox">
                    <div class="title">解决方案</div>
                    <table>
                        <tr>
                            <td>
                                <a href="#" @click="$router.push('/esop');">E-sop</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/kanban');">电子看板</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/andon');">安灯预警</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/EMS');">数字车间</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="#" @click="$router.push('/ecm');">电子叫料</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/esop');">质量管理</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/APS');">ASP</a>
                            </td>
                            <td>
                                <a href="#" @click="$router.push('/terminal');">智能终端</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ewm">
            <img src="~assets/images/bottom/ewm.png" alt="ewm">
        </div>

    </div>
</template>

<script>
export default {
  data(){
      return {
          bottomShow:false,
      }
  },
  created(){
      setTimeout(() => {
          this.bottomShow = true;
      }, 500);
  }
}
</script>
