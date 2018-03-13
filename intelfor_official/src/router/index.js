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
  }, {
    //产品方案
    path: '/plan',
    name: 'plan',
    component: r => require.ensure([], () => r(require('pages/plan/plan.vue')), 'plan'),
  }, {
    //成功案例
    path: '/success',
    name: 'success',
    component: r => require.ensure([], () => r(require('pages/success/success.vue')), 'success'),
  }, {
    //联系我们
    path: '/callme',
    name: 'callme',
    component: r => require.ensure([], () => r(require('pages/callme/callme.vue')), 'callme'),
  }]
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
