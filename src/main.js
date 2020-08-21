import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入lib-flexible
import 'lib-flexible/flexible.js'
// 引入全局css
import './assets/css/global.css'
// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant'

// 引入字体图标
import './assets/fonts/iconfont.css'

// 引入axios
import http from '../http.js'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('./assets/timg.gif'),
    error: require('./assets/fail.jpg'),
    VueLazyload: 3
})

Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')