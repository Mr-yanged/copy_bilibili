<template>
  <div>
    <user-info-top
      :image="image"
      @avatar-click="
        $router.push({
          path: '/edit',
          query: {
            img: image
          }
        })
      "
    ></user-info-top>
    <!-- banner图 -->
    <div class="banner">
      <img src="../assets/bannerTop_new.png" alt="" />
    </div>
    <user-info-main :userInfo="userInfo" />
  </div>
</template>

<script>
import { log } from 'util'

// 引入用户信息头部公共组件
const UserInfoTop = () =>
  import(
    /* webpackChunkName: "userInfo" */
    '@/components/common/UserInfoTop.vue'
  )
// 引入用户信息主体部分公共组件
UserInfoMain
const UserInfoMain = () =>
  import(
    /* webpackChunkName: "userInfo" */
    '@/components/common/UserInfoMain.vue'
  )

export default {
  data() {
    return {
      // 顶部用户头像
      image: '',
      // 用户数据对象
      userInfo: {}
    }
  },
  components: {
    UserInfoTop,
    UserInfoMain
  },
  methods: {
    async getUserInfo() {
      const { data } = await this.$http.get(
        '/user/' + localStorage.getItem('id')
      )
      this.userInfo = data[0]

      this.image = data[0].user_img
    }
  },
  mounted() {
    // 获取用户的信息
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.banner {
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
