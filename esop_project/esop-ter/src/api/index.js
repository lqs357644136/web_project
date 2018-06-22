let url = {
  //公共
  file_get:'/rest/kanban/download',//GET 获取文件
  file_POST:'/rest/kanban/upload',//POST 上传文件
  //基础信息
  check_getCompany:'/rest/kanban/getCompany',//GET 获取公司信息
  check_getPlant:'/rest/kanban/getPlant', //GET 获取车间信息
  check_getLine:'/rest/kanban/getLine', //GET 获取制程信息
  check_getProcess:'/rest/kanban/getProcess', //GET 获取机台
  check_getPartno:'/rest/kanban/getPartno', //GET 获取产品编码
  //终端
  abnDailywork_list: '/rest/kanban/getProdAbnormalList',//GET 获取获取异常报工列表
  proDailywork_list: '/rest/kanban/getProdRecordList',//GET 获取获取生产报工列表
  abnDailywork_forOne: '/rest/kanban/getProdAbnormal',//GET 获取某个异常报工
  proDailywork_forOne: '/rest/kanban/getProdRecord',//GET 获取某个生产报工
  abnDailywork_add: '/rest/kanban/addProdAbnormal',//POST 保存异常报工
  proDailywork_add: '/rest/kanban/addProdRecord',//POST 保存生产报工
  abnDailywork_type: '/rest/kanban/getAbnormalType',//GET 获取异常报工类型
  proDailywork_type: '/rest/kanban/getRecordType',//GET 获取生产报工类型
  terBatch_List:'/rest/kanban/getMaterialBatch',//GET 获取物料信息列表
  terBatch_List_delete:'/rest/kanban/deleteMaterialBatch',//GET 删除物料录入信息
  terBatch_List_add:'/rest/kanban/addMaterialBatch',//POST 物料录入
  terFirstCheck_info:'/rest/kanban/getFirstInspectInfo',//GET 获取首件检验信息
  terFirstCheck_add:'/rest/kanban/addFirstInspectResult',//POST 提交首件检测结果
  terSelfCheck_info:'/rest/kanban/getSelfInspectInfo' ,//GET 获取自主检验信息
  terSelfCheck_add:'/rest/kanban/addSelfInspectResult',//POST 提交自主检测结果
  terProduct_list:'/rest/kanban/getProductResumeList',//GET 获取产品履历列表
  machineReachRate_list:'/rest/kanban/getMachineReachRateBoard',//GET 获取获取机台电子看板
  prodSchedule_list:'/rest/kanban/getProdScheduleBoard',//GET 获取总排成电子看板
  wholeReachRate_list:'/rest/kanban/getWholeReachRateBoard',//GET 获取整体达成率电子看板
  inspectSpec_list:'/rest/kanban/getInspectSpecList',//GET 获取检验规范列表
  daily_shiftType:'/rest/kanban/getShiftType',//GET 获取班次类型
  getMaterial:'/rest/kanban/getMaterial',//GET 获取当前工位对应原料
  precautions_list:'/rest/kanban/getPrecautions',//GET 获取注意事项列表
  getInspectRecord: '/rest/kanban/getInspectRecord', //GET 获取检验纪录
  getFilePath:'/rest/kanban/getFilePath',//GET 获取产品编码对应文档分类的文档
  getInspectRecordDetail:'/rest/kanban/getInspectRecordDetail',//GET 获取检验纪录明细
  getRestTime:'/rest/kanban/getRestTime',//GET 获取作息时间
  //esop
  saleLam_get:'/rest/Andon/getAndonList',//GET 
  get_xBar:'/rest/kanban/getXbar',//GET 获取xBar
  //日星看板
  lxkanban:'/IntelforESOPService/KanbanService.asmx/Zhgd_GetLineKB',
  plantkanban:'/IntelforESOPService/KanbanService.asmx/Zhgd_GetPlantKB'
}

export default url
