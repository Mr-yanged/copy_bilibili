<template>
  <div class="article">
    <user-info-top :image="image" @avatar-click="avatarClick"></user-info-top>
    <div class="video">
      <video controls :src="articleData.content"></video>
    </div>
    <div class="infoText">
      <div>
        <span>{{ articleData.category.title }}</span>
        <span>{{ articleData.name }}</span>
      </div>
      <div>
        <span>{{ articleData.userinfo.name }}</span>
        <p>
          <span>888.8W次观看</span>
          <span>1W+弹幕</span>
          <span>{{ articleData.date }}</span>
        </p>
      </div>
      <div>
        <p>
          <span
            :class="{ collection: isCollection }"
            class="iconfont"
            @click="collectionClick"
            >&#xe694;</span
          >
          <span>收藏</span>
        </p>
        <p>
          <span
            class="iconfont"
            :class="{ collection: isSubscription }"
            @click="subcriptionClick"
            >&#xe607;</span
          >
          <span>关注</span>
        </p>
        <p>
          <span class="iconfont">&#xe6cf;</span>
          <span>分享</span>
        </p>
      </div>
    </div>
    <!-- 推荐区域 -->
    <ul class="articleTab">
      <li class="current">推荐</li>
      <li>看过</li>
    </ul>
    <div class="detail">
      <home-detail
        v-for="(item, index) in commendData"
        :key="index"
        :detail="item"
        :mark="index"
        @cover-click="coverClick(item.id)"
      />
    </div>
    <!-- 评论区域 -->
    <comment-title
      @get-focus="getFocus($event)"
      @publish-com="publish($event)"
      ref="comTit"
    />
  </div>
</template>
<script>
// 导入导航栏模块
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
CommentTitle
const CommentTitle = () =>
  import(
    /* webpackChunkName: "comment" */
    '@/components/common/CommentTitle.vue'
  )
import { formatDate } from '../../date.js'

