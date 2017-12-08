import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from 'js/cookie.js'
import { addRoleRouter } from 'js/util.js'

router.beforeEach((to, from, next) => {
    // 开启Progress
    NProgress.start();
    //检测token是否存在或者没有过期
    next()
})

router.afterEach((to) => {
    if(!getToken()){
        if (to.path != '/login') {
            if(to.meta.auth){
                router.push({path: '/login'});
            }
        }
    }else{
        if (to.path === '/login') {
            router.push({path: '/'});
        }
    }
    // 结束Progress
    NProgress.done();
})
