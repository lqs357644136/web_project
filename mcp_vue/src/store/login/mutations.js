import * as type from './types.js'

export default {
    [type.DOLOGIN](states, opt) {
        states.loginState = true
    },
}