export default {
  data() {
    return {
      image: '',
      articleData: {
        category: {},
        userinfo: {}
      },
      commendData: [],
      // 发布评论参数
      postCom: {
        comment_content: '',
        comment_date: '',
        article_id: '',
        parent_id: null
      },
      // 是否收藏
      isCollection: false,
      // 是否关注
      isSubscription: false
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
    async getArticleData(id) {
      const { data } = await this.$http.get('/article/' + id)
      this.articleData = data[0]
      this.getsubcriptionInfo()
    },
    async getCommend() {
      const { data } = await this.$http.get('/commend')
      this.commendData = data
    },
    coverClick(id) {
      this.$router.push({
        path: '/article/' + id
      })
    },
    getFocus(val) {
      // 用户未登录
      if (!localStorage.getItem('token') && !localStorage.getItem('id')) {
        this.$msg.fail('请先登录')
        return
      }
    },
    avatarClick() {
      if (localStorage.getItem('token') && localStorage.getItem('id')) {
        this.$router.push('/userinfo')
      } else {
        this.$router.push('/login')
      }
    },
    // 发布评论
    async publish(val) {
      if (val.length === 0) {
        this.$msg.fail('~内容不能为空')
        return
      }
      this.postCom.comment_content = val
      const date = new Date()
      const newDate = formatDate(date, 'MM-dd')
      this.postCom.comment_date = newDate
      this.postCom.article_id = this.$route.params.id
      this.postCom.parent_id = this.$store.state.comId
      const res = await this.$http.post(
        '/comment_post/' + localStorage.getItem('id'),
        this.postCom
      )
      if (res.status === 200) {
        this.$refs.comTit.inputed = ''
        this.$refs.comTit.$refs.comMain.getComment()
        this.postCom.parent_id = null
        this.$msg.success('评论成功')
      }
    },
    // 收藏文章
    async collectionClick() {
      if (!localStorage.getItem('id')) {
        this.$msg.fail('请先登录')
        return
      }
      const res = await this.$http.post(
        '/collection/' + localStorage.getItem('id'),
        {
          article_id: this.$route.params.id
        }
      )
      if (res.status === 200) {
        if (res.data.msg == '收藏成功') {
          this.isCollection = true
          this.$msg(res.data.msg)
          return
        } else {
          this.isCollection = false
          this.$msg(res.data.msg)
          return
        }
      }
      this.isCollection = false
      console.log(res)
    },
    // 进入页面判断是否收藏
    async getCollectionInfo() {
      if (!localStorage.getItem('token')) {
        return
      }
      const { data } = await this.$http.get(
        '/collection/' + localStorage.getItem('id'),
        {
          params: {
            article_id: this.$route.params.id
          }
        }
      )
      this.isCollection = data.success
    },
    // 关注up猪
    async subcriptionClick() {
      if (!localStorage.getItem('id')) {
        this.$msg.fail('请先登录')
        return
      }
      const res = await this.$http.post(
        '/sub_scription/' + localStorage.getItem('id'),
        {
          sub_id: this.articleData.userid
        }
      )
      if (res.status === 200) {
        if (res.data.msg == '关注成功') {
          this.isSubscription = true
          this.$msg(res.data.msg)
          return
        } else {
          this.isSubscription = false
          this.$msg(res.data.msg)
          return
        }
      }
      this.isSubscription = false
    },
    // 进入页面判断是否关注
    async getsubcriptionInfo() {
      if (!localStorage.getItem('token')) {
        return
      }
      const { data } = await this.$http.get(
        '/sub_scription/' + localStorage.getItem('id'),
        {
          params: {
            sub_id: this.articleData.userid
          }
        }
      )
      this.isSubscription = data.success
    }
  },
  watch: {
    $route() {
      // 获取用户的信息
      this.getUserInfo()
      // 通过路由参数传过来的id
      const id = this.$route.params.id
      this.getArticleData(id)
      //  获取推荐数据
      this.getCommend()
      this.getCollectionInfo()
      this.getsubcriptionInfo()
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      // 获取用户的信息
      this.getUserInfo()
    }
    // 通过路由参数传过来的id
    const id = this.$route.params.id
    this.getArticleData(id)
    //  获取推荐数据
    this.getCommend()
    this.getCollectionInfo()
  },
  components: {
    UserInfoTop,
    HomeDetail,
    CommentTitle
  }
}
</script>
<style lang="less" scoped>
.video {
  width: 100%;

  video {
    width: 100%;
  }
}

.infoText {
  padding: 0.2rem 0.2rem;

  > div {
    margin: 0.2rem 0;
  }

  > div:nth-child(1) {
    span:nth-child(1) {
      color: pink;
      font-size: 0.373333rem;
      margin-right: 0.2rem;
      text-shadow: 0px 0px 10px pink;
    }

    span:nth-child(2) {
      font-size: 0.333333rem;
    }
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > span {
      font-size: 0.346667rem;
      margin-right: 0.466667rem;
      font-weight: 500;
    }

    p {
      color: #aaa;
      font-size: 0.293333rem;
      padding-top: 2px;

      span {
        margin-right: 0.4rem;
      }
    }
  }

  > div:nth-child(3) {
    display: flex;
    justify-content: flex-start;
    align-content: center;

    p {
      margin-right: 0.4rem;

      span {
        color: #888;
      }

      span:nth-child(1) {
        font-size: 0.453333rem;
        margin-right: 0.093333rem;
      }

      span:nth-child(2) {
        font-size: 0.293333rem;
      }
    }
  }
}
.detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.133333rem;

  .homeDetail {
    width: 48%;
  }
}
.articleTab {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  li {
    margin: 0.133333rem 0.2rem;
    padding: 0.066667rem;

    font-size: 0.4rem;
  }
}
.current {
  color: pink;
  border-bottom: 2px solid #ccc;
}

.collection {
  color: pink !important;
}
</style>
