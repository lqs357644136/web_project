
const getters = {
    user: (state) => {
        return state.user.token
    },
    token: (state) => {
        return state.user.token
    },
    roles: (state) => {
        return state.user.roles
    },
    roleMenu:(state)=>{
        return state.user.roleMenu
    },
    leftMenu: (state) => {
        return state.menu.leftMenu
    }

}

export default getters