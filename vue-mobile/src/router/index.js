import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'

Vue.use(VueRouter)

//手机页面功能
export const phoneModule = [{
    //手机主页
    path: '/home',
    name: 'home',
    component: resolve => require(['pages/home/home.vue'], resolve),
    //component: phoneHome,
    meta: {
      //title: messages.homePage,
      icon: 'fa fa-asl-interpreting',
      auth: true
    },
  },
]

//公共模块
const routes = [{
    path: '/404',
    name: 'notPage',
    component: resolve => require(['pages/error/404'], resolve),
    //component: notPage,
  }, {
    path: '*',
    redirect: '/404'
  }, {
    path: '/user/login',
    name: 'login',
    component: resolve => require(['pages/user/login.vue'], resolve),
    //component: login,
    meta: {
      auth: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    component: resolve => require(['pages/layout.vue'], resolve),
    //component: phoneLayout,
    children: phoneModule
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
  if (to.path.indexOf('/ter/') != -1) {
    let base_url = to.query.ip
    store.dispatch('set_host', base_url)
  }
  let isLogin = to.meta.auth; //是否需要登录
  if (isLogin) {
    let toName = to.name //当前页面name
    let token = store.state.token
    if (!token && toName !== 'login') {
      next({
        path: '/user/login'
      })
    } else {
      if (token && toName === 'login') {
        next({
          path: '/home'
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
