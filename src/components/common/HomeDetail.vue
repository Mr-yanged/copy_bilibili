<template>
  <div class="homeDetail">
    <div class="img" @click="$emit('cover-click')">
      <img
        src="@/assets/5153cd63dfba027d155826043336bacc.jpg"
        alt=""
        v-if="mark % 8 == 0"
      />
      <img :src="detail.img" alt="" v-else />
      <div>
        <span class="playAmount iconfont"><em>&#xe616;</em> 1999</span>
        <span class="content iconfont"
          ><em>&#xe66e;</em>
          {{ detail.commentlen ? detail.commentlen : 66 }}</span
        >
      </div>
    </div>
    <p>{{ detail.name }}</p>
  </div>
</template>
<script>
export default {
  props: {
    detail: Object,
    mark: Number
  }
}
</script>
<style lang="less" scoped>
.homeDetail {
  padding: 0.066667rem;

  .img {
    position: relative;
    height: 2.666667rem;

    img {
      width: 100%;
      height: 100%;
    }

    div {
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.1) 100%,
        transparent
      );
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.32rem;
      box-shadow: 0px 0px 40px 2px rgba(0, 0, 0, 0.3);

      em {
        font-style: normal;
      }
    }
  }

  p {
    margin: 0.066667rem 0;
    font-size: 0.32rem;
  }
}
</style>
