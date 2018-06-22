let url = {
  //公共
  file_get:'/rest/kanban/download',//GET 获取文件
  file_POST:'/rest/kanban/upload',//POST 上传文件
  getTime:'/rest/kanban/getTime',//GET 获取系统时间

  //基础信息
  check_getCompany:'/rest/kanban/getCompany',//GET 获取公司信息
  check_getPlant:'/rest/kanban/getPlant', //GET 获取车间信息
  check_getLine:'/rest/kanban/getLine', //GET 获取制程信息
  check_getProcess:'/rest/kanban/getProcess', //GET 获取机台
  check_getPartno:'/rest/kanban/getPartno', //GET 获取产品编码
  machineReachRate_list:'/rest/kanban/getMachineReachRateBoard',//GET 获取获取机台电子看板
  prodSchedule_list:'/rest/kanban/getProdScheduleBoard',//GET 获取总排成电子看板
  wholeReachRate_list:'/rest/kanban/getWholeReachRateBoard',//GET 获取整体达成率电子看板
  //日星看板
  lxkanban:'/IntelforESOPService/KanbanService.asmx/Zhgd_GetLineKB',
  plantkanban:'/IntelforESOPService/KanbanService.asmx/Zhgd_GetPlantKB',
  //海尔看板
  haierkanban:'/rest/Andon/getSopProdScheduleList',//GET 海尔线看板
  //科斯达看板
  getKSDLine:'/rest/kanban/getKSDLine',//GET 深圳车间生产管理看板
  getKeShiDarPlantKanban:'/rest/kanban/getKeShiDarPlantKanban',//GET 科斯达惠州总看板
  getKStarLineKanban:'/rest/kanban/getKStarLineKanban',//GET 科斯达惠州车间看板
  getKStarDailyProdKanban:'/rest/kanban/getKStarDailyProdKanban',//GET 科士达车间每日生产进度看板
  getKStarProdManageKanban:'/rest/kanban/getKStarProdManageKanban',//GET 科士达生产管理看板
  getKStarPreScheduleKanban:'/rest/kanban/getKStarPreScheduleKanban',//GET 科士达车间前加工进度看板(深圳)
  getKStarProdScheduleKanban:'/rest/kanban/getKStarProdScheduleKanban',//GET 科士达车间生产进度看板(深圳)
  //上海智汇看板
  getZhiHuiElecKanban:'/rest/kanban/getZhiHuiElecKanban',//GET 上海智汇仓库看板
  getShHaiAttenScheduleAndonData:'/rest/kanban/getShHaiAttenScheduleAndonData',//GET  上海智汇生产看板
}

export default url
