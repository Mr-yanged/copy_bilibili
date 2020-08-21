<template>
  <div>
    <user-info-top :image="image" @avatar-click="avatarClick"></user-info-top>
    <!-- 滚动tab -->
    <van-tabs sticky swipeable v-model="active">
      <van-tab v-for="item in category" :title="item.title" :key="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <div class="detail">
            <home-detail
              v-for="(smitem, index) in item.list"
              :key="index"
              :detail="smitem"
              :mark="index"
              @cover-click="coverClick(smitem.id)"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
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
const HomeDetail = () =>
  import(
    /* webpackChunkName: "userInfo" */
    '@/components/common/HomeDetail.vue'
  )
export default {
  data() {
    return {
      image: '',
      // tab 标签页分类数据源
      category: [],
      active: 0,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getUserInfo() {
      const { data } = await this.$http.get(
        '/user/' + localStorage.getItem('id')
      )
      // this.userInfo = data[0]

      this.image = data[0].user_img
    },
    async getCate() {
      const { data } = await this.$http.get('/category')
      this.category = this.changeCate(data)
      // console.log(data)
      // this.category = data
      this.selectArticle()
    },
    async selectArticle() {
      const { data } = await this.$http.get('/detail/' + this.cateItem._id, {
        params: {
          page: this.cateItem.page,
          pagesize: this.cateItem.pagesize
        }
      })
      this.cateItem.list.push(...data)
      this.loading = false
      if (data.length < 8) {
        this.finished = true
      }
    },
    changeCate(data) {
      const newData = data.map((item, index) => {
        item.list = []
        item.page = index
        item.pagesize = 12
        return item
      })
      return newData
    },
    // 用户到达页面底部
    onLoad() {
      setTimeout(() => {
        this.cateItem.page = this.cateItem.page + 1
        this.selectArticle()
      }, 1000)
    },
    // 点击封面去往视频详情页
    coverClick(id) {
      this.$router.push({
        path: '/article/' + id
      })
    },
    avatarClick() {
      if (localStorage.getItem('token') && localStorage.getItem('id')) {
        this.$router.push('/userinfo')
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    cateItem() {
      return this.category[this.active]
    }
  },
  watch: {
    active: function(val) {
      this.selectArticle()
    }
  },
  components: {
    UserInfoTop,
    HomeDetail
  },
  mounted() {
    if (localStorage.getItem('token')) {
      // 获取用户的信息
      this.getUserInfo()
    }
    // 获取home页分类
    this.getCate()
  }
}
</script>
<style lang="less" scoped>
.detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.133333rem;

  .homeDetail {
    width: 48%;
  }
}
/deep/ .van-tab {
  font-size: 0.373333rem;
}
</style>
