

import * as type from 'store/getters/type'

export default {
  [type.GET_HOST]:state =>{
    return state.host;
  },
  [type.GET_TOKEN]:state =>{
    return state.token;
  },
  [type.GET_USERINFO]:state =>{
    return state.userInfo;
  },
  [type.GET_LANG]: state => {
    return state.lang&&state.lang.length>0?state.lang:'zh-cn';
  },
  [type.GET_LANGPACKAGE]: state => {
    return state.langPackage;
  },
  [type.GET_PAGELOADING]: state => {
    return state.pageloading;
  },
}
