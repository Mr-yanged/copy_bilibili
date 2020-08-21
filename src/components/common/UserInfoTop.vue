<template>
  <div class="userInfoTop">
    <div>
      <img src="@/assets/e62b6b095ef38dfb742687f11e4b570dde420b5d.png" alt="" />
    </div>
    <div>
      <van-search
        v-model="seach"
        placeholder="请输入你想搜索的内容"
        shape="round"
      />
    </div>
    <div>
      <img :src="image" alt="" @click="$emit('avatar-click')" v-if="image" />
      <img
        src="@/assets/default_img.jpg"
        alt=""
        @click="$emit('avatar-click')"
        v-else
      />
      <van-button square type="primary" color="pink">下载APP</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seach: ''
    }
  },
  props: ['image']
}
</script>

<style lang="less" scoped>
.userInfoTop {
  display: flex;
  height: 0.933333rem;
  justify-content: center;
  padding: 5px 0;

  > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem;

    img {
      width: 80%;
    }
  }

  > div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 10px;

    .van-search {
      width: 100%;
      padding: 0;

      .van-cell {
        font-size: 0.32rem;
        line-height: normal;
        display: flex;
        align-items: center;
      }
    }
  }

  > div:nth-child(3) {
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-button {
      height: 100%;
      margin-left: 10px;
      font-size: 0.266667rem;
      line-height: 100%;
    }

    img {
      width: 0.666667rem;
      height: 0.666667rem;
      border-radius: 50%;
    }
  }
}
</style>
