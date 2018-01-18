
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import i18n from 'common/i18n'

Vue.use(VueRouter)
//获取当前语言
let lang = store.getters.get_lang;
let messages = i18n.getLocaleMessage(lang).message.menu;

//公共模块
const routes = [{
  path: '/404',
  name: 'notPage',
  component:r => require.ensure([], () => r(require('pages/error/404')), 'notPage'),
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/ter',
  redirect: '/ter/home'
},{
  //终端主页
  path: '/ter/home',
  name: 'terHome',
  component:r => require.ensure([], () => r(require('pages/terPages/home/home.vue')), 'terHome'),
  //component: phoneHome,
  meta: {
    title: messages.homePage,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //异常报工
  path: '/ter/dailywork/adnDailywork',
  name: 'adnDailywork',
  component:r => require.ensure([], () => r(require('pages/terPages/dailywork/adnDailywork.vue')), 'terHome'),
  //component: phoneHome,
  meta: {
    title: messages.adnDailywork,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //生产报工
  path: '/ter/dailywork/proDailywork',
  name: 'proDailywork',
  component:r => require.ensure([], () => r(require('pages/terPages/dailywork/proDailywork.vue')), 'proDailywork'),
  //component: phoneHome,
  meta: {
    title: messages.proDailywork,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //原料批次录入
  path: '/ter/batch/batchEnterRaw',
  name: 'batchEnterRaw',
  component:r => require.ensure([], () => r(require('pages/terPages/batchEnter/batchEnterRaw.vue')), 'batchEnterRaw'),
  //component: phoneHome,
  meta: {
    title: messages.batchEnterRaw,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //调合批次录入
  path: '/ter/batch/batchEnterBlend',
  name: 'batchEnterBlend',
  component:r => require.ensure([], () => r(require('pages/terPages/batchEnter/batchEnterBlend.vue')), 'batchEnterBlend'),
  //component: phoneHome,
  meta: {
    title: messages.batchEnterBlend,
    icon: 'fa fa-asl-interpreting',
    auth: false
  },
}, {
  //首件录入
  path: '/ter/firstEntity',
  name: 'firstEntity',
  component:r => require.ensure([], () => r(require('pages/terPages/entity/firstEntity.vue')), 'firstEntity'),
  //component: phoneHome,
  meta: {
    title: messages.firstEntity,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}, {
  //自检录入
  path: '/ter/selfEntity',
  name: 'selfEntity',
  component:r => require.ensure([], () => r(require('pages/terPages/entity/selfEntity.vue')), 'selfEntity'),
  //component: phoneHome,
  meta: {
    title: messages.selfEntity,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}, {
  //产品履历查看
  path: '/ter/productInfo',
  name: 'productInfo',
  component:r => require.ensure([], () => r(require('pages/terPages/product/productInfo/productInfo.vue')), 'productInfo'),
  //component: phoneHome,
  meta: {
    title: messages.productInfo,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}, {
  //机台电子看板
  path: '/ter/machineReachRate',
  name: 'machineReachRate',
  component:r => require.ensure([], () => r(require('pages/terPages/signage/machineReachRate.vue')), 'machineReachRate'),
  //component: machineReachRate,
  meta: {
    title: messages.machineReachRate,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}, {
  //总排程电子看板
  path: '/ter/prodSchedule',
  name: 'prodSchedule',
  component:r => require.ensure([], () => r(require('pages/terPages/signage/prodSchedule.vue')), 'prodSchedule'),
  //component: prodSchedule,
  meta: {
    title: messages.prodSchedule,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
},  {
  //机台电子看板
  path: '/ter/wholeReachRate',
  name: 'wholeReachRate',
  component:r => require.ensure([], () => r(require('pages/terPages/signage/wholeReachRate.vue')), 'wholeReachRate'),
  //component: wholeReachRate,
  meta: {
    title: messages.wholeReachRate,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
},  {
  //安灯报表
  path: '/ter/saleLamReport',
  name: 'saleLamReport',
  component:r => require.ensure([], () => r(require('pages/terPages/saleLamReport/saleLamReport.vue')), 'saleLamReport'),
  //component: phoneHome,
  meta: {
    title: messages.saleLamReport,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
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
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  //判断是否需要获取接口地址
  if(to.path.indexOf('/ter')!=-1){
    let base_url = to.query.ip
    store.dispatch('set_host',base_url)
  }
  next();
})

//路由完成之后的操作
router.afterEach(route => {
  
})

export default router
