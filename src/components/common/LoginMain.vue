<template>
  <div class="loginMain">
    <van-field
      v-model.lazy="text"
      :label="lable"
      :type="type"
      :placeholder="placeholder"
      :rules="rules"
    />
  </div>
</template>

<script>
export default {
  props: { lable: String, type: String, placeholder: String, rules: Array },
  data() {
    return {
      text: ''
    }
  },
  watch: {
    text(val) {
      this.$emit('inputchange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.loginMain {
  margin-top: 0.266667rem;

  .van-cell {
    font-size: 0.266667rem;
    line-height: 0.32rem;
  }
  .van-field--error /deep/ .van-field__control,
  .van-field--error /deep/ .van-field__control::placeholder {
    color: #ccc;
  }
}
</style>
