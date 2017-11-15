import Vue from 'vue'
import './login.scss'

export default {
    name: 'login',
    data() {
        return {
            userId: null,
            userPwd: null,
            type: this.$store.getters.getLoginState,
            email: null
        }
    },
    created() {},
    methods: {
        doLogin() {
            const userId = this.userId;
            const userPwd = this.userPwd;
            const self = this;
            if (userId && userPwd) {
                self.$store.dispatch('doLogin', { self, userId, userPwd })
            } else {
                this.$toast({
                    message: '帐号或者密码不能为空',
                    position: 'bottom'
                });
            }
        }
    }
}