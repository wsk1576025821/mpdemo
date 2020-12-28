<template>
    <view class="fab-container">
        <AtFab :onClick="onButtonClick">
            <image class="img" :src="addImg" />
        </AtFab>
    </view>
</template>

<script>
    import './index.scss';
    import { AtFab } from 'taro-ui-vue'
    export default {
        components: {
            AtFab
        },
        data(){
            return{
                addImg: require('../../../../resource/add.png')
            }
        },
        methods: {
            onButtonClick(){
                this.$emit('click');
            }
        }
    }
</script>