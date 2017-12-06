import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routerOpt = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['pages/login/login.vue'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['pages/home/home.vue'], resolve)
  }
]

export default new Router({
  //mode: 'history',
  routes:routerOpt
})
