/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import router from 'src/router'
import { Message } from 'element-ui'
import store from 'store'
import { setToken } from 'common/cookie'
import { api_baseurl } from 'common/uitl.js'
import qs from "qs";
//---------需要token请求 start-------------
export const $post = function (options) {
  NProgress.done().start();
  let url = options.url;
  let data = options.data;
  let token = store.getters.get_token ? store.getters.get_token : "";
  let server_base_url = api_baseurl(store.getters.get_host ? store.getters.get_host : "");
  axios.defaults.headers["Content-Type"] = 'application/json';
  axios.defaults.headers["token"] = token;
  let path = server_base_url + url;
  return new Promise((resolve, reject) => {
    axios.post(path, data).then((res) => {
        //请求成功时,根据业务判断状态
        if (res.data.code != -1) {
          NProgress.done();
          resolve(res.data)
        } else { //code等于-1表示token失效,跳转到登录
          NProgress.done();
          Message.error('token失效')
          if (router.currentRoute.name != 'login') {
            store.dispatch('login_out');
            setTimeout(() => {
              router.push('/user/login');
            }, 500);
          }
        }
      })
      .catch((error) => {
        NProgress.done();
        console.log('错误信息')
        Message.error('服务器请求失败！')
        reject(error);
      });
  })
}
export const $get = function (options) {
  NProgress.done().start();
  let url = options.url;
  let params = options.params ? options.params : {};
  let token = store.getters.get_token ? store.getters.get_token : "";
  let server_base_url = api_baseurl(store.getters.get_host ? store.getters.get_host : "");
  axios.defaults.headers["Content-Type"] = 'application/json';
  axios.defaults.headers["token"] = token;
  let path = server_base_url + url;
  return new Promise((resolve, reject) => {
    axios({
      url: path,
      method: 'get',
      params: params
    }).then((res) => {
      //请求成功时,根据业务判断状态
      if (res.data.code != -1) {
        NProgress.done();
        resolve(res.data)
      } else { //code等于-1表示token失效,跳转到登录
        NProgress.done();
        Message.error('token失效')
        if (router.currentRoute.name != 'login') {
          store.dispatch('login_out');
          setTimeout(() => {
            router.push('/user/login');
          }, 500);
        }
      }
    }).catch((error) => {
      NProgress.done();
      console.log('错误信息')
      console.log(error)
      Message.error('服务器请求失败！')
      reject(error);
    })

  })
}
export const $get_file = function (options) {
  NProgress.done().start();
  let url = options.url;
  let params = options.params ? options.params : {};
  let token = store.getters.get_token ? store.getters.get_token : "";
  let server_base_url = api_baseurl(store.getters.get_host ? store.getters.get_host : "");
  let path = server_base_url + url;

  return new Promise((resolve, reject) => {

    let data = path+"?path="+params.path+"&token="+token;
    NProgress.done();
    resolve(data)

  })
}
//---------需要token请求 end-------------

//---------不需要token请求 start-------------
export const $post_noToken = function (options) {
  NProgress.done().start();
  let url = options.url;
  let data = options.data;
  axios.defaults.headers["Content-Type"] = 'application/json';
  let server_base_url = api_baseurl(store.getters.get_host ? store.getters.get_host : "");
  let path = server_base_url + url;
  return new Promise((resolve, reject) => {
    axios.post(path, data).then((res) => {
        //请求成功时,根据业务判断状态
        if (res.data.code != -1) {
          NProgress.done();
          resolve(res.data)
        } else { 
          NProgress.done();
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
  NProgress.done().start();
  let url = options.url;
  let params = options.params ? options.params : {};
  axios.defaults.headers["Content-Type"] = 'application/json';
  let server_base_url = api_baseurl(store.getters.get_host ? store.getters.get_host : "");
  let path = server_base_url + url;
  return new Promise((resolve, reject) => {

    axios({
      url: path,
      method: 'get',
      params: params
    }).then((res) => {
      //请求成功时,根据业务判断状态
      if (res.data.code != -1) {
        NProgress.done();
        resolve(res.data);
      } else {
        NProgress.done();
        Message.error('请求失败')
      }
    }).catch((error) => {
      NProgress.done();
      console.log('错误信息')
      console.log(error)
      Message.error('服务器请求失败！')
      reject(error);
    })

  })
}
//---------不需要token请求 end---------------