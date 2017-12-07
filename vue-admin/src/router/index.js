import Vue from 'vue'
import Router from 'vue-router'
import menu from 'pages/layout/menu.vue'
Vue.use(Router)

//publicOpt为所有人都可以看到的页面
//roleOpt为特定角色才能看到的页面

export const publicOpt = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['pages/login/login.vue'], resolve)
  },
  {
    path: '/home',
    component: menu,
    redirect: '/home',
    children: [{
      path: '/home',
      component: resolve => require(['pages/home/home.vue'], resolve),
      meta: {
        title: 'home page',
        icon: 'icon-bell',
        role: ['admin', 'normal']
      }
    }]
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/404',
    component: resolve => require(['pages/errorPage/errorPage404.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404',
  }
]

export const roleOpt = [
  {
    path: '/other01',
    component: menu,
    redirect: '/other01',
    children: [{
      path: '/other01',
      component: resolve => require(['pages/other01/other01.vue'], resolve),
      meta: {
        title: 'other01 nav',
        icon: 'sold-out',
        role: ['admin']
      }
    }]
  },
  {
    path: '/other02',
    component: menu,
    redirect: '/other02',
    children: [{
      path: '/other02',
      component: resolve => require(['pages/other02/other02.vue'], resolve),
      meta: {
        title: 'other02 nav',
        icon: 'sold-out',
        role: ['admin']
      }
    }]
  }
]

export default new Router({
  //mode: 'history',
  routes: publicOpt
})
