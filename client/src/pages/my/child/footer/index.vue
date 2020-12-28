<template>
    <view class="my-footer">
        <AtButton
            class="btn"
            :onClick="handleClick"
        >
            切换云盒
        </AtButton>
    </view>
</template>

<script>
    import './index.scss';
    import { AtButton } from 'taro-ui-vue'
    export default {
        components:{
            AtButton
        },
        data(){
            return{

            }
        },
        methods:{
            handleClick(){
                console.log('切换云盒');
            }
        }
    }
</script>