import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import i18n from 'common/i18n'

//预加载
//
//公共
import login from 'pages/user/login.vue'
import notPage from 'pages/error/404'
//
//平板端
import layout from 'pages/padPages/App.vue'
import firstEntity from 'pages/padPages/firstEntity/firstEntity.vue'
import productInfo from 'pages/padPages/product/productInfo/productInfo.vue'
import productEnter from 'pages/padPages/product/productEnter/productEnter.vue'
import tourEntity from 'pages/padPages/tourEntity/tourEntity.vue'
import checkList from 'pages/padPages/checkList/checkList.vue'
import workonoff from 'pages/padPages/workonoff/workonoff.vue'
import batchEnterRaw from 'pages/padPages/batchEnter/batchEnterRaw.vue'
import batchEnterBlend from 'pages/padPages/batchEnter/batchEnterBlend.vue'
import machineReachRate from 'pages/padPages/signage/machineReachRate.vue'
import prodSchedule from 'pages/padPages/signage/prodSchedule.vue'
import wholeReachRate from 'pages/padPages/signage/wholeReachRate.vue'
import specification from 'pages/padPages/specification/specification.vue'
import notice from 'pages/padPages/messagePush/notice.vue'
import bulletin from 'pages/padPages/messagePush/bulletin.vue'
import precautions from 'pages/padPages/messagePush/precautions.vue'
// import xbar from 'pages/padPages/x-bar/x-bar.vue'
//
//手机版
//import phoneLayout from 'pages/phonePages/App.vue'
//import phoneHome from 'pages/phonePages/home/home.vue'

Vue.use(VueRouter)
//获取当前语言
let lang = store.getters.get_lang;
let messages = i18n.getLocaleMessage(lang).message.menu;

