<template>
    <div class="loginTop">
        <div></div>
        <div>{{ topText }}</div>
        <div class="goto">
            <slot name="loginTop"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['topText'],
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .loginTop {
        display: flex;
        justify-content: space-between;
        text-align: center;
        background-color: white;
        height: 0.6rem;
        font-size: 0.266667rem;
        line-height: 0.6rem;

        div {
            flex: 1;
        }

        .goto {
            font-size: .186667rem;
            color: gray;
            cursor: pointer;
        }
    }
</style>