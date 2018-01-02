/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import i18n from 'common/i18n'

//预加载
// import layout from 'pages/App.vue'
// import login from 'pages/user/login.vue'
// import homePage from 'pages/home/index.vue'
// import firstEntity from 'pages/firstEntity/firstEntity.vue'
// import productInfo from 'pages/product/productInfo/productInfo.vue'
// import productEnter from 'pages/product/productEnter/productEnter.vue'
// import attention from 'pages/attention/attention.vue'
// import tourEntity from 'pages/tourEntity/tourEntity.vue'
// import checkList from 'pages/checkList/checkList.vue'
// import batchEnterRaw from 'pages/batchEnter/batchEnterRaw.vue'
// import batchEnterBlend from 'pages/batchEnter/batchEnterBlend.vue'
//import xbar from 'pages/x-bar/x-bar.vue'testNoLogin
//import testNoLogin from 'pages/testNoLogin/testNoLogin.vue'
//
//手机版
//import phoneLayout from 'pages/phonePages/App.vue'
//import phoneHome from 'pages/phonePages/home/home.vue'

Vue.use(VueRouter)
//获取当前语言
let lang = store.getters.get_lang;
let messages = i18n.getLocaleMessage(lang).message;

export const privateModule = [ //正式功能
  //首页
  {
    path: '/home',
    name: 'homePage',
    component: resolve => require(['pages/home/index.vue'], resolve),
    //component: homePage,
    meta: {
      title: messages.homePage,
      icon: 'fa fa-institution ',
      auth: true
    }
  },
  {
    //检查清单
    path: '/checkList',
    name: 'checkList',
    component: resolve => require(['pages/checkList/checkList.vue'], resolve),
    //component: checkList,
    meta: {
      title: messages.checkList,
      icon: 'fa fa-commenting',
      auth: true
    }
  },
  {
    //首检管理
    path: '/firstentity',
    name: 'firstEntity',
    component: resolve => require(['pages/firstEntity/firstEntity.vue'], resolve),
    //component: firstEntity,
    meta: {
      title: messages.firstEntity,
      icon: 'fa fa-area-chart',
      auth: true
    }
  },
  {
    //注意事项
    path: '/attention',
    name: 'attention',
    component: resolve => require(['pages/attention/attention.vue'], resolve),
    //component: attention,
    meta: {
      title: messages.attention,
      icon: 'fa fa-binoculars',
      auth: true
    }
  },
  {
    //巡迴检查
    path: '/tourEntity',
    name: 'tourEntity',
    component: resolve => require(['pages/tourEntity/tourEntity.vue'], resolve),
    //component: tourEntity,
    meta: {
      title: messages.tourEntity,
      icon: 'fa fa-bookmark',
      auth: true
    }
  },
  {
    //产品履历
    path: '/product',
    name: 'product',
    meta: {
      title: messages.product,
      icon: 'fa fa-asl-interpreting',
      auth: true,
      children: [{
          title: messages.productInfo,
          path: '/product/productInfo',
          name: 'productInfo',
        },
        {
          title: messages.productEnter,
          path: '/product/productEnter',
          name: 'productEnter',
        }
      ]
    }
  },
  {
    //产品履历查看
    path: '/product/productInfo',
    name: 'productInfo',
    component: resolve => require(['pages/product/productInfo/productInfo.vue'], resolve),
    //component: productInfo,
    meta: {
      title: messages.productInfo,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //产品履历录入
    path: '/product/productEnter',
    name: 'productEnter',
    component: resolve => require(['pages/product/productEnter/productEnter.vue'], resolve),
    //component: productEnter,
    meta: {
      title: messages.productEnter,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //录入管理
    path: '/batchEnter',
    name: 'batchEnter',
    meta: {
      title: messages.batchEnter,
      icon: 'fa fa-calendar-minus-o',
      auth: true,
      children: [{
          title: messages.batchEnterBlend,
          path: '/batchEnter/batchEnterBlend',
          name: 'batchEnterBlend',
        },
        {
          title: messages.batchEnterRaw,
          path: '/batchEnter/batchEnterRaw',
          name: 'batchEnterRaw',
        }
      ]
    }
  },
  {
    //原来批次录入
    path: '/batchEnter/batchEnterRaw',
    name: 'batchEnterRaw',
    component: resolve => require(['pages/batchEnter/batchEnterRaw.vue'], resolve),
    //component: batchEnterRaw,
    meta: {
      title: messages.batchEnterRaw,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //调合批次录入
    path: '/batchEnter/batchEnterBlend',
    name: 'batchEnterBlend',
    component: resolve => require(['pages/batchEnter/batchEnterBlend.vue'], resolve),
    //component: batchEnterBlend,
    meta: {
      title: messages.batchEnterBlend,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  // {
  //   //调合批次录入
  //   path: '/x-bar',
  //   name: 'x-bar',
  //   //component: resolve => require(['pages/x-bar/x-bar.vue'], resolve),
  //   component: xbar,
  //   meta: {
  //     title: messages.xbar,
  //     icon: 'fa fa-asl-interpreting',
  //     auth: true
  //   }
  // },

]

//手机模块
const phoneModule = [{
    //手机主页
    path: '/phone/home',
    name: 'phoneHome',
    component: resolve => require(['pages/phonePages/home/home.vue'], resolve),
    //component: phoneHome,
    meta: {
      title: '主页',
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //手机用户页
    path: '/phone/user',
    name: 'phoneUser',
    component: resolve => require(['pages/phonePages/user/user.vue'], resolve),
    //component: phoneHome,
    meta: {
      title: '用户',
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //手机消息页
    path: '/phone/news',
    name: 'phoneNews',
    component: resolve => require(['pages/phonePages/news/news.vue'], resolve),
    //component: phoneHome,
    meta: {
      title: '消息',
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //电子看板
    path: '/phone/signage',
    name: 'signage',
    component: resolve => require(['pages/phonePages/signage/signage.vue'], resolve),
    //component: phoneHome,
    meta: {
      title: '电子看板',
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  }
]


//使用AMD方式加载
const routes = [{
    path: '/404',
    name: 'notPage',
    component: resolve => require(['pages/error/404'], resolve)
  }, {
    path: '*',
    redirect: '/404'
  }, {
    path: '/user/login',
    name: 'login',
    component: resolve => require(['pages/user/login.vue'], resolve)
    //component: login
  }, {
    path: '/pad',
    redirect: '/checkList',
    component: resolve => require(['pages/App.vue'], resolve),
    //component: layout,
    children: privateModule
  }, {
    path: '/phone',
    redirect: '/phone/home',
    component: resolve => require(['pages/phonePages/App.vue'], resolve),
    //component: phoneLayout,
    children: phoneModule
  },

]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

//免登陆页面集合
const noLoginPages = ['testNoLogin'];




//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start();
  let toName = to.name
  // let fromName = from.name
  let token = store.state.token
  if (!token && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (token && toName === 'login') {
      if (document.body.offsetWidth < 480) {
        next({
          path: '/phone/home'
        })
      } else {
        next({
          path: '/pad'
        })
      }
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  setTimeout(() => {
    store.commit('CLOSE_PAGELOADING');
  }, 1000);
  NProgress.done()
})

export default router



//demo原来的模块
//  {
//     path: '/table/base',
//     name: 'tableBase',
//     component: resolve => require(['pages/table/base'],resolve), 
//     meta: {
//       title: messages.tableBase,
//       auth: true
//     }
//   }, {
//     path: '/table/sort',
//     name: 'tableSort',
//     component: resolve => require(['pages/table/sort'],resolve), 
//     meta: {
//       title: messages.tableSort,
//       auth: true
//     }
//   }, {
//     path: '/table/update/:id',
//     name: 'tableUpdate',
//     component: resolve => require(['pages/table/save'],resolve), 
//     meta: {
//       title: "数据修改",
//       auth: true
//     }
//   }, {
//     path: '/table/add',
//     name: 'tableAdd',
//     component: resolve => require(['pages/table/save'],resolve), 
//     meta: {
//       title: "添加数据",
//       auth: true
//     }
//   }, {
//     path: '/charts/bar',
//     name: 'chartsBar',
//     component: resolve => require(['pages/charts/bar'],resolve), 
//     meta: {
//       title: "柱状图表",
//       auth: true
//     }
//   },
