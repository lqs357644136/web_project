import axios from 'axios'
import Vue from 'vue'
const $https = axios.create({
    timeout: 5000, // 请求超时时间
})

// request拦截器,在这里添加token
$https.interceptors.request.use(config => {
    return config
})

export default $https