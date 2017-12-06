import './login.scss'

export default {
    data() {
        return {
            userId:'',
            userPwd:''
        }
    },
    methods: {
        userLogin(){
            let userId = this.userId;
            let userPwd = this.userPwd;
            this.$store.dispatch('userLogin',{userId:this.userId,userPwd:this.userPwd})
        }
    }
}