
import { getToken, setToken, removeToken } from 'js/cookie.js'
import $http from 'js/request.js'
import url from 'js/api.js'


const user = {
  state: {
    user: '',
    token: getToken(),
    roles: ''
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
    }
  },
  actions: {
    userLogin: ({ commit }, userInfo) => {
        return $http.post(url.checkLogin, {}).then(({ data }) => {
          console.log("登录状态:")
          console.log(data)
          commit('SET_TOKEN', data.token);
          //持久化token
          setToken(data.token);
        })
    }
  }
}

export default user