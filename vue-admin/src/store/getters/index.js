

import * as type from 'store/getters/type'

export default {
  [type.GET_TOKEN]:state =>{
    return state.token;
  },
  [type.GET_USERINFO]:state =>{
    return state.userInfo;
  },
  [type.GET_LEFTSLIDE_STATE]: state => {
    return state.leftSilde;
  },
  [type.GET_LANG]: state => {
    return state.lang;
  },
  [type.GET_MENUS]: state => {
    return state.menus;
  },
  [type.GET_PAGELOADING]: state => {
    return state.pageloading;
  },
  [type.GET_FROMCHECKLIST]:state =>{
    return state.fromCheckList;
  },
  [type.GET_CHECKLIST]:state =>{
    return state.checkList;
  },
  [type.GET_OTHERLINK]:state =>{
    return state.otherLink;
  },
  [type.GET_PRODUCTINFO]:state =>{
    return state.productInfo;
  },
  [type.GET_SALELAM_CHARTDATA]:state =>{
    return state.saleLamChartData;
  },
}
