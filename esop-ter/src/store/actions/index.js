

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  
  [actions.SET_LANG]({commit},lang){
    commit(mutations.SET_LANG,lang)
  },
  [actions.SET_CHECKLIST]({commit},checkList){
    commit(mutations.SET_CHECKLIST,checkList)
  },
  [actions.SET_PRODUCTINFO]({commit},product){
    commit(mutations.SET_PRODUCTINFO,product)
  },
  [actions.SET_SALELAM_CHARTDATA]({commit},chartData){
    commit(mutations.SET_SALELAM_CHARTDATA,chartData)
  },
}
