<template>
  <div>
    <van-form @submit="registerSubmit" ref="registerRef">
      <!-- 头部区域 -->
      <login-top topText="注册bilibili" v-slot:loginTop>
        <div @click="goLogin">跳转至登陆页面</div>
      </login-top>
      <!-- 主体区域 -->
      <login-main
        lable="姓名"
        placeholder="请输入姓名"
        :rules="[
          {
            pattern: /^.{6,16}$/,
            required: true,
            message: '请输入3到16位得字符',
            trigger: 'onBlur'
          }
        ]"
        @inputchange="res => (username = res)"
      ></login-main>
      <login-main
        lable="账号"
        placeholder="请输入邮箱"
        :rules="[
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            required: true,
            message: '请输入正确得邮箱',
            trigger: 'onBlur'
          }
        ]"
        @inputchange="res => (account = res)"
      ></login-main>
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
      ></login-main>
      <!-- 注册按钮区域 -->
      <login-btn text="注册"></login-btn>
    </van-form>
  </div>
</template>

<script>
import { log } from 'util'
// 引入公共登录头部组件
const LoginTop = () =>
  import(
    /* webpackChunkName: "register" */
    './common/LoginTop.vue'
  )
// 引入公共登录主体组件
const LoginMain = () =>
  import(/* webpackChunkName: "register" */ './common/LoginMain.vue')
// 引入公共登录按钮组件
const LoginBtn = () =>
  import(/* webpackChunkName: "register" */ './common/LoginBtn.vue')

export default {
  data() {
    return {
      centerText: '注册bilibili',
      username: '',
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
    // 注册表单验证成功
    async registerSubmit() {
      const { data } = await this.$http.post('/register', {
        name: this.username,
        username: this.account,
        password: this.password
      })
      console.log(data)
      if (data.code !== 200) {
        this.$msg.fail(data.msg)
        return
      }
      // 注册成功，将id和token存至sessionStorage中
      localStorage.setItem('id', data.id)
      localStorage.setItem('token', data.objtoken)
      this.$msg.success({
        message: data.msg,
        onClose: () => {
          this.$msg.loading({
            duration: 1000, // 持续展示 toast
            forbidClick: true,
            message: '正在跳转至详情页页',
            onClose: () => {
              this.$router.push('/userInfo')
            }
          })
        }
      })
    },
    // 跳转至登陆页面
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped></style>
