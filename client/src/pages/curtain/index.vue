<template>
  <view>
    <AtCurtain
      :isOpened="isOpened"
      :onClose="onClose"
      closeBtnPosition="top-right"
    >
      <image
        style='width:100%;height:400px'
        :src="curtainPng"
      />
    </AtCurtain>
  </view>
</template>
<script>
import curtainPng from '../../resource/curtain.png';
import { AtCurtain } from 'taro-ui-vue';
export default {
  name: 'AtCurtainDemo',
  components: {
    AtCurtain,
  },
  data() {
    return {
      isOpened: true,
      curtainPng,
    }
  },
  methods: {
    handleChange () {
      this.isOpened = true
    },
    onClose () {
      this.isOpened = false
    }
  },
}
</script>