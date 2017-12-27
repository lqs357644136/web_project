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

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  [actions.SET_USER_INFO]({commit}, userinfo){
    commit(mutations.SET_USERINFO, userinfo)
  },
  [actions.SET_LEFTSLIDE]({commit}){
    commit(mutations.SET_LEFTSLIDE)
  },
  [actions.SET_LANG]({commit},lang){
    commit(mutations.SET_LANG,lang)
  },
  [actions.SET_MENUS]({commit},menus){
    commit(mutations.SET_MENUS,menus)
  },
  [actions.SET_PAGELOADING]({commit},path){
    commit(mutations.SET_PAGELOADING,path)
  },
  [actions.LOGIN_OUT]({commit}){
    commit(mutations.LOGIN_OUT)
  },
  [actions.SET_FROMCHECKLIST]({commit},fromState){
    commit(mutations.SET_FROMCHECKLIST,fromState)
  },
  [actions.SET_CHECKLIST]({commit},checkList){
    commit(mutations.SET_CHECKLIST,checkList)
  },
}
