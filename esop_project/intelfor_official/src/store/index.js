
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入模块

const state = {
  menu_choose:'',
}
const actions = {
  set_menu(context,menu){
    context.commit('set_menu',menu);
  }
}
const mutations = {
  set_menu(states,menu){
    states.menu_choose = menu;
  }
}
const getters = {
  get_menu_choose:(state)=>{
    return state.menu_choose;
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
