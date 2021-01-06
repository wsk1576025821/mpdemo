<template>
    <view class="collect-detail">
        <view class="header">
            {{detail.code}}
        </view>
        <view class="content">
            <view class="title">{{detail.title}}</view>
            <view class="desc">{{detail.desc}}</view>
            <view class="time">
                <view class="lock-box">
                    <image
                        class="img"
                        :src="lockImg"
                    />
                </view>
                <view>将于{{detail.time | formatTimeMinute}}失效</view>
            </view>
        </view>
        <view class="list">
            <view
                class="item"
                v-for="(item, index) in list"
                :key="index"
            >
                <view class="top">
                    <text>{{index}}.{{item.title}}</text>
                </view>
                <view class="bottom">
                    <image
                        class="img"
                        :src="item.src"
                    />
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
                    code: 'CsdhUk',
                    title: '人间最美四月天，茶香芬芳正当时！',
                    desc: '-来自张三(170****0000)家丞',
                    time: '1608994578861'
                },
                lockImg: require('../../resource/lock.png'),
                list: [
                    {
                        title: '下载App',
                        src: require('../../resource/download.png')
                    },
                    {
                        title: '登录账号',
                        src: require('../../resource/download.png')
                    },
                    {
                        title: '重新打开链接',
                        src: require('../../resource/download.png')
                    },
                    {
                        title: '参与收藏',
                        src: require('../../resource/download.png')
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