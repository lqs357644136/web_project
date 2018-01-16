
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import i18n from 'common/i18n'

Vue.use(VueRouter)
//获取当前语言
let lang = store.getters.get_lang;
let messages = i18n.getLocaleMessage(lang).message.menu;

//终端页面功能
export const terModule = [{
  //终端主页
  path: '/ter/home',
  name: 'terHome',
  component: resolve => require(['pages/terPages/home/home.vue'], resolve),
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
  component: resolve => require(['pages/terPages/dailywork/adnDailywork.vue'], resolve),
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
  component: resolve => require(['pages/terPages/dailywork/proDailywork.vue'], resolve),
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
  component: resolve => require(['pages/terPages/batchEnter/batchEnterRaw.vue'], resolve),
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
  component: resolve => require(['pages/terPages/batchEnter/batchEnterBlend.vue'], resolve),
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
  component: resolve => require(['pages/terPages/entity/firstEntity.vue'], resolve),
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
  component: resolve => require(['pages/terPages/entity/selfEntity.vue'], resolve),
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
  component: resolve => require(['pages/terPages/product/productInfo/productInfo.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.productInfo,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}, {
  //安灯报表
  path: '/ter/saleLamReport',
  name: 'saleLamReport',
  component: resolve => require(['pages/terPages/saleLamReport/saleLamReport.vue'], resolve),
  //component: phoneHome,
  meta: {
    title: messages.saleLamReport,
    icon: 'fa fa-asl-interpreting',
    auth: false
  }
}
]


//公共模块
const routes = [{
  path: '/404',
  name: 'notPage',
  component: resolve => require(['pages/error/404'], resolve)
}, {
  path: '*',
  redirect: '/404'
},{
  path: '/ter',
  redirect: '/ter/home',
  component: resolve => require(['pages/terPages/App.vue'], resolve),
  //component: phoneLayout,
  children: terModule
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
  if(to.path.indexOf('/ter/')!=-1){
    let base_url = to.query.ip
    store.dispatch('set_host',base_url)
  }
  next();
})

//路由完成之后的操作
router.afterEach(route => {
  
})

export default router
