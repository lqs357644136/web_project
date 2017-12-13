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

Vue.use(VueRouter)
//获取当前语言
let lang = store.getters.get_lang;
let messages = i18n.getLocaleMessage(lang).message;

export const privateModule = [ //正式功能
  //首页
  {
    path: '/home',
    name: 'homePage',
    component: resolve => require(['pages/home'], resolve),
    meta: {
      title: messages.homePage,
      icon: 'fa fa-institution ',
      auth: true
    }
  },
  {
    //首检管理
    path: '/firstentity',
    name: 'firstEntity',
    component: resolve => require(['pages/firstEntity/firstEntity'], resolve),
    meta: {
      title: messages.firstEntity,
      icon: 'fa fa-area-chart',
      auth: true
    }
  },
  {
    //产品履历
    path: '/product',
    name:'product',
    meta: {
      title: messages.product,
      icon: 'fa fa-asl-interpreting',
      auth: true,
      children:[
        {
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
    component: resolve => require(['pages/product/productInfo/productInfo'], resolve),
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
    component: resolve => require(['pages/product/productEnter/productEnter'], resolve),
    meta: {
      title: messages.productEnter,
      icon: 'fa fa-asl-interpreting',
      auth: true
    }
  },
  {
    //注意事项
    path: '/attention',
    name: 'attention',
    component: resolve => require(['pages/attention/attention'], resolve),
    meta: {
      title: messages.attention,
      icon: 'fa fa-binoculars',
      auth: true
    }
  },
  {
    //自检管理
    path: '/selfInspection',
    name: 'selfInspection',
    component: resolve => require(['pages/selfInspection/selfInspection'], resolve),
    meta: {
      title: messages.selfInspection,
      icon: 'fa fa-bookmark',
      auth: true
    }
  },
  {
    //巡检管理
    path: '/detection',
    name: 'detection',
    component: resolve => require(['pages/detection/detection'], resolve),
    meta: {
      title: messages.detection,
      icon: 'fa fa-commenting',
      auth: true
    }
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
  component: resolve => require(['pages/user/login'], resolve)
}, {
  path: '/',
  redirect: '/home',
  component: resolve => require(['pages/App'], resolve),
  children: privateModule
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
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login
  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      if (store.getters.get_user_info.hasOwnProperty('user')) {
        let menuOption = store.getters.get_user_info.user.menuOption
        store.dispatch('set_menus', menuOption);
      }
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
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
