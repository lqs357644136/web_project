<template>
  <div class="padView">
    <div class="mainLoading" v-if="mainLoading">
      <div class="msg">
        <i class="icon fa fa-circle-o-notch fa-spin"></i>
        <span class="title">{{loadingMsg}}</span>
      </div>
    </div>
    <div class="mainPage">
      <div class="pad" v-if="main_init">
        <left-slide></left-slide>
        <main-content>
          <router-view class="animated fadeIn"></router-view>
          <div class="mainContentLoading">
            <div class="csshub-loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </main-content>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from "api";
//导入国际化设置
import { mainContent, leftSlide } from "components";
import { mapGetters } from "vuex";
import { esop_i18nLang_init } from "common/uitl.js";
export default {
  name: "padView",
  data() {
    return {
      mainLoading: true,
      loadingMsg: "加载中",
      main_init: false
    };
  },
  computed: {
    ...mapGetters({
      lang: "get_lang"
    })
  },
  mounted() {
    this.get_sys();
    this.checkTour();
    this.esop_Websocket();
  },
  components: {
    mainContent,
    leftSlide
  },
  methods: {
    /////////////
    /////////////
    //测试websocket
    esop_Websocket() {
      let ws = new WebSocket("ws://192.168.1.10:8080/esop/websocket/pad");
      ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("admin");
        console.log("数据发送中...");
      };
      ws.onmessage = evt => {
        let obj = JSON.parse(evt.data);
        let ptno = obj.ptno;
        let process = obj.process;
        let type = obj.type;
        if (type == 2) {
          this.$store.dispatch('set_menu_warning',true);
          this.$notify({
            title: `自主检验(${ptno})失败`,
            message: "有新的自检失败信息,点击查看",
            onClick: () => {
              this.$router.push("/inspecRecord");
              this.$store.dispatch('set_menu_warning',false);
            },
            type: "warning",
            duration: 180000
          });
        }
      };
    },
    //获取系统所需资源
    get_sys() {
      this.loadingMsg = "加载用户资料";
      this.$get({
        url: url.user_info
      })
        .then(res => {
          if (res.code == 1) {
            let userInfo = {
              userName: res.data.userName,
              realName: res.data.realName,
              menuList: res.data.menuList
            };
            this.$store.commit("SET_USERINFO", userInfo);
            this.mainLoading = false;
          } else {
          }
        })
        .then(res => {
          this.loadingMsg = "加载语言包";
          this.$get({
            url: url.get_MutiLang,
            params: {
              lang: this.lang,
              type: "h5"
            }
          }).then(res => {
            let opts = [
              "menu_pad",
              "layout_pad",
              "common",
              "common_pad",
              "specification_pad",
              "checkList_pad",
              "xr_pad"
            ];
            esop_i18nLang_init(opts, res.data).then(res => {
              this.$store.dispatch("set_langpackage", res);
              this.main_init = true;
            });
          });
        });
    },
    //定时获取巡检通知
    checkTour() {
      this.checkTour = setInterval(() => {
        if (
          !this.$store.getters.get_token ||
          this.$store.getters.get_token == ""
        ) {
          clearInterval(this.checkTour);
          return;
        }
        this.$get({
          url: url.getRoutNoticeList
        }).then(res => {
          if (res.code == 1) {
            if (res.data.length > 0) {
              this.$notify({
                title: "巡检提醒",
                type: "warning",
                dangerouslyUseHTMLString: true,
                duration: 120000,
                message:
                  '<div class="tourTips">' +
                  "<p>你有" +
                  res.data.length +
                  "个巡检任务</p>" +
                  "<p>请点击前往查看</p>" +
                  "</div>",
                onClick: () => {
                  this.$router.push("/tourEntity");
                }
              });
            }
          }
        });
      }, 180000);
    }
  }
};
</script>
