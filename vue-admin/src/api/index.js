let url = {
  //公共
  user_login: '/rest/pad/login', //POST 登录获取token
  user_info: '/rest/user/getLoginInfo',//GET 获取用户信息
  file_get:'/rest/kanban/download',//GET 获取文件
  file_POST:'/rest/kanban/upload',//POST 上传文件
  //基础信息
  check_getCompany:'/rest/kanban/getCompany',//GET 获取公司信息
  check_getPlant:'/rest/kanban/getPlant', //GET 获取车间信息
  check_getLine:'/rest/kanban/getLine', //GET 获取制程信息
  check_getProcess:'/rest/kanban/getProcess', //GET 获取机台
  check_getPartno:'/rest/kanban/getPartno', //GET 获取产品编码
  check_getPlantAndLine:'/rest/kanban/getPlantAndLine',//GET 车间和线别
  check_getGroup:'/rest/kanban/getGroup',//GET 获取组别
  //平板 //手机
  batch_List: '/rest/plant/getMaterialBatch',//GET 物料列表 parem: type=[0/1] 0（原料批次录入）,1（调和批次录入）
  batch_List_delete: '/rest/plant/deleteMaterialBatch',//GET 删除物料列表 parem: id清单号 type=[0/1] 0（原料批次录入）,1（调和批次录入）
  batch_List_add: '/rest/plant/addMaterialBatch',//POST 添加物料列表 parem:{"batchNo": "string","materialNo": "string","quantity": 0,"type": 0 }
  check_list:'/rest/qc/getInspectList',//GET 检查清单
  firstCheck_info :'/rest/qc/getFirstInspectInfo',//GET 获取首件QC录入信息
  firstCheck_add:'/rest/qc/addFirstInspectResult',//POST 首件QC录入提交检测结果
  tourCheck_info :'/rest/qc/getRoutInspectInfo',//GET 获取巡迴录入信息
  tourCheck_add:'/rest/qc/addRoutInspectResult',//POST 巡迴录入提交检测结果
  product_list:'/rest/qc/getProductResumeList',//GET 获取产品履历列表
  product_info:'/rest/qc/getProductResumeInfo',//GET 获取产品履历下拉框数据
  product_add:'/rest/qc/addProductResume',//POST 获取产品履历信息录入
  workonoffList:'/rest/kanban/getWorkonoffList',//GET 获取获取上岗纪录列表(分页)
  machineReachRate_list:'/rest/kanban/getMachineReachRateBoard',//GET 获取获取机台电子看板
  prodSchedule_list:'/rest/kanban/getProdScheduleBoard',//GET 获取总排成电子看板
  wholeReachRate_list:'/rest/kanban/getWholeReachRateBoard',//GET 获取整体达成率电子看板
  inspectSpec_list:'/rest/kanban/getInspectSpecList',//GET 获取检验规范列表
  precautions_list:'/rest/message/getPrecautions',//GET 获取注意事项列表
  notice_list:'/rest/message/getSopNotice',//GET 获取消息公告列表
  bulletin_list:'/rest/message/getBulletin',//GET 获取电子公告列表
  notice_add:'/rest/message/addSopNotice',  //保存消息广播
  bulletin_add:'/rest/message/addBulletin',  //保存电子公告
  notice_delete:'/rest/message/deleteSopNotice',  //删除消息广播
  bulletin_delete:'/rest/message/deleteBulletin',  //删除电子公告
}

//测试环境接口地址
let host = 'http://rap.taobao.org/mockjsdata/26394'

// for(let key in url){
//   if(url.hasOwnProperty(key)){
//       url[key] = host + url[key]
//   }
// }

export default url
