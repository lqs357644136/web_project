import Vue from 'vue'
import Router from 'vue-router'
import firstPages from '@/pages/firstPages.vue'
import secondPages from '@/pages/secondPages.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/firstPages'
    },
    {
      path: '/firstPages',
      name: 'firstPages',
      component: firstPages
    },
    {
      path: '/secondPages',
      name: 'secondPages',
      component: secondPages
    }
  ]
})
