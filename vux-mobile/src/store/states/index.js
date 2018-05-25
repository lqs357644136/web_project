

import { getToken,getHost,getLang } from 'common/cookie'

export default {
  //host
  host:getHost(),
  //token
  token:getToken(),
  //用户信息
  userInfo:{},
  //系统语言  
  lang:getLang(),
  //语言包
  langPackage:null,
  //页面加载状态
  pageloading:false,
}
