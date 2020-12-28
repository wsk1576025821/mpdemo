<template>
    <view class="cloud-box">
        <view class="top">
            <view class="left">{{detail.name}}</view>
            <view class="right">{{detail.size}}/{{detail.totalSize}}</view>
        </view>
        <view class="bottom">
            <AtProgress
                :percent="detail.percent"
                :strokeWidth="7"
                color='rgba(255, 255, 255, 0.7)'
                :isHidePercent="true"
            />
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import { AtProgress } from 'taro-ui-vue';
    export default {
        components: {
            AtProgress
        },
        data(){
            return{
                detail: {
                    name: '客厅的盒子（管理员）',
                    size: '20.2G',
                    totalSize: '981.58G',
                    percent: 25
                }
            }
        }
    }
</script>