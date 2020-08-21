<template>
  <div>
    <van-form @submit="registerSubmit" ref="registerRef">
      <!-- 头部区域 -->
      <login-top topText="登录bilibili" v-slot:loginTop>
        <div @click="goRegister">跳转至注册页面</div>
      </login-top>
      <!-- 主体区域 -->
      <login-main
        lable="账号"
        placeholder="请输入注册的邮箱"
        :rules="[
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            required: true,
            message: '请输入正确得账号',
            trigger: 'onBlur'
          }
        ]"
        @inputchange="res => (account = res)"
      >
      </login-main>
      <login-main
        lable="密码"
        type="password"
        placeholder="请输入密码"
        :rules="[
          {
            pattern: /^[a-zA-Z0-9]\w{5,17}$/,
            required: true,
            message: '请输入密码',
            trigger: 'onBlur'
          }
        ]"
        @inputchange="res => (password = res)"
      >
      </login-main>
      <!-- 注册按钮区域 -->
      <login-btn text="登录"></login-btn>
    </van-form>
  </div>
</template>

<script>
import { log } from 'util'
// 引入公共登录头部组件
const LoginTop = () =>
  import(
    /* webpackChunkName: "register" */
    '@/components/common/LoginTop.vue'
  )
// 引入公共登录主体组件
const LoginMain = () =>
  import(/* webpackChunkName: "register" */ '@/components/common/LoginMain.vue')
// 引入公共登录按钮组件
const LoginBtn = () =>
  import(/* webpackChunkName: "register" */ '@/components/common/LoginBtn.vue')

export default {
  data() {
    return {
      centerText: '注册bilibili',
      account: '',
      password: ''
    }
  },
  components: {
    LoginTop,
    LoginMain,
    LoginBtn
  },
  methods: {
    // 登陆成功
    async registerSubmit() {
      const { data } = await this.$http.post('/login', {
        username: this.account,
        password: this.password
      })

      this.$msg.loading({
        duration: 1000, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
        onClose: () => {
          if (data.code !== 200) {
            this.$msg.fail(data.msg)
            return
          }
          this.$msg.success({
            message: data.msg,
            onClose: () => {
              // 在本地存储中设置token和id
              localStorage.setItem('id', data.id)
              localStorage.setItem('token', data.token)
              // 跳转至home页
              this.$router.push('/')
            }
          })
        }
      })
    },
    // 跳转至注册页面
    goRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped></style>
