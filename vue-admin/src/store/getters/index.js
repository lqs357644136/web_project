/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

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
}
