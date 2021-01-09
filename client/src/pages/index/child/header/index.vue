<template>
    <view class="header" @tap="handleClick">
      <view class="left">
        <view class="img-box">
          <image class="img" :src="logoImg" alt="" />
        </view>
        <view class="box-info">
          <view class="top">
            <text class="title">{{curCloudBox.title  || '- -'}}</text>
            <view v-if="curCloudBox.state != ''" class="state" :class="{'success': curCloudBox.state == 1, 'error': curCloudBox.state == 0}"></view>
          </view>
          <view class="bottom">
            <text class="left-desc text-deal">{{curCloudBox.serviceName || '- -'}}</text>
            <text class="right-desc text-deal">{{desc}}</text>
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
    import {mapState, mapGetters} from 'vuex';
    export default {
        computed:{
            ...mapState([
                'curCloud',
                'cloudList'
            ]),
            ...mapGetters([
                'curCloudBox'
            ]),
            desc(){
              if (this.curCloudBox.serviceType){
                return this.curCloudBox.serviceType + '(' + this.curCloudBox.ip + ')';
              } else {
                return '- -'
              }
            }
        },
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