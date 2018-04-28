import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
  //海尔线看板
  path: '/haier/haierLine',
  name: 'haierLine',
  component: r => require.ensure([], () => r(require('pages/haier/haierLine.vue')), 'haierLine'),
  //component: haierLine,
  meta: {
    title: '海尔线看板',
    auth: false
  },
}, {
  //科斯达深圳线看板
  path: '/ksd/ksd_line_sz',
  name: 'ksd_line_sz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_line_sz.vue')), 'ksd_line_sz'),
  //component: ksd_line_sz,
  meta: {
    title: '科斯达深圳线看板',
    auth: false
  },
}, {
  //科斯达惠州总看板
  path: '/ksd/ksd_build_hz',
  name: 'ksd_build_hz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_build_hz.vue')), 'ksd_build_hz'),
  //component: ksd_build_hz,
  meta: {
    title: '科斯达惠州总看板',
    auth: false
  },
}, {
  //上海智汇仓库看板
  path: '/als/alsWare',
  name: 'alsWare',
  component: r => require.ensure([], () => r(require('pages/als/alsWare.vue')), 'alsWare'),
  //component: alsWare,
  meta: {
    title: '上海智汇仓库看板',
    auth: false
  },
} ]

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
