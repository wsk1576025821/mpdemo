<template>
    <view class="cloud-box">
        <view class="top">
            <view class="left">{{curCloudBox.title || '- -'}}</view>
            <view class="right">{{curCloudBox.size || '- -'}}/{{curCloudBox.totalSize || '- -'}}</view>
        </view>
        <view class="bottom">
            <AtProgress
                :percent="curCloudBox.percent"
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
            ...mapGetters([
                'curCloudBox'
            ])
        },
        data(){
            return{
            }
        }
    }
</script>