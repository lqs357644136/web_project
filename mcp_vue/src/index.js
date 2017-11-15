import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import store from './store/index.js';

Vue.config.productionTip = false

// 引入mint
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
//引入表单验证插件
import { Validate, Config } from 'js/validate.js'
Vue.use(Validate, Config);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    created() {
        this.checkLogin();

    },
    methods: {
        checkLogin() {
            if (false) {
                router.push({ name: 'home' })
            } else {
                router.push({ name: 'login' })
            }
        }
    },
    store: store,
    router: router,
    render: h => h(App)
})