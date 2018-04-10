<template>

  <div class="navbar">
    <div class="warp">
      <div class="navbar-brand" @click="menuClick('home')">
        <div class="disktopLogo">
          <p class="text01">INTELFOR</p>
          <p class="text02">智企信息</p>
        </div>
        <div class="mobileLogo">
          <p class="text01">INTELFOR</p>
        </div>
      </div>
      <div class="navbar-right">
        <div class="disktop">
          <div class="navbar-menu">
            <div @click="menuClick('home')" :class="isChoose=='home'?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-bank"></i> 智企首页</span>
            </div>
            <div  :class="ptIconEx.indexOf(isChoose)!=-1?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-sign-language"></i> 产品&解决方案</span>
              <i class="fa fa-angle-down"></i>
              <div class="more fadeIn">
                <div class="plant">
                  <div class="plantImg">
                    <img src="~assets/images/navbar/plant.png" alt="解决方案">
                  </div>
                  <div class="ptBoxs">
                    <div @click="menuClick(item.name)" class="ptBox" v-for="(item,index) in ptImgs" :key="index">
                      <span class="img"><img :src="item.img" alt="图片"></span>
                      <span class="text">{{item.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div @click="menuClick('success')" :class="isChoose=='success'?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-line-chart"></i> 成功案例</span>
              <i class="fa fa-angle-down"></i>
              <div class="more fadeIn">
                <div class="success">
                  <div class="plantImg">
                    <img src="~assets/images/navbar/success.png" alt="解决方案">
                  </div>
                  <div class="ptBoxs">
                    <div class="ptBox" v-for="(item,index) in scImgs" :key="index">
                      <span class="img"><img :src="item.img" alt="图片"></span>
                      <!-- <span class="text">{{item.name}}</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div @click="menuClick('callme')" :class="isChoose=='callme'?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-user-plus"></i> 联系我们</span>
            </div>
            <div class="tel">
              咨询热线:
              <img class="icon" src="~assets/images/navbar/tel.png" alt="tel">
              <a href="#">400-8166-116</a>
            </div>
          </div>
        </div>
        <div class="mobile">
          <span @click="rightMenuShow=true" class="fa fa-bars btn"></span>
          <div v-if="rightMenuShow" class="rightMenu slideInRight">
            <div @click="rightMenuShow=false" class="cancel">
              <span class="fa fa-remove"></span>
            </div>
            <div @click="$router.push('/home');rightMenuShow=false" class="menuBox"><i class="fa fa-bank"></i>智企首页</div>
            <div @click="!mobile_planShow?mobile_planShow=true:mobile_planShow=false" class="menuBox plan"><i class="fa fa-sign-language"></i>产品&解决方案</div>
            <div class="menuBoxChilds" v-show="mobile_planShow">
              <div v-for="(item,index) in ptImgs" :key="index" @click="$router.push('/'+item.name);rightMenuShow=false" class="menuBoxChild">{{item.title}}</div>
            </div>
            <div @click="$router.push('/success');rightMenuShow=false" class="menuBox"><i class="fa fa-line-chart"></i>成功案例</div>
            <div @click="$router.push('/callme');rightMenuShow=false" class="menuBox"><i class="fa fa-user-plus"></i>联系我们</div>
            <div v-if="!mobile_planShow" class="ewm">
              <img src="~assets/images/bottom/ewm.png" alt="ewm">
            </div>
            <div class="tel">
              <img class="icon" src="~assets/images/navbar/tel.png" alt="tel">
              <a href="tel:400-8166-116">400-8166-116</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      rightMenuShow: false,
      mobile_planShow:false,
      menuBoxStype: {
        isChoose: "nav-menu-box isChoose",
        noChoose: "nav-menu-box"
      },
      ptIconEx:['esop','kanban','andon','quality','ecm','EMS','terminal'],
      ptImgs: [
        { img: require("assets/images/navbar/pt/esop.png"), title: "E-SOP",name:'esop' },
        { img: require("assets/images/navbar/pt/kanban.png"), title: "电子看板",name:'kanban' },
        { img: require("assets/images/navbar/pt/andengyujing.png"), title: "安灯预警",name:'andon' },
        { img: require("assets/images/navbar/pt/shouji_kanban.png"), title: "数字车间" ,name:'EMS' },
        { img: require("assets/images/navbar/pt/dianzijiaoliao.png"), title: "电子叫料" ,name:'ecm' },
        { img: require("assets/images/navbar/pt/yidongzhiliangguanli.png"), title: "质量管理",name:'ecm' },
        { img: require("assets/images/navbar/pt/shebeishuzijiankong.png"), title: "APS",name:'APS' },
        { img: require("assets/images/navbar/pt/kanban.png"), title: "智能终端",name:'terminal' },
      ],
      scImgs: [
        { img: require("assets/images/partner/logo1.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo2.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo3.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo4.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo5.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo6.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo7.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo8.jpg"), name: "企业项目" },
        { img: require("assets/images/partner/logo9.jpg"), name: "企业项目" }
      ]
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      isChoose: "get_menu_choose"
    })
  },
  methods: {
    menuClick(name) {
      this.$store.dispatch("set_menu", name);
      this.$router.push("/" + name);
    }
  }
};
</script>
