let url = {
    checkLogin: '/login/checkLogin'
}

let host = 'http://rapapi.org/mockjsdata/26394'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url