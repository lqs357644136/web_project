
import { getToken, setToken, removeToken } from 'js/cookie.js'


const user = {
    state: {
      user:'',
      token:getToken(),
      roles:''
    },
    mutations: {
     
    },
    actions: {
      userLogin:({commit,state})=>{
        
      }
    },
    getters:{

    }
  }
  
  export default user