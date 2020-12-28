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
    export default {
        data(){
            return{
                userInfo: {
                    avatarImg: '',
                    username: '昵称',
                    phone: '176****5993',
                    token: '111'
                }
            }
        },
        mounted(){

        },
        methods:{
            // 解绑
            handleUnbund(){
                console.log('解绑');
            },
            // 绑定
            handleBund(){
                console.log('绑定');
            }
        }
    }
</script>