
import {
  SET_MENUS
} from './type';
import * as type from 'store/mutations/type';
import {
  setToken , setHost,setLang
} from 'common/cookie'
import router from 'router/index.js'

export default {
  [type.SET_HOST](state, host) {
    state.host = host;
    setHost(host);
  },
  [type.SET_TOKEN](state, token) {
    state.token = token;
    setToken(token);
  },
  [type.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [type.LOGIN_OUT](state) {
    state.token = null;
    setToken('');
    state.userInfo = null;
  },
  [type.SET_LEFTSLIDE](state) {
    state.leftSilde = state.leftSilde ? false : true
  },
  [type.SET_LANG](state, lang) {
    state.lang = lang;
    setLang(lang);
  },
  [type.SET_LANGPACKAGE](state, langPackage) {
    state.langPackage = langPackage;
  },
  [type.SET_MENUS](state, menus) {
    state.menus = roleMenus(menus);
  },
  [type.SET_PAGELOADING](state, path) {
    if (path) {
      setTimeout(router.push({
        path: path
      }), 500);
    }
  },
  [type.CLOSE_PAGELOADING](state) {
    state.pageloading = false
  },
  [type.SET_FROMCHECKLIST](state, fromState) {
    state.fromCheckList = fromState;
  },
  [type.SET_CHECKLIST](state, checkList) {
    state.checkList = checkList;
  }, 
  [type.SET_OTHERLINK](state, otherLink) {
    state.otherLink = otherLink;
  },
  [type.SET_PRODUCTINFO](state, productInfo) {
    state.productInfo = productInfo;
  },
  [type.SET_SALELAM_CHARTDATA](state, chartData) {
    state.saleLamChartData = chartData;
  },
  [type.SET_XBAR](state, xbar) {
    state.xbar = xbar;
  },
  [type.SET_ENTITY_FILEPATHS](state, paths) {
    state.entity_filePaths = paths;
  },
}

//根绝用户信息的菜单信息生成菜单目录数据
function roleMenus(menus) {

}
