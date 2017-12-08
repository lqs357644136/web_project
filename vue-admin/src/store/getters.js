
const getters = {
    userInfo: (state) => {
        return state.user.userInfo
    },
    token: (state) => {
        return state.user.token
    },
    roleMenu:(state)=>{
        return state.user.roleMenu
    },
    leftMenu: (state) => {
        return state.menu.leftMenu
    }

}

export default getters