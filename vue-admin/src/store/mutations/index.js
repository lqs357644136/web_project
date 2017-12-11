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
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'
import i18n from 'common/i18n'

export default {
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  [type.SET_LEFTSLIDE](state){
    state.leftSilde = state.leftSilde?false:true
  },
  [type.SET_LANG](state,lang){
    state.lang = lang;
    i18n.locale = state.lang;
    Window.prototype.$18n = i18n
  }
}
