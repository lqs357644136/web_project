import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {

  [actions.SET_LANG]({
    commit
  }, lang) {
    commit(mutations.SET_LANG, lang)
  },
  [actions.SET_CHECKLIST]({
    commit
  }, checkList) {
    return new Promise((resolve, reject) => {
      resolve(commit(mutations.SET_CHECKLIST, checkList));
    })
  },
  [actions.SET_PRODUCTINFO]({
    commit
  }, product) {
    commit(mutations.SET_PRODUCTINFO, product)
  },
  [actions.SET_SALELAM_CHARTDATA]({
    commit
  }, chartData) {
    commit(mutations.SET_SALELAM_CHARTDATA, chartData)
  },
  [actions.SET_XBAR]({
    commit
  }, xbar) {
    commit(mutations.SET_XBAR, xbar)
  },
  [actions.SET_ENTITY_FILEPATHS]({
    commit
  }, paths) {
    commit(mutations.SET_ENTITY_FILEPATHS, paths)
  },
}
