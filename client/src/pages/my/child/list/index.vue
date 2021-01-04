<template>
    <view class="my-list">
        <AtList>
            <AtListItem
                class="item"
                title='常见问题'
                arrow='right'
                :iconInfo="{
                    size: 25,
                    color: '#000',
                    value: 'help'
                }"
                :onClick="handleClick.bind(this, '/pages/comProblem/index')"
            />
        </AtList>
        <view class="item">
            <AtButton
                class="item-btn-box"
                open-type="launchApp" 
                app-parameter="wechat" 
                :onError="launchAppError"
            >
                <view class="item-btn">
                    <text class="left">
                        <text class="icon iconfont icon-shouji2"></text>
                        <text class="txt">打开app</text>
                    </text>
                    <text class="right">
                        <text class="icon iconfont icon-youjiantou1"></text>
                    </text>
                </view>
        </AtButton>
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import { AtList, AtListItem, AtButton } from 'taro-ui-vue';
    import { navigateTo } from '../../../../utils/common';
    export default {
        components: {
            AtList,
            AtListItem,
            AtButton
        },
        data(){
            return{
                
            }
        },
        mounted(){

        },
        methods:{
            // 跳转到常见问题页面
            handleClick(val){
                navigateTo(val)
            },
            handleOpenApp(val){
                console.log('打开app')
            },
            // 打开app
            launchAppError (e) {
                console.log(e.detail.errMsg)
            }
        }
    }
</script>