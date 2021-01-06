<template>
    <view class="share-detail">
        <view class="header">
            <view class="title">{{detail.title}}</view>
            <view class="desc">{{detail.desc}}</view>
            <view class="time">{{detail.time}}</view>
        </view>
        <view class="list">
            <view
                v-for="(item, index) in list"
                :key="index"
                class="item"
            >
                <view class="left">
                    <view class="img-box">
                        <image
                            class="img"
                            :src="item.thumb"
                        />
                    </view>
                </view>
                <view class="right">
                    <view class="top">{{item.title}}</view>
                    <view class="bottom">
                        <view class="">
                            共
                            <text class="num">{{item.num}}</text>
                            个文件
                            <text class="size">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="footer">
            <AtButton
                class="btn"
                open-type="launchApp" 
                app-parameter="wechat" 
                :onError="launchAppError"
            >
                打开APP
            </AtButton>
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import { AtButton } from 'taro-ui-vue';
    export default {
        props: {
            // detail: {
            //     type: Object,
            //     default: () => {}
            // }
        },
        components: {
            AtButton
        },
        data(){
            return{
                detail: {
                    title: '人间最美四月天，茶香芬芳正当时！',
                    desc: '-来自张三(170****0000)家丞',
                    time: '将于2020年7月2日 19:55失效'
                },
                list: [
                    {
                        id: 1,
                        title: '标题文字1',
                        thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        progress: 25,
                        size: 111111,
                        speed: 20,
                        type: 'image',
                        num: 3,
                        size: 3000000,
                    }
                ]
            }
        },
        methods:{
            // 打开app
            launchAppError (e) {
                console.log(e.detail.errMsg)
            }
        }
    }
</script>