<template>
    <view class="cloud-list-container">
        <view class="list" v-if="cloudList.length">
            <view
                class="item"
                v-for="(item, index) in cloudList"
                :key="index"
                @tap="handleClickItem(index)"
            >
                <view class="left">
                    <view class="img-box">
                        <image
                            class="img"
                            :src="item.src"
                        />
                    </view>
                    <view class="content">
                        <view class="top">
                            <text class="title">{{item.title}}</text>
                            <text v-if="item.state != ''" class="state" :class="{'success': item.state == 1, 'error': item.state == 0}"></text>
                        </view>
                        <view class="bottom">
                            <text class="desc text-deal">{{item.serviceName}}</text>
                            <text class="ip text-deal">{{changeDesc(item)}}</text>
                        </view>
                    </view>
                </view>
                <view class="right" v-if="index == curCloud">
                    已连接
                </view>
            </view>
        </view>
        <!-- empty -->
        <view class="empty-list" v-else>
            <view class="empty-img">
                <image class="img" :src="emptyImg" />
                <view class="empty-txt">
                    暂无云盒
                </view>
            </view>
        </view>
        <!-- noMore -->
        <view class="no-more" v-if="noMore">
            <text class="txt">没有更多了</text>
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import Taro from "@tarojs/taro";
    import {mapState, mapGetters} from 'vuex';
    import * as Types from '../../../store/mutation-type';
    export default {
        props:{
            noMore: {
                type: Boolean,
                default: false
            }
        },
        computed:{
            ...mapState([
                'curCloud',
                'cloudList'
            ]),
        },
        data(){
            return{
                emptyImg: require('../../../resource/backups.png'),
            }
        },
        methods:{
            // 点击选择云盒
            handleClickItem(index){
                this.$store.dispatch(Types.SET_CUR_CLOUD, index);
                Taro.navigateBack();
            },
            // 改变输出内容
            changeDesc(item){
                return item.serviceType + '(' + item.ip + ')'  || '- -'
            }
        }
    }
</script>