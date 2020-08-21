import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入注册组件
const Register = () =>
    import ( /* webpackChunkName: "register" */ '../components/Register.vue')
    // 引入登录组件
const Login = () =>
    import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    // 引入用户信息页
const UserInfo = () =>
    import (
        /* webpackChunkName: "userInfo" */
        '@/views/UserInfo.vue'
    )
const Edit = () =>
    import (
        /* webpackChunkName: "userInfo" */
        '@/views/Edit.vue'
    )
    // 引入Home页
const Home = () =>
    import (
        /* webpackChunkName: "home" */
        '@/views/Home.vue'
    )
const Article = () =>
    import (
        /* webpackChunkName: "home" */
        '@/views/Article.vue'
    )

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/userInfo',
        component: UserInfo
    },
    {
        path: '/edit',
        component: Edit
    },
    {
        path: '/home',
        component: Home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/article/:id',
        component: Article
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (
        to.path !== '/login' &&
        to.path !== '/home' &&
        to.path !== '/article/' + to.params.id &&
        to.path !== '/register' &&
        !localStorage.getItem('token')
    ) {
        next('/login')
    } else {
        next()
    }
})

export default router