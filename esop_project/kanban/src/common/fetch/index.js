//导入模块
import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.headers["Content-Type"] = 'application/json';
axios.defaults.timeout =  6000;
export const $get_file = function (options) {
  let url = options.url;
  let params = options.params ? options.params : {};
  let path = url;
  return new Promise((resolve, reject) => {
    let data = path+"?path="+params.path
    resolve(data)
  })
}

export const $post_noToken = function (options) {
  let url = options.url;
  let data = options.data;
  let path = url;
  return new Promise((resolve, reject) => {
    axios.post(path, data).then((res) => {
        //请求成功时,根据业务判断状态
        resolve(res.data)
      }).catch((error) => {
        Message.error(error)
        reject(error);
      });
  })
}
export const $get_noToken = function (options) {
  let url = options.url;
  let params = options.params ? options.params : {};
  let path = url;
  return new Promise((resolve, reject) => {
    axios({
      url: path,
      method: 'get',
      params: params
    }).then((res) => {
       //请求成功时,根据业务判断状态
       resolve(res.data)
    }).catch((error) => {
      Message.error(error)
      reject(error);
    })
  })
}