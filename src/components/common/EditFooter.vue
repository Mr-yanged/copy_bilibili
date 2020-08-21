<template>
    <div class="editFooter" @click="$emit('click-footer')">
        {{editFooterText}}
    </div>
</template>
<script>
    export default {
        props: ['editFooterText']
    }
</script>
<style lang="less" scoped>
    .editFooter {
        background-color: white;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: .32rem;
    }
</style>