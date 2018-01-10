
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import i18n from 'common/i18n'

//预加载
//
//公共
// import login from 'pages/user/login.vue'
//
//平板端
// import layout from 'pages/padPages/App.vue'
// import homePage from 'pages/padPages/home/index.vue'
// import firstEntity from 'pages/padPages/firstEntity/firstEntity.vue'
// import productInfo from 'pages/padPages/product/productInfo/productInfo.vue'
// import productEnter from 'pages/padPages/product/productEnter/productEnter.vue'
// import attention from 'pages/padPages/attention/attention.vue'
// import tourEntity from 'pages/padPages/tourEntity/tourEntity.vue'
// import checkList from 'pages/padPages/checkList/checkList.vue'
// import batchEnterRaw from 'pages/padPages/batchEnter/batchEnterRaw.vue'
// import batchEnterBlend from 'pages/padPages/batchEnter/batchEnterBlend.vue'
// import xbar from 'pages/padPages/x-bar/x-bar.vue'testNoLogin
// import testNoLogin from 'pages/padPages/testNoLogin/testNoLogin.vue'
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
  //首页
  {
    path: '/home',
    name: 'homePage',
    component: resolve => require(['pages/padPages/home/index.vue'], resolve),
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
    component: resolve => require(['pages/padPages/checkList/checkList.vue'], resolve),
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
    component: resolve => require(['pages/padPages/firstEntity/firstEntity.vue'], resolve),
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
    component: resolve => require(['pages/padPages/attention/attention.vue'], resolve),
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
    component: resolve => require(['pages/padPages/tourEntity/tourEntity.vue'], resolve),
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
    component: resolve => require(['pages/padPages/product/productInfo/productInfo.vue'], resolve),
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
    component: resolve => require(['pages/padPages/product/productEnter/productEnter.vue'], resolve),
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
    component: resolve => require(['pages/padPages/batchEnter/batchEnterRaw.vue'], resolve),
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
    component: resolve => require(['pages/padPages/batchEnter/batchEnterBlend.vue'], resolve),
    //component: batchEnterBlend,
    meta: {
      title: messages.batchEnterBlend,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //上岗纪录
    path: '/workonoff',
    name: 'workonoff',
    component: resolve => require(['pages/padPages/workonoff/workonoff.vue'], resolve),
    //component: workonoff,
    meta: {
      title: messages.workonoff,
      icon: 'fa fa-codiepie',
      auth: true
    }
  },

]

//手机页面功能
export const phoneModule = [{
    //手机主页
    path: '/phone/home',
    name: 'phoneHome',
    component: resolve => require(['pages/phonePages/home/home.vue'], resolve),
    //component: phoneHome,
    meta: {
      title: messages.homePage,
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
      title: messages.user,
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
      title: messages.msg,
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
      title: messages.signage,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  }
]

//终端页面功能
export const terModule = [{
  //终端主页
  path: '/ter/home',
  name: 'terHome',
  component: resolve => require(['pages/terPages/home/home.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.homePage,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //异常报工
  path: '/ter/dailywork/adnDailywork',
  name: 'adnDailywork',
  component: resolve => require(['pages/terPages/dailywork/adnDailywork.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.adnDailywork,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //生产报工
  path: '/ter/dailywork/proDailywork',
  name: 'proDailywork',
  component: resolve => require(['pages/terPages/dailywork/proDailywork.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.proDailywork,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //原料批次录入
  path: '/ter/batch/batchEnterRaw',
  name: 'batchEnterRaw',
  component: resolve => require(['pages/terPages/batchEnter/batchEnterRaw.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.batchEnterRaw,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //调合批次录入
  path: '/ter/batch/batchEnterBlend',
  name: 'batchEnterBlend',
  component: resolve => require(['pages/terPages/batchEnter/batchEnterBlend.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.batchEnterBlend,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //自检录入
  path: '/ter/selfEntity',
  name: 'selfEntity',
  component: resolve => require(['pages/terPages/selfEntity/selfEntity.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.selfEntity,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
},{
  //产品履历查看
  path: '/ter/productInfo',
  name: 'productInfo',
  component: resolve => require(['pages/terPages/product/productInfo/productInfo.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.productInfo,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}]


//公共模块
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
  component: resolve => require(['pages/user/login.vue'], resolve),
  //component: login
  meta: {
    auth: true
  }
}, {
  path: '/',
  redirect: '/user/login',
}, {
  path: '/pad',
  redirect: '/checkList',
  component: resolve => require(['pages/padPages/App.vue'], resolve),
  //component: layout,
  children: privateModule
}, {
  path: '/phone',
  redirect: '/phone/home',
  component: resolve => require(['pages/phonePages/App.vue'], resolve),
  //component: phoneLayout,
  children: phoneModule
}, {
  path: '/ter',
  redirect: '/ter/home',
  component: resolve => require(['pages/terPages/App.vue'], resolve),
  //component: phoneLayout,
  children: terModule
}]

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
  setTimeout(() => {
    store.commit('CLOSE_PAGELOADING');
  }, 1000);
  NProgress.done()
})

export default router
