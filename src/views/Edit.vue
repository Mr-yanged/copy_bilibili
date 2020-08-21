<template>
    <div>
        <div class="head">
            <user-info-top :image="image"></user-info-top>
        </div>
        <div class="uploadAvatar">
            <van-uploader :after-read="afterRead" />
            <edit-options left-label="头像" v-slot:editRight>
                <img :src="edit.user_img" class="edit_avatar" v-if="edit.user_img" />
                <img src="@/assets/default_img.jpg" class="edit_avatar" v-else />
            </edit-options>
        </div>
        <edit-options left-label="昵称" v-slot:editRight @edit-options="e => editOptions(e, edit.name)">{{ edit.name }}</edit-options>
        <edit-options left-label="UID" v-slot:editRight>{{ edit.id }}</edit-options>
        <!-- 选择性别动作面板 -->
        <van-action-sheet v-model="genderShow" @select="genderSelect" :actions="actions" />
        <edit-options left-label="性别" v-slot:editRight @edit-options="genderShow = true">{{ edit.gender ? '女' : '男' }}</edit-options>

        <edit-options left-label="个性签名" v-slot:editRight @edit-options="e => editOptions(e, edit.user_desc)">{{ edit.user_desc }}</edit-options>
        <div class="footer">
            <edit-footer edit-footer-text="退出登录"></edit-footer>
            <edit-footer edit-footer-text="返回空间" @click-footer="$router.go(-1)"></edit-footer>
        </div>

        <!-- 修改昵称、个性签名弹出框 -->
        <van-dialog v-model="editDialoggenderShow" :title="dialogTitle" @confirm="confirmClick" showCancelButton>
            <van-field v-model="content" placeholder="请输入新的昵称" />
        </van-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        log
    } from 'util'
    import {
        Toast
    } from 'vant'

    // 引入用户信息头部公共组件
    const UserInfoTop = () =>
        import(
            /* webpackChunkName: "userInfo" */
            '@/components/common/UserInfoTop.vue'
        )
    // 引入编辑用户信息body部分
    const EditOptions = () =>
        import(
            /* webpackChunkName: "userInfo" */
            '@/components/common/EditOptions.vue'
        )
    // 引入编辑用户信息footer部分
    const EditFooter = () =>
        import(
            /* webpackChunkName: "userInfo" */
            '@/components/common/EditFooter.vue'
        )

    export default {
        data() {
            return {
                // 用户数据
                edit: {},
                // 控制修改昵称弹出框的显示隐藏
                editDialoggenderShow: false,
                content: '',
                dialogTitle: '',
                tempOption: '',
                genderShow: false,
                image: '',
                actions: [{
                        name: '男',
                        value: 0
                    },
                    {
                        name: '女',
                        value: 1
                    }
                ]
            }
        },
        components: {
            UserInfoTop,
            EditOptions,
            EditFooter
        },
        methods: {
            async getEditData() {
                const {
                    data
                } = await this.$http.get(
                    '/user/' + localStorage.getItem('id')
                )
                this.edit = data[0]
            },
            // 头像上传
            async afterRead(file) {
                const formData = new FormData()
                formData.append('file', file.file)
                const {
                    data
                } = await this.$http.post('/upload', formData)
                this.edit.user_img = data.url
                this.uploadUserInfo()
            },
            // 更新后台数据
            async uploadUserInfo() {
                const {
                    data
                } = await this.$http.post(
                    '/update/' + localStorage.getItem('id'),
                    this.edit
                )
                if (data.code !== 200) {
                    this.$msg.fail('更新失败，请重试')
                    return
                }
                this.$msg.success('更新成功')
            },
            editOptions(e, arg) {
                this.dialogTitle = e
                this.editDialoggenderShow = true
                this.tempOption = arg
            },
            // 确认修改昵称
            confirmClick() {
                switch (this.tempOption) {
                    case this.edit.name:
                        this.edit.name = this.content
                        this.uploadUserInfo()
                        this.content = ''
                        break
                    case this.edit.user_desc:
                        this.edit.user_desc = this.content
                        this.uploadUserInfo()
                        this.content = ''
                        break
                    default:
                        break
                }
            },
            // 修改性别
            genderSelect(item) {
                console.log(item)

                this.genderShow = false
                Toast(item.name)
                this.edit.gender = item.value
                this.uploadUserInfo()
            }
        },
        mounted() {
            this.getEditData()
            this.image = this.$route.query.img
        }
    }
</script>
<style lang="less" scoped>
    .head {
        background-color: #f4f4f4;
        padding-bottom: 15px;

        .userInfoTop {
            background-color: white;
        }
    }

    .edit_avatar {
        width: 0.733333rem;
        border-radius: 50%;
    }

    .editOptions {
        /deep/ a {
            font-size: 0.293333rem;
            color: #888;
        }
    }

    .footer {
        background-color: #f4f4f4;
        padding-top: 20px;
    }

    // 文件上传
    .uploadAvatar {
        position: relative;
        overflow: hidden;

        .van-uploader {
            position: absolute;
            top: 0;
            left: 0;

            /deep/ .van-uploader__upload {
                width: 100rem;
                height: 100rem;
                opacity: 0;
            }
        }
    }
</style>