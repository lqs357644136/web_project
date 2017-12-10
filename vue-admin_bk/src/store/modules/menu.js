
import { getToken, setToken, removeToken } from 'js/cookie.js'
import $http from 'js/request.js'
import url from 'js/api.js'


const menu = {
  state: {
    leftMenu:false,
    
  },
  mutations: {
    UPDATE_LEFTMENU: (state, flag) => {
      state.leftMenu = flag
    }
  },
  actions: {
    changeLeftMenu: ({ commit }, flag) => {
        commit('UPDATE_LEFTMENU',flag)
    }
  }
}

export default menu