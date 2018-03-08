

import * as type from 'store/getters/type'

export default {
  [type.GET_LANG]: state => {
    return state.lang;
  },
  [type.GET_CHECKLIST]:state =>{
    return state.checkList;
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
}
