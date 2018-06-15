

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
  [type.GET_LEFTSLIDE_STATE]: state => {
    return state.leftSilde;
  },
  [type.GET_LANG]: state => {
    return state.lang&&state.lang.length>0?state.lang:'zh-cn';
  },
  [type.GET_LANGPACKAGE]: state => {
    return state.langPackage;
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
  [type.GET_XBAR]:state =>{
    return state.xbar;
  },
  [type.GET_ENTITY_FILEPATHS]:state =>{
    return state.entity_filePaths;
  },
  [type.GET_MENU_WARNING]:state =>{
    return state.menuWarning;
  },
}
