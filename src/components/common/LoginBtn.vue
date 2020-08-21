<template>
  <div>
    <van-button
      round
      type="info"
      size="large"
      color="linear-gradient(to right,blue,skyblue)"
      native-type="submit"
      >{{ text }}</van-button
    >
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="less" scoped>
div {
  padding: 0 0.133333rem;
  .van-button {
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 0.213333rem;
  }
  .van-button--large {
    height: 0.666667rem;
  }
}
</style>
