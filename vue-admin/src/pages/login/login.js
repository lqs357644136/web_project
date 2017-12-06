import './login.scss'

export default {
    data() {
        return {
            //数据
            loginBtnLoad:false,
            ruleForm:{
                userId:null,
                userPwd:null
            },
            //规则
            rules:{
                userId:[
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                userPwd:[
                    { required: true, message: ' ', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
    },
    methods: {
        //用户登录
        userLogin() {
            new Promise((resolve,reject)=>{
                let userId = this.ruleForm.userId;
                let userPwd = this.ruleForm.userPwd;
                resolve(this.$store.dispatch('userLogin', {userId:userId,userPwd:userPwd}))
            }).then(()=>{
                if(this.$store.getters.token.length>0){
                    this.$message({
                        showClose: true,
                        message: '欢迎您 '+this.ruleForm.userId,
                        type: 'success'
                      });
                      setTimeout(()=>{
                        this.$router.push({name:'home'})
                      },1000)
                }else{
                    this.$message({
                        showClose: true,
                        message: '登录失败',
                        type: 'warning'
                      });
                }
                
            })
        },
        //验证规则通过然后用户登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginBtnLoad = true;
                    this.userLogin();
                } else {
                    console.log('帐号或者密码格式有误');
                    return false;
                }
            });
        }
    }
}