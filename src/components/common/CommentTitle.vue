<template>
  <div class="comment_wrap">
    <!-- 评论标题 -->
    <div class="commentTitle">
      <span>评论</span><span>({{ commentLength }})</span>
    </div>
    <!-- 评论输入 -->
    <div class="ipt_comment">
      <img :src="image" v-if="image" />
      <img src="@/assets/default_img.jpg" v-else />
      <input
        type="text"
        placeholder="说点什么吧"
        v-model="inputed"
        @focus="$emit('get-focus', inputed)"
        ref="iptComment"
        @blur="blurFocus"
      />
      <button @click="$emit('publish-com', inputed)">发表</button>
    </div>
    <!-- 评论主体 -->
    <comment
      :image="image"
      @comment-length="res => (commentLength = res.length)"
      ref="comMain"
    ></comment>
  </div>
</template>
<script>
import { watch } from 'fs'
const Comment = () =>
  import(
    /* webpackChunkName: "comment" */
    '@/components/common/Comment.vue'
  )

export default {
  data() {
    return {
      inputed: '',
      // 评论计数
      commentLength: 0
    }
  },
  props: ['image'],
  methods: {
    blurFocus() {
      this.$store.commit('blurIpt')
    }
  },
  components: {
    Comment
  },
  computed: {
    isComId() {
      return this.$store.state.isComId
    }
  },
  watch: {
    isComId() {
      this.$refs.iptComment.focus()
    }
  }
}
</script>
<style lang="less" scoped>
.comment_wrap {
  padding: 0.2rem;
  margin-top: 0.4rem;
  // 评论标题
  .commentTitle {
    padding-bottom: 0.133333rem;
    span:nth-child(1) {
      margin-right: 0.2rem;
      font-size: 0.32rem;
    }
    span:nth-child(2) {
      font-size: 0.293333rem;
      color: #aaa;
    }
  }
  // 输入评论区域
  .ipt_comment {
    display: flex;
    justify-content: flex-start;
    // align-items: center;
    padding: 0.2rem 0;
    img {
      width: 0.666667rem;
      height: 0.666667rem;
      border-radius: 50%;
      margin-right: 0.266667rem;
    }
    input {
      align-self: flex-end;
      margin-bottom: 0.04rem;
      width: 100%;
      height: 0.373333rem;
      border: none;
      background-color: #ddd;
      opacity: 0.9;
      border-radius: 0.373333rem;
      padding: 0.093333rem 0.2rem;
      &::placeholder {
        font-size: 0.24rem;
        color: #aaa;
      }
    }
    button {
      align-self: flex-end;
      width: 1.6rem;
      height: 0.666667rem;
      border: none;
      border-radius: 0.266667rem;
      margin-left: 0.266667rem;
      color: white;
      background-color: deeppink;
    }
  }
}
</style>
