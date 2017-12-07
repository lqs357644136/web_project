
import { getToken, setToken, removeToken } from 'js/cookie.js'
import $http from 'js/request.js'
import url from 'js/api.js'


const user = {
  state: {
    user:null,
    token: getToken(),
    roles:null,
    roleMenu:[],
    addRouter:[]
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLEMENU: (state, roleMenu) => {
      state.roleMenu = state.roleMenu.concat( roleMenu );
    }
  },
  actions: {
    //获取用户信息和token
    userLogin: ({ commit }, userInfo) => {
        return $http.post(url.checkLogin, {}).then(({ data }) => {
          commit('SET_TOKEN', data.token);
          commite('SET_ROLES',data.userInfo.role);
          commite('SET_USER',data.userInfo.user);
          //持久化token
          setToken(data.token);
        })
    },
    //整合用户对应角色的菜单与路由
    upDateRoleMenu:({commit},roleMenu)=>{
      commit('SET_ROLEMENU',roleMenu);
    },
  }
}

export default user