<template>
    <view class="list-container">
        <view class="list" v-if="list.length">
            <view class="item" v-for="(item, index) in list" :key="index" @tap="handlePreviewFile(item)">
                <view class="img-box">
                    <image
                        v-if="item.type == 'image'"
                        class="img"
                        :src="item.path"
                    />
                    <text 
                        v-else
                        :class="['icon iconfont',getImgByTypeFun(item.name)]"
                    >
                    </text>
                </view>
                <!-- <view class="icon iconfont icon-yinyue"></view> -->
                <view class="desc">
                    <view class="top">{{item.name}}</view>
                    <view class="bottom">
                        <view class="time">{{item.time | formatTime}}</view>
                        <view class="size">{{item.size | formatSize}}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- empty -->
        <view class="empty-list" v-else>
            <view class="empty-img">
                <image class="img" :src="emptyImg" />
                <view class="empty-txt">
                    点击
                    <text class="icon iconfont icon-zengjia-copy"></text>
                    选择群聊文件进行备份
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
    import { getImgByType } from '../../../../utils/utils';
    export default {
        props:{
            list: {
                type: Array,
                default: () => []
            },
            noMore: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                emptyImg: require('../../../../resource/backups.png')
            }
        },
        mounted(){
        },
        methods: {
            getImgByTypeFun(val){
                return getImgByType(val);
            },
            handlePreviewFile(item){
                console.log(item);
                wx.downloadFile({
                //   // 示例 url，并非真实存在
                    url: item.path,
                    success: function (res) {
                        console.log('打开文档成功');
                        // const filePath = res.tempFilePath
                        const filePath = item.path;
                        wx.openDocument({
                            filePath: filePath,
                            success: function (res) {
                            console.log('打开文档成功')
                            }
                        })
                    },
                    fail: function(err){
                        console.log(err);
                    }
                })
            },
        }
    }
</script>