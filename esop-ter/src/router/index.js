
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
    auth: false
  }
},{
  //安灯报表
  path: '/ter/precautions',
  name: 'precautions',
  component:r => require.ensure([], () => r(require('pages/terPages/messagePush/precautions.vue')), 'precautions'),
  //component: precautions,
  meta: {
    title: messages.precautions,
    auth: false
  }
},
{
  //x-r
  path: '/ter/xr',
  name: 'x-r',
  component:r => require.ensure([], () => r(require('pages/terPages/x-r/x-r.vue')), 'x-r'),
  //component: x-r,
  meta: {
    title: messages.x_r,
    auth: false
  }
},
{
  //中技佳电子看板01
  path: '/ter/zjj_demo01',
  name: 'zjj_demo01',
  component:r => require.ensure([], () => r(require('pages/terPages/zjj_demo/zjj_demo01.vue')), 'zjj_demo01'),
  //component: zjj_demo01,
  meta: {
    title: messages.zjj_demo01,
    auth: false
  }
},{
  //中技佳电子看板02
  path: '/ter/zjj_demo02',
  name: 'zjj_demo02',
  component:r => require.ensure([], () => r(require('pages/terPages/zjj_demo/zjj_demo02.vue')), 'zjj_demo02'),
  //component: zjj_demo02,
  meta: {
    title: messages.zjj_demo02,
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
router.beforeEach((to, from, next) => {
  //判断是否需要获取接口地址
  next();
})

//路由完成之后的操作
router.afterEach(route => {
  
})

export default router
