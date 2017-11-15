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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    created() {
        this.checkLogin();

    },
    methods: {

        checkLogin() {
            if (this.$store.getters.getLoginState) {
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