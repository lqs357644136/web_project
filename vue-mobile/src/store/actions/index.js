

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
  [actions.SET_LANG]({commit},lang){
    commit(mutations.SET_LANG,lang)
  },
  [actions.SET_LANGPACKAGE]({commit},langPackage){
    commit(mutations.SET_LANGPACKAGE,langPackage)
  },
  [actions.SET_PAGELOADING]({commit},path){
    commit(mutations.SET_PAGELOADING,path)
  },
  [actions.LOGIN_OUT]({commit}){
    commit(mutations.LOGIN_OUT)
  },
  [actions.SET_ENTITY_FILEPATHS]({
    commit
  }, paths) {
    commit(mutations.SET_ENTITY_FILEPATHS, paths)
  },
}
