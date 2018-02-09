//导入模块
import axios from 'axios'
import { Message } from 'element-ui'
//---------需要token请求 start-------------
export const $get_file = function (options) {
  let url = options.url;
  let params = options.params ? options.params : {};
  let path = url;
  return new Promise((resolve, reject) => {
    let data = path+"?path="+params.path;
    resolve(data)
  })
}
//---------需要token请求 end-------------

//---------不需要token请求 start-------------
export const $post_noToken = function (options) {
  let url = options.url;
  let data = options.data ? options.data : {};
  let path = url;
  axios.defaults.headers["Content-Type"] = 'application/json';
  return new Promise((resolve, reject) => {
    axios.post(path, data).then((res) => {
        //请求成功时,根据业务判断状态
        if (res.data.code != -1) {
          resolve(res.data)
        } else { 
          Message.error('请求失败')
        }
      })
      .catch((error) => {
        console.log('错误信息')
        Message.error('服务器请求失败！')
        reject(error);
      });
  })
}
export const $get_noToken = function (options) {
  let url = options.url;
  let params = options.params ? options.params : {};
  let path = url;
  axios.defaults.headers["Content-Type"] = 'application/json';
  return new Promise((resolve, reject) => {
    axios({
      url: path,
      method: 'get',
      params: params
    }).then((res) => {
      //请求成功时,根据业务判断状态
      if (res.data.code != -1) {
        resolve(res.data);
      } else {
        Message.error('请求失败')
      }
    }).catch((error) => {
      console.log('错误信息')
      console.log(error)
      Message.error('服务器请求失败！')
      reject(error);
    })

  })
}
//---------不需要token请求 end---------------