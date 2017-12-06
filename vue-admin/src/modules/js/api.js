let url ={
    checkLogin : '/login/checkLogin'
}

//测试环境接口地址
let host = 'http://rap.taobao.org/mockjsdata/26394'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}

export default url