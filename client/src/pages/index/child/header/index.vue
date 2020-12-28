<template>
    <view class="header" @tap="handleClick">
      <view class="left">
        <view class="img-box">
          <image class="img" :src="logoImg" alt="" />
        </view>
        <view class="box-info">
          <view class="top">
            <text class="title">客厅的盒子(管理员)</text>
            <view class="state"></view>
          </view>
          <view class="bottom">
            <text class="left-desc">HCB****1001</text>
            <text class="right-desc">FXJC_AP3(192/168.50.</text>
          </view>
        </view>
      </view>
      <view class="right">
        <view class="right-info-img">
          <image class="img" :src="infoImg" alt="" />
        </view>
      </view>
    </view>
</template>

<script>
    import './index.scss';
    export default {
        data(){
            return{
                logoImg: require('../../../../resource/logo.png'),
                infoImg: require('../../../../resource/info.png')
            }
        },
        methods: {
            handleClick(){
                this.$emit('click');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>