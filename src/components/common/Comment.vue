<template>
  <div class="comments">
    <div v-for="(item, index) in commentData" :key="index">
      <div class="comment">
        <img
          v-lazy="item.userinfo.user_img"
          src=""
          v-if="item.userinfo && item.userinfo.user_img"
        />
        <img src="@/assets/default_img.jpg" v-else />
        <div class="comment_main">
          <p>
            <span>{{
              item.userinfo && item.userinfo.name ? item.userinfo.name : '游客'
            }}</span
            ><span>{{ item.comment_date }}</span>
          </p>
          <div>
            {{ item.comment_content }}
            <span class="reply_back" @click="clickReply(item.comment_id)"
              >回复</span
            >
          </div>
        </div>
      </div>
      <div style="padding:0 0.8rem">
        <comment-item :item-data="item.child"></comment-item>
      </div>
    </div>
  </div>
</template>
<script>
const CommentItem = () =>
  import(
    /* webpackChunkName: "comment" */
    '@/components/common/CommentItem.vue'
  )

export default {
  data() {
    return {
      commentData: []
    }
  },
  methods: {
    // 获取评论数据
    async getComment() {
      const { data } = await this.$http.get('/comment/' + this.$route.params.id)
      // 评论length
      if (data) {
        this.$emit('comment-length', data)
      }
      this.commentData = this.correctComment(null, data)
    },
    correctComment(temp, data) {
      let newData = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].parent_id == temp) {
          newData.push(data[i])
          data[i].child = this.correctComment(data[i].comment_id, data)
        }
      }
      return newData
    },
    clickReply(comId) {
      this.$store.commit('reply', comId)
    }
  },
  components: {
    CommentItem
  },
  mounted() {
    this.getComment()
  }
}
</script>
<style lang="less" scoped>
.comments {
  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .comment {
    padding: 0.2rem 0;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e7e7e7;
    img {
      width: 0.733333rem;
      height: 0.733333rem;
      border-radius: 50%;
      margin-right: 0.266667rem;
    }
    .comment_main {
      width: 100%;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.133333rem;
        color: #666;
        span:nth-child(1) {
          font-size: 0.24rem;
        }
        span:nth-child(2) {
          font-size: 0.213333rem;
        }
      }
      > div:nth-child(1) {
        width: 100%;
        padding-right: 5px;
      }
      .reply_back {
        float: right;
        margin-right: 0.2rem;
        color: red;
      }
    }
  }
}
</style>
