
const getters = {
    userInfo: (state) => {
        return state.user.userInfo
    },
    token: (state) => {
        return state.user.token
    },
    leftMenu: (state) => {
        return state.menu.leftMenu
    }

}

export default getters