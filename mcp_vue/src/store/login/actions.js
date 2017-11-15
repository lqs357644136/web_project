import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import router from 'router'

export default {
    doLogin: ({ commit }, { self, userId, userPwd }) => {
        Vue.$indicator.open({
            text: '登陆中...',
            spinnerType: 'fading-circle'
        });
        axios.post(url.checkLogin, { userId, userPwd }).then(({ data }) => {
            commit('DOLOGIN', data)
            router.push('/home');
            Vue.$indicator.close()
        })


    }
}