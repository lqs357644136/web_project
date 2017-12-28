let url = {
  user_login: '/rest/pad/login', //POST 登录获取token
  user_info: '/rest/user/getLoginInfo',//GET 获取用户信息
  batch_List: '/rest/plant/getMaterialBatch',//GET 物料列表 parem: type=[0/1] 0（原料批次录入）,1（调和批次录入）
  batch_List_delete: '/rest/plant/deleteMaterialBatch',//GET 删除物料列表 parem: id清单号 type=[0/1] 0（原料批次录入）,1（调和批次录入）
  batch_List_add: '/rest/plant/addMaterialBatch',//POST 添加物料列表 parem:{"batchNo": "string","materialNo": "string","quantity": 0,"type": 0 }
  check_getPlant:'/rest/basicdata/getPlant', //GET 获取车间信息
  check_getLine:'/rest/basicdata/getLine', //GET 获取制程信息
  check_getProcess:'/rest/basicdata/getProcess', //GET 获取机台
  check_getPartno:'/rest/basicdata/getPartno', //GET 获取产品编码
  check_list:'/rest/qc/getInspectList',//GET 检查清单
  check_info:'/rest/qc/getInspectInfo',//GET 获取检验信息
  check_add:'/rest/qc/addInspectResult',//POST 提交检测结果
  product_list:'/rest/qc/getProductResumeList',//GET 获取产品履历列表
}

//测试环境接口地址
let host = 'http://rap.taobao.org/mockjsdata/26394'

// for(let key in url){
//   if(url.hasOwnProperty(key)){
//       url[key] = host + url[key]
//   }
// }

export default url
