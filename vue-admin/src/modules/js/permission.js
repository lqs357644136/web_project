import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from 'js/cookie.js'

router.beforeEach((to, from, next) => {
    // 开启Progress
    NProgress.start();
    if(getToken()){
        if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
    }
})

router.afterEach(() => {
    // 结束Progress
    NProgress.done();
    console.log(456)
})