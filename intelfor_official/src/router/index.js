import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
Vue.use(VueRouter)

//公共模块
const routes = [{
  //终端主页
  path: '/',
  name: 'App',
  redirect: '/home',
  component: r => require.ensure([], () => r(require('src/pages/App.vue')), 'App'),
  children: [{
      //官网主页
      path: '/home',
      name: 'home',
      component: r => require.ensure([], () => r(require('pages/home/home.vue')), 'home'),
    },
    {
      //成功案例
      path: '/success',
      name: 'success',
      component: r => require.ensure([], () => r(require('pages/success/success.vue')), 'success'),
    }, {
      //联系我们
      path: '/callme',
      name: 'callme',
      component: r => require.ensure([], () => r(require('pages/callme/callme.vue')), 'callme'),
    }, {
      //esop
      path: '/esop',
      name: 'esop',
      component: r => require.ensure([], () => r(require('pages/esop/esop.vue')), 'esop'),
    }, {
      //看板
      path: '/kanban',
      name: 'kanban',
      component: r => require.ensure([], () => r(require('pages/kanban/kanban.vue')), 'kanban'),
    }, {
      //安灯预警
      path: '/andon',
      name: 'andon',
      component: r => require.ensure([], () => r(require('pages/andon/andon.vue')), 'andon'),
    }, {
      //数字车间
      path: '/EMS',
      name: 'EMS',
      component: r => require.ensure([], () => r(require('pages/EMS/EMS.vue')), 'EMS'),
    }, {
      //电子叫料
      path: '/ecm',
      name: 'ecm',
      component: r => require.ensure([], () => r(require('pages/ecm/ecm.vue')), 'ecm'),
    }, {
      //智能设备
      path: '/terminal',
      name: 'terminal',
      component: r => require.ensure([], () => r(require('pages/terminal/terminal.vue')), 'terminal'),
    }, {
      //APS
      path: '/APS',
      name: 'APS',
      component: r => require.ensure([], () => r(require('pages/APS/APS.vue')), 'APS'),
    }
  ]
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
  let name = to.name;
  store.dispatch('set_menu', name)
  next();
})

//路由完成之后的操作
router.afterEach(route => {

})

export default router
