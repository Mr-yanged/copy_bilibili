<template>
    <div class="userInfoMain">
        <div class="main_head">
            <div class="userImg">
                <img :src="userInfo.user_img" alt="" />
            </div>
            <div class="edit_data">
                <div class="edit_data_head">
                    <div>
                        <strong>0</strong>
                        <span>粉丝</span>
                    </div>
                    <div>
                        <strong>54</strong>
                        <span>关注</span>
                    </div>
                    <div>
                        <strong>0</strong>
                        <span>获赞</span>
                    </div>
                </div>
                <div class="edit_data_body" @click="
            $router.push({
              path: '/edit',
              query: {
                img: userInfo.user_img
              }
            })
          ">
                    编辑资料
                </div>
            </div>
        </div>
        <div class="main_body">
            <div>
                <h4>{{ userInfo.name }}</h4>
                <span class="iconfont famale" v-if="userInfo.gender == 1">&#xe615;</span>
                <span class="iconfont" v-else>&#xe628;</span>
                <em>编辑</em>
            </div>
            <div>
                <div class="tips">
                    <p>
                        {{
              userInfo.user_desc
                ? userInfo.user_desc
                : '这个人很神秘，什么都么有留下'
            }}
                    </p>
                    <span>收起</span>
                </div>
                <p class="uid">uid:{{ userInfo.id }}</p>
            </div>
            <div>
                <button class="active-btn">动态</button>
                <button>视频</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        // 用户数据对象
        props: {
            userInfo: Object
        }
    }
</script>
<style lang="less" scoped>
    .userInfoMain {
        padding: 5px 10px;

        .main_head {
            display: flex;
            justify-content: space-between;

            .userImg {
                width: 1.733333rem;
                height: 1.733333rem;
                margin-right: 10px;

                img {
                    width: 110%;
                    border-radius: 50%;
                    transform: translateY(-0.2rem);
                }
            }

            .edit_data {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                margin-left: 0.133333rem;
                padding: 0 0 0 0.266667rem;

                .edit_data_head {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;

                    div {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.373333rem;

                        strong {
                            font-weight: 300;
                        }

                        span {
                            color: gray;
                        }
                    }
                }

                .edit_data_body {
                    margin-top: 10px;
                    height: 0.666667rem;
                    text-align: center;
                    line-height: 0.666667rem;
                    border: 1px solid pink;
                    font-size: 0.373333rem;
                    color: pink;
                    cursor: pointer;
                }
            }
        }

        .main_body {
            >div:nth-child(1) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 10px;
                padding: 0 5px;

                h4 {
                    margin: 0;
                    font-weight: 600;
                    font-size: 0.426667rem;
                }

                .famale {
                    color: pink;
                }

                span {
                    margin: 0 5px;
                    color: skyblue;
                    font-size: 0.373333rem;
                }

                em {
                    font-style: normal;
                    font-size: 0.32rem;
                    color: skyblue;
                }
            }

            >div:nth-child(2) {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                margin-top: 5px;

                .tips {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    p {
                        color: #bbb;
                        font-size: 0.346667rem;
                    }

                    span {
                        color: blue;
                        font-size: 0.32rem;
                    }
                }

                p {
                    margin: 3px;
                    color: #333;
                    font-size: 0.293333rem;
                }
            }

            >div:nth-child(3) {
                margin-top: 20px;
                display: flex;
                justify-content: flex-start;

                button {
                    border: 0;
                    background-color: white;
                    font-size: 0.373333rem;
                }

                :last-child {
                    margin-left: 20px;
                }

                .active-btn {
                    color: pink;
                }
            }
        }
    }
</style>