
import { SET_MENUS } from './type';
import * as type from 'store/mutations/type';
import i18n from 'common/i18n'

export default {
  [type.SET_LANG](state, lang) {
    state.lang = lang;
    i18n.locale = state.lang;
  },
  [type.SET_CHECKLIST](state, checkList) {
    state.checkList = checkList;
  }, 
  [type.SET_PRODUCTINFO](state, productInfo) {
    state.productInfo = productInfo;
  },
  [type.SET_SALELAM_CHARTDATA](state, chartData) {
    state.saleLamChartData = chartData;
  },
  [type.SET_XBAR](state, xbar) {
    state.xbar = xbar;
  },
}

