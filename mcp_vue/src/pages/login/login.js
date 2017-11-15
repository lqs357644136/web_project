import Vue from 'vue'
import './login.scss'

export default {
    name: 'login',
    data() {
        return {
            userId: null,
            userPwd: null,
            type: this.$store.getters.getLoginState
        }
    },
    created() {},
    methods: {
        doLogin() {
            const userId = this.userId;
            const userPwd = this.userPwd;
            const self = this;
            self.$store.dispatch('doLogin', { self, userId, userPwd })
        }
    }
}