//平板页面功能
export const privateModule = [
  {
    //检验规范
    path: '/specification',
    name: 'specification',
    //component: resolve => require(['pages/padPages/specification/specification.vue'], resolve),
    component: specification,
    meta: {
      title: messages.specification,
      icon: 'fa fa-codiepie',
      auth: true
    }
  },{
    //检查清单
    path: '/checkList',
    name: 'checkList',
    //component: resolve => require(['pages/padPages/checkList/checkList.vue'], resolve),
    component: checkList,
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
    //component: resolve => require(['pages/padPages/firstEntity/firstEntity.vue'], resolve),
    component: firstEntity,
    meta: {
      title: messages.firstEntity,
      icon: 'fa fa-area-chart',
      auth: true
    }
  },
  {
    //巡迴检查
    path: '/tourEntity',
    name: 'tourEntity',
    //component: resolve => require(['pages/padPages/tourEntity/tourEntity.vue'], resolve),
    component: tourEntity,
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
    //component: resolve => require(['pages/padPages/product/productInfo/productInfo.vue'], resolve),
    component: productInfo,
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
    //component: resolve => require(['pages/padPages/product/productEnter/productEnter.vue'], resolve),
    component: productEnter,
    meta: {
      title: messages.productEnter,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //上岗纪录
    path: '/workonoff',
    name: 'workonoff',
    //component: resolve => require(['pages/padPages/workonoff/workonoff.vue'], resolve),
    component: workonoff,
    meta: {
      title: messages.workonoff,
      icon: 'fa fa-codiepie',
      auth: true
    }
  },
  {
    //电子看板
    path: '/signage',
    name: 'signage',
    meta: {
      title: messages.signage,
      icon: 'fa fa-calendar-minus-o',
      auth: true,
      children: [{
          title: messages.machineReachRate,
          path: '/signage/machineReachRate',
          name: 'machineReachRate',
        },
        {
          title: messages.prodSchedule,
          path: '/signage/prodSchedule',
          name: 'prodSchedule',
        },
        {
          title: messages.wholeReachRate,
          path: '/signage/wholeReachRate',
          name: 'wholeReachRate',
        }
      ]
    }
  },
  {
    //机台电子看板
    path: '/signage/machineReachRate',
    name: 'machineReachRate',
    //component: resolve => require(['pages/padPages/signage/machineReachRate.vue'], resolve),
    component: machineReachRate,
    meta: {
      title: messages.machineReachRate,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //总排程电子看板
    path: '/signage/prodSchedule',
    name: 'prodSchedule',
    //component: resolve => require(['pages/padPages/signage/prodSchedule.vue'], resolve),
    component: prodSchedule,
    meta: {
      title: messages.prodSchedule,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //整体达成率电子看板
    path: '/signage/wholeReachRate',
    name: 'wholeReachRate',
    //component: resolve => require(['pages/padPages/signage/wholeReachRate.vue'], resolve),
    component: wholeReachRate,
    meta: {
      title: messages.wholeReachRate,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //消息推送
    path: '/messagePush',
    name: 'messagePush',
    meta: {
      title: messages.messagePush,
      icon: 'fa fa-comment-o',
      auth: true,
      children: [{
          title: messages.notice,
          path: '/messagePush/notice',
          name: 'notice',
        },
        {
          title: messages.bulletin,
          path: '/messagePush/bulletin',
          name: 'bulletin',
        },
        {
          title: messages.precautions,
          path: '/messagePush/precautions',
          name: 'precautions',
        }
      ]
    }
  },
  {
    //消息广播
    path: '/messagePush/notice',
    name: 'notice',
    //component: resolve => require(['pages/padPages/messagePush/notice.vue'], resolve),
    component: notice,
    meta: {
      title: messages.notice,
      icon: 'fa fa-binoculars',
      auth: true
    }
  },
  {
    //电子公告
    path: '/messagePush/bulletin',
    name: 'bulletin',
    //component: resolve => require(['pages/padPages/messagePush/bulletin.vue'], resolve),
    component: bulletin,
    meta: {
      title: messages.bulletin,
      icon: 'fa fa-binoculars',
      auth: true
    }
  },
  {
    //注意事项
    path: '/messagePush/precautions',
    name: 'precautions',
    //component: resolve => require(['pages/padPages/messagePush/precautions.vue'], resolve),
    component: precautions,
    meta: {
      title: messages.precautions,
      icon: 'fa fa-binoculars',
      auth: true
    }
  },
]

//手机页面功能
// export const phoneModule = [{
//     //手机主页
//     path: '/phone/home',
//     name: 'phoneHome',
//     component: resolve => require(['pages/phonePages/home/home.vue'], resolve),
//     //component: phoneHome,
//     meta: {
//       title: messages.homePage,
//       icon: 'fa fa-asl-interpreting',
//       auth: true
//     },
//   },
//   {
//     //手机用户页
//     path: '/phone/user',
//     name: 'phoneUser',
//     component: resolve => require(['pages/phonePages/user/user.vue'], resolve),
//     //component: phoneHome,
//     meta: {
//       title: messages.user,
//       icon: 'fa fa-asl-interpreting',
//       auth: true
//     },
//   },
//   {
//     //手机消息页
//     path: '/phone/news',
//     name: 'phoneNews',
//     component: resolve => require(['pages/phonePages/news/news.vue'], resolve),
//     //component: phoneHome,
//     meta: {
//       title: messages.msg,
//       icon: 'fa fa-asl-interpreting',
//       auth: true
//     },
//   },
//   {
//     //电子看板
//     path: '/phone/signage',
//     name: 'phoneSignage',
//     component: resolve => require(['pages/phonePages/signage/signage.vue'], resolve),
//     //component: phoneHome,
//     meta: {
//       title: messages.signage,
//       icon: 'fa fa-asl-interpreting',
//       auth: true
//     },
//   }
// ]

//公共模块
const routes = [{
  path: '/404',
  name: 'notPage',
  //component: resolve => require(['pages/error/404'], resolve),
  component :notPage,
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  //component: resolve => require(['pages/user/login.vue'], resolve),
  component: login,
  meta: {
    auth: true
  }
}, {
  path: '/',
  redirect: '/user/login',
}, {
  path: '/pad',
  redirect: '/specification',
  //component: resolve => require(['pages/padPages/App.vue'], resolve),
  component: layout,
  children: privateModule
}, 
// {
//   path: '/phone',
//   redirect: '/phone/home',
//   component: resolve => require(['pages/phonePages/App.vue'], resolve),
//   //component: phoneLayout,
//   children: phoneModule
// }
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

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  //判断是否需要获取接口地址
  if (to.path.indexOf('/ter/') != -1) {
    let base_url = to.query.ip
    store.dispatch('set_host', base_url)
  }
  NProgress.done().start();
  let isLogin = to.meta.auth; //是否需要登录
  if (isLogin) {
    let toName = to.name //当前页面name
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
        next();
      }
    }
  } else {
    next();
  }

})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
