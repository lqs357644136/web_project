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
  //终端
  abnDailywork_list: '/rest/kanban/getProdAbnormalList',//GET 获取获取异常报工列表
  proDailywork_list: '/rest/kanban/getProdRecordList',//GET 获取获取生产报工列表
  abnDailywork_forOne: '/rest/kanban/getProdAbnormal',//GET 获取某个异常报工
  proDailywork_forOne: '/rest/kanban/getProdRecord',//GET 获取某个生产报工
  abnDailywork_add: '/rest/kanban/addProdAbnormal',//POST 保存异常报工
  proDailywork_add: '/rest/kanban/addProdRecord',//POST 保存生产报工
  dailywork_type: '/rest/kanban/getRecType',//GET 获取报工类型
  terBatch_List:'/rest/kanban/getMaterialBatch',//GET 获取物料信息列表
  terBatch_List_delete:'/rest/kanban/deleteMaterialBatch',//GET 删除物料录入信息
  terBatch_List_add:'/rest/kanban/addMaterialBatch',//POST 物料录入
  terFirstCheck_info:'/rest/kanban/getFirstInspectInfo',//GET 获取首件检验信息
  terFirstCheck_add:'/rest/kanban/addFirstInspectResult',//POST 提交首件检测结果
  terSelfCheck_info:'/rest/kanban/getSelfInspectInfo' ,//GET 获取自主检验信息
  terSelfCheck_add:'/rest/kanban/addSelfInspectResult',//POST 提交自主检测结果
  terProduct_list:'/rest/kanban/getProductResumeList',//GET 获取产品履历列表
  terProduct_list:'/rest/kanban/getProductResumeList',//GET 获取产品履历列表
  //esop
  saleLam_get:'/rest/Andon/getAndonList',//GET 获取安灯数据
}

//测试环境接口地址
let host = 'http://rap.taobao.org/mockjsdata/26394'

// for(let key in url){
//   if(url.hasOwnProperty(key)){
//       url[key] = host + url[key]
//   }
// }

export default url
