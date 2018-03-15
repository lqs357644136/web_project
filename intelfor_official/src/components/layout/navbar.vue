<template>

  <div class="navbar">
    <div class="warp">
      <div class="navbar-brand" @click="menuClick('home')">
        <div class="disktopLogo">
          <p class="text01">INTELFOR</p>
          <p class="text02">广州市智企信息科技有限公司</p>
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
            <div @click="menuClick('plan')" :class="isChoose=='plan'?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-sign-language"></i> 产品&解决方案</span>
              <i class="fa fa-angle-down"></i>
              <div class="more fadeIn">
                <div class="plant">
                  <div class="plantImg">
                    <img src="~assets/images/navbar/plant.png" alt="解决方案">
                  </div>
                  <div class="ptBoxs">
                    <div class="ptBox" v-for="(item,index) in ptImgs" :key="index">
                      <span class="img"><img :src="item.img" alt="图片"></span>
                      <span class="text">{{item.name}}</span>
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
                      <span class="text">{{item.name}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div @click="menuClick('callme')" :class="isChoose=='callme'?menuBoxStype.isChoose:menuBoxStype.noChoose">
              <span class="text">
                <i class="fa fa-tty"></i> 联系我们</span>
            </div>
            <div class="tel">
              <i class="fa fa-phone"></i>
              电话:
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
            <div @click="$router.push('/plan');rightMenuShow=false" class="menuBox"><i class="fa fa-sign-language"></i>产品&解决方案</div>
            <div @click="$router.push('/success');rightMenuShow=false" class="menuBox"><i class="fa fa-line-chart"></i>成功案例</div>
            <div @click="$router.push('/callme');rightMenuShow=false" class="menuBox"><i class="fa fa-tty"></i>联系我们</div>
            <div class="tel">
              <i class="fa fa-phone"></i>:
              <a href="#">400-8166-116</a>
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
      menuBoxStype: {
        isChoose: "nav-menu-box isChoose",
        noChoose: "nav-menu-box"
      },
      ptImgs: [
        { img: "https://picsum.photos/300/200/?image=702", name: "产品方案" },
        { img: "https://picsum.photos/300/200/?image=703", name: "产品方案" },
        { img: "https://picsum.photos/300/200/?image=704", name: "产品方案" },
        { img: "https://picsum.photos/300/200/?image=705", name: "产品方案" },
        { img: "https://picsum.photos/300/200/?image=606", name: "产品方案" },
        { img: "https://picsum.photos/300/200/?image=607", name: "产品方案" }
      ],
      scImgs: [
        { img: "https://picsum.photos/300/200/?image=610", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=611", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=612", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=613", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=614", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=615", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=616", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=617", name: "企业项目" },
        { img: "https://picsum.photos/300/200/?image=618", name: "企业项目" }
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
