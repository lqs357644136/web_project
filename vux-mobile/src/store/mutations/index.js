
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
  [type.SET_LANG](state, lang) {
    state.lang = lang;
    setLang(lang);
  },
  [type.SET_LANGPACKAGE](state, langPackage) {
    state.langPackage = langPackage;
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
}
