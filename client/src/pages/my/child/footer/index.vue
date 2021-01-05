<template>
    <view class="my-footer">
        <AtButton
            class="btn"
            :onClick="handleClick.bind(this, '/pages/cloud/list/index')"
        >
            切换云盒
        </AtButton>
    </view>
</template>

<script>
    import './index.scss';
    import { AtButton } from 'taro-ui-vue';
    import { navigateTo } from '../../../../utils/common';
    export default {
        components:{
            AtButton
        },
        data(){
            return{

            }
        },
        methods:{
            handleClick(val){
                navigateTo(val);
            }
        }
    }
</script>