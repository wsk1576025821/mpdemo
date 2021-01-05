<template>
    <view class="cloud-box">
        <view class="top">
            <view class="left">{{cloudList[curCloud].title}}</view>
            <view class="right">{{cloudList[curCloud].size}}/{{cloudList[curCloud].totalSize}}</view>
        </view>
        <view class="bottom">
            <AtProgress
                :percent="cloudList[curCloud].percent"
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
    import {mapState, mapGetters} from 'vuex';
    export default {
        components: {
            AtProgress
        },
        computed:{
            ...mapState([
                'curCloud',
                'cloudList'
            ]),
        },
        data(){
            return{
            }
        }
    }
</script>