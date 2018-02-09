import Vue from 'vue'
//导入过滤器
import '~/common/filiter'
//导入axios请求方法
import { $get_file,$post_noToken,$get_noToken } from '~/common/fetch/index.js'
//导入工具
import { getMacINfo,api_baseurl } from '~/common/uitl.js'
//导入接口地址
import url from "~/common/api/index.js";
//注册全局
Vue.prototype.$get_noToken = $get_noToken;
Vue.prototype.$post_noToken = $post_noToken;
Vue.prototype.$get_file = $get_file;
Vue.prototype.$api_baseurl = api_baseurl;
Vue.prototype.$url = url;
Vue.prototype.GETMACINFO = getMacINfo;