import Vue from 'vue'
import Router from 'vue-router'
import login from 'pages/login/login.vue'
import home from 'pages/home/home.vue'

Vue.use(Router)

/**
 * 路由配置
 * 使用懒加载方式加载路由组件
 */
const routerConfig = [{
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: home
    }
]

const router = new Router({
    mode: 'history',
    routes: routerConfig
})

router.beforeEach((transition) => {
    var a = this.a.app.$store

    console.log(a) //报错`````

});

export default router