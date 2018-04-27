import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//获取当前语言

//公共模块
const routes = [{
  path: '/',
  redirect: '/home'
}, {
  //看板主页
  path: '/home',
  name: 'home',
  component: r => require.ensure([], () => r(require('pages/home/home.vue')), 'kanbanHome'),
  //component: phoneHome,
  meta: {
    title: '主页',
    auth: false
  },
}, {
  //海尔看板
  path: '/haierLine',
  name: 'haierLine',
  component: r => require.ensure([], () => r(require('pages/haierLine/haierLine.vue')), 'haierLine'),
  //component: haierLine,
  meta: {
    title: '海尔线看板',
    auth: false
  },
}, ]

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
router.beforeEach((to, from, next) => {
  //判断是否需要获取接口地址
  next();
})

//路由完成之后的操作
router.afterEach(route => {

})

export default router
