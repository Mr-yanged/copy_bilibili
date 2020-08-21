<template>
  <div class="comments">
    <div v-for="(item, index) in itemData" :key="index">
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
          <div v-if="temp">
            回复
            <span class="reply_front">
              @{{
                item.parent_user_info ? item.parent_user_info.name : 'XXXXX'
              }}
            </span>
            {{ item.comment_content }}
            <span class="reply_back" @click="clickReply(item.comment_id)">
              回复
            </span>
          </div>
          <div v-else>
            {{ item.comment_content }}
            <span class="reply_back" @click="clickReply(item.comment_id)">
              回复
            </span>
          </div>
        </div>
      </div>
      <div>
        <comment-item :item-data="item.child" :temp="true"></comment-item>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentItem',
  props: {
    itemData: Array,
    temp: Boolean
  },
  methods: {
    clickReply(comId) {
      this.$store.commit('reply', comId)
    }
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
      > div {
        width: 100%;
        padding-right: 5px;
        font-size: 0.32rem;
      }
      .reply_front {
        color: cornflowerblue;
      }
      .reply_back {
        float: right;
        margin-right: 0.133333rem;
        color: red;
      }
    }
  }
}
</style>
