

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  [actions.SET_HOST]({commit}, host){
    return new Promise((resolve,reject)=>{
      commit(mutations.SET_HOST, host);
      resolve();
    })
  },
  [actions.SET_USER_INFO]({commit}, userinfo){
    commit(mutations.SET_USERINFO, userinfo)
  },
  [actions.SET_LEFTSLIDE]({commit}){
    commit(mutations.SET_LEFTSLIDE)
  },
  [actions.SET_LANG]({commit},lang){
    commit(mutations.SET_LANG,lang)
  },
  [actions.SET_LANGPACKAGE]({commit},langPackage){
    commit(mutations.SET_LANGPACKAGE,langPackage)
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
  [actions.SET_OTHERLINK]({commit},otherLink){
    commit(mutations.SET_OTHERLINK,otherLink)
  },
  [actions.SET_PRODUCTINFO]({commit},product){
    commit(mutations.SET_PRODUCTINFO,product)
  },
  [actions.SET_SALELAM_CHARTDATA]({commit},chartData){
    commit(mutations.SET_SALELAM_CHARTDATA,chartData)
  },
  [actions.SET_XBAR]({commit},xbar){
    commit(mutations.SET_XBAR,xbar)
  },
  [actions.SET_ENTITY_FILEPATHS]({
    commit
  }, paths) {
    commit(mutations.SET_ENTITY_FILEPATHS, paths)
  },
  [actions.SET_MENU_WARNING]({commit},flag){
    commit(mutations.SET_MENU_WARNING,flag)
  },
}
