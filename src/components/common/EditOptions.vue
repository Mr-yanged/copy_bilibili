<template>
  <div class="editOptions" @click="$emit('edit-options', leftLabel)">
    <span>
      {{ leftLabel }}
    </span>
    <a>
      <slot name="editRight"></slot>
    </a>
  </div>
</template>
<script>
export default {
  props: ['leftLabel']
}
</script>
<style lang="less" scoped>
.editOptions {
  padding: 0 13px;
  height: 0.933333rem;
  font-size: 0.306667rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
