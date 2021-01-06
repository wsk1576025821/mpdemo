<template>
    <view class="upload-list-container" v-if="uploadList.length">
        <AtAccordion
            :onClick="onClick"
            :title='title'
            :open="open"
        >
            <AtList class="list">
                <view
                    class="item"
                    v-for="(item, index) in uploadList"
                    :key="index"
                >
                    <view class="left">
                        <view class="img-box">
                            <image
                                v-if="item.type == 'image'"
                                class="img"
                                :src="item.thumb"
                            />
                            <text 
                                v-else
                                :class="['icon iconfont',getImgByTypeFun(item.name)]"
                            >
                            </text>
                        </view>
                        <view class="content">
                            <view class="title">{{item.title}}</view>
                            <view class="progress">
                                <AtProgress
                                    :percent="item.progress"
                                    :strokeWidth="2"
                                    color="#FF6836"
                                    :isHidePercent="true"
                                />
                            </view>
                            <view class="info">
                                <view class="desc">
                                    <view class="time" v-if="item.time">{{item.time | formatTime}}</view>
                                    <view class="size" v-if="item.size">{{item.size | formatSize}}</view>
                                </view>
                                <view class="speed" v-if="item.speed">{{item.speed | formatSize}}/s</view>
                            </view>
                        </view>
                    </view>
                    <view class="right" @tap="handleClose(item)">
                        <view class="close-box">
                            <view class="icon iconfont icon-guanbi"></view>
                        </view>
                    </view>
                </view>
            </AtList>
        </AtAccordion>
    </view>
</template>

<script>
    import './index.scss';
    import { AtTag, AtIcon, AtButton, AtList, AtListItem, AtAccordion, AtProgress } from 'taro-ui-vue';
    import {mapState, mapGetters} from 'vuex';
    import { getImgByType } from '../../../../utils/utils';
    import * as Types from '../../../../store/mutation-type';
    export default {
        components: {
            AtTag,
            AtIcon,
            AtButton,
            AtList,
            AtListItem,
            AtAccordion,
            AtProgress
        },
        computed:{
            ...mapState([
                'curCloud',
                'cloudList',
                'uploadList',
                'curUploadIdx'
            ]),
            ...mapGetters([
                'curCloudBox',
            ]),
            title: function() {
                return `正在上传${this.curUploadIdx}/${this.uploadList.length}`
            }
        },
        data(){
            return{
                open: false
            }
        },
        methods:{
            onClick(val, event) {
                console.log(val, event);
                this.open = val
            },
            getImgByTypeFun(val){
                return getImgByType(val);
            },
            // 点击关闭
            handleClose(item){
                this.$store.dispatch(Types.DEL_FILE_BY_ID, item);
            },
            handleClick(){
                console.log('111');
            }
        }
    }
</script>
</style>