

import { getToken,getHost,getLang } from 'common/cookie'

export default {
  //host
  host:getHost(),
  //token
  token:getToken(),
  //用户信息
  userInfo:{},
  //左侧菜单展开状态
  leftSilde:true,
  //系统语言  
  lang:getLang(),
  //语言包
  langPackage:null,
  //角色可以操作的菜单
  menus:null,
  //页面加载状态
  pageloading:false,
  //来自检查清单页面的跳转
  fromCheckList:false,
  //暂时保存检查信息
  checkList:null,
  //来自其他页面
  otherLink:null,
  //存储履历信息
  productInfo:null,
  //存储履历信息
  saleLamChartData:null,
  //xbar
  xbar:null,
  //检查录入文档地址
  entity_filePaths:null,
}
