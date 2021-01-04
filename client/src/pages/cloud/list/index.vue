<template>
    <view class="cloud-list-container">
        <view class="list" v-if="list.length">
            <view
                class="item"
                v-for="(item, index) in list"
                :key="index"
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
                            <text class="desc">{{item.desc}}</text>
                            <text class="ip">{{item.ip}}</text>
                        </view>
                    </view>
                </view>
                <view class="right" v-if="item.status">
                    {{item.status}}
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
    export default {
        props:{
            noMore: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                emptyImg: require('../../../resource/backups.png'),
                list: [
                    {
                        title: '客厅的盒子0(管理员)',
                        ip: 'FXJC_AP3(192/168.50.',
                        desc: 'HCB****1001',
                        state: '1',
                        status: '',
                        src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
                    },
                    {
                        title: '客厅的盒子1(管理员)',
                        ip: 'FXJC_AP3(192/168.50.',
                        desc: 'HCB****1001',
                        state: '',
                        status: '已连接',
                        src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                    },
                    {
                        title: '客厅的盒子2(管理员)',
                        ip: 'FXJC_AP3(192/168.50.',
                        desc: 'HCB****1001',
                        src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                        state: '0',
                        status: ''
                    },
                    {
                        title: '客厅的盒子3(管理员)',
                        ip: 'FXJC_AP3(192/168.50.',
                        desc: 'HCB****1001',
                        state: '',
                        src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                        status: ''
                    }
                ]
            }
        }
    }
</script>