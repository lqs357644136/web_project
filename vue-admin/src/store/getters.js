


const getters = {
    user: (state) => {
        return state.user.token
    },
    token: (state) => {
        return state.user.token
    },
    roles: (state) => {
        return state.user.roles
    }
}

export default getters