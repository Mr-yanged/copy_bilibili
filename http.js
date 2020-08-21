import axios from 'axios'
import Vue from 'vue'
import router from './src/router/index.js'

const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

// 设置请求头
http.interceptors.request.use(config => {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
})
http.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        return response
    },
    function(error) {
        console.dir(error)
        if (error.response.status === 401 || error.response.status === 402) {
            Vue.prototype.$msg.fail({
                message: error.response.data.message,
                onClose: () => {
                    router.push('/login')
                }
            })
        }
        return Promise.reject(error)
    }
)

export default http