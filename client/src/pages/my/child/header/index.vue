<template>
    <view class="header">
        <view class="left">
            <view class="avatar-img">
                <img v-if="userInfo.avatarImg" class="avatar" :src="userInfo.avatarImg" alt="头像">
                <view v-else class="img-box">
                    <view class="icon iconfont icon-touxiang"></view>
                </view>
            </view>
            <view class="avatar-desc">
                <view class="nick-name">{{userInfo.username || '昵称'}}</view>
                <view class="phone">{{userInfo.phone}}</view>
            </view>
        </view>
        <view class="right" v-if="userInfo.token" @tap="handleUnbund">解绑</view>
        <view class="right" v-else @tap="handleBund">绑定</view>
    </view>
</template>

<script>
    import './index.scss';
    import taro, { getCurrentInstance } from '@tarojs/taro';
    import {mapState, mapGetters} from 'vuex';
    import { dispatchLogout } from '../../../../actions/common';
    import { redirectTo, checkLogin } from '../../../../utils/common';
    export default {
        data(){
            return{
                
            }
        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        mounted(){

        },
        methods:{
            // 解绑
            handleUnbund(){
                console.log('解绑');
                const {token} = this.userInfo;
                Taro.showModal({
                    title: "提示",
                    content: "确认退出？",
                    success: async res => {
                        if (res.confirm) {
                        Taro.$utils.clickLog("user_page_layout_click", {
                            page: "小程序+我的页面",
                            module: "按钮点击",
                            label: "我的页面-退出登陆"
                        });
                        // 授权登录解绑
                        if (token) {
                            // 执行解绑逻辑
                            dispatchLogout(this, {
                                token: token,
                                wxApp: 'MP_WAK_BBS'
                            }).then(() => {
                                redirectTo({
                                    url: "/pages/page_home/index",
                                    isCloseAll: true
                                });
                                this.resetData();
                            });
                        }
                        }
                    }
                });
            },
             // 重置数据
            resetData() {
                console.error('重置数据');
            },
            // 去登录绑定
            handleBund(){
                console.log('绑定');
                let obj = getCurrentInstance();
                checkLogin(obj.router);
            }
        }
    }
</script>