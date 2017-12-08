
import { getToken, setToken, removeToken } from 'js/cookie.js'
import $http from 'js/request.js'
import url from 'js/api.js'


const user = {
  state: {
    token: getToken(),
    userInfo:{},
    roleMenu:[],
    addRouter:[]
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLEMENU: (state, roleMenu) => {
      state.roleMenu = state.roleMenu.concat( roleMenu );
    }
  },
  actions: {
    //获取token
    getToken: ({ commit }, { userId , userPwd }) => {
        return $http.post(url.getToken).then(({ data }) => {
          commit('SET_TOKEN', data.token);
          //持久化token
          setToken(data.token);
        })
    },
    //获取用户信息
    getUserInfo: ({ commit , state}) => {
      return $http.post(url.getUserInfo, {token:state.token}).then(({ data }) => {
        
      console.log(data.userInfo[0])
        commit('SET_USERINFO', data.userInfo[0]);
      })
    }
  }
}

export default user