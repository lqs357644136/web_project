import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//公共模块
const routes = [
{
  path: '*',
  redirect: '/home'
}, 
{
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
},{
  //科斯达深圳生产管理看板
  path: '/ksd/ksd_man_sz',
  name: 'ksd_man_sz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_man_sz.vue')), 'ksd_man_sz'),
  //component: ksd_man_sz,
  meta: {
    title: '科斯达深圳生产管理看板',
    auth: false
  },
}, {
  //科斯达深圳每日进度看板
  path: '/ksd/ksd_dayBuild_sz',
  name: 'ksd_dayBuild_sz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_dayBuild_sz.vue')), 'ksd_dayBuild_sz'),
  //component: ksd_dayBuild_sz,
  meta: {
    title: '科斯达深圳每日进度看板',
    auth: false
  },
}, {
  //科斯达深圳前加工进度看板
  path: '/ksd/ksd_beforBuild_sz',
  name: 'ksd_beforBuild_sz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_beforBuild_sz.vue')), 'ksd_beforBuild_sz'),
  //component: ksd_beforBuild_sz,
  meta: {
    title: '科斯达深圳前加工进度看板',
    auth: false
  },
},{
  //科斯达深圳车间生产进度看板
  path: '/ksd/ksd_plantBuild_sz',
  name: 'ksd_plantBuild_sz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_plantBuild_sz.vue')), 'ksd_plantBuild_sz'),
  //component: ksd_plantBuild_sz,
  meta: {
    title: '科斯达深圳车间生产进度看板',
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
  //科斯达惠州线看板
  path: '/ksd/ksd_line_hz',
  name: 'ksd_line_hz',
  component: r => require.ensure([], () => r(require('pages/ksd/ksd_line_hz.vue')), 'ksd_line_hz'),
  //component: ksd_line_hz,
  meta: {
    title: '科斯达惠州线看板',
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
}, {
  //上海智汇生产看板
  path: '/als/alsBuild',
  name: 'alsBuild',
  component: r => require.ensure([], () => r(require('pages/als/alsBuild.vue')), 'alsBuild'),
  //component: alsWare,
  meta: {
    title: '上海智汇生产看板',
    auth: false
  },
}, {
  //sop顶部看板
  path: '/sopTop/sopTop',
  name: 'sopTop',
  component: r => require.ensure([], () => r(require('pages/sopTop/sopTop.vue')), 'sopTop'),
  //component: sop顶部看板,
  meta: {
    title: 'sopTop',
    auth: false
  },
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
router.beforeEach((to, from, next) => {
  //判断是否需要获取接口地址
  next();
})

//路由完成之后的操作
router.afterEach(route => {

})

export default router
