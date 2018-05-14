import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
//import i18n from 'common/i18n'

//预加载
//
//公共
import login from 'pages/user/login.vue'
import notPage from 'pages/error/404'

Vue.use(VueRouter)

//手机页面功能
export const esop_module = [{
    //手机主页
    path: '/home',
    name: 'home',
    component: resolve => require(['pages/module/home/home.vue'], resolve),
    //component: home,
    meta: {
      //title: messages.homePage,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //手机用户页
    path: '/user',
    name: 'user',
    component: resolve => require(['pages/module/user/user.vue'], resolve),
    //component: user,
    meta: {
      //title: messages.user,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //手机消息页
    path: '/news',
    name: 'news',
    component: resolve => require(['pages/module/news/news.vue'], resolve),
    //component: news,
    meta: {
      //title: messages.msg,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
  {
    //标签扫码
    path: '/scanner',
    name: 'scanner',
    component: resolve => require(['pages/module/scanner/scanner.vue'], resolve),
    //component: scanner,
    meta: {
      //title: messages.scanner,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  }
]

//公共模块
const routes = [{
    path: '/404',
    name: 'notPage',
    //component: resolve => require(['pages/error/404'], resolve),
    component: notPage,
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
  },
  {
    path: '/esop-mobile',
    redirect: '/home',
    component: resolve => require(['pages/module/App.vue'], resolve),
    //component: layout,
    children: esop_module
  }
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
        next({
          path: '/esop-mobile'
        })
      } else {
        next();
      }
    }
  } else {
    next();
  }

})

//路由完成之后的操作
router.afterEach(route => {})

export default router
