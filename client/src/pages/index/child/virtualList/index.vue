<! –– History.vue 页面组件 ––> 
<template>
  <view class="list-container">
    <virtual-list
      :height="listHeight"
      :item-data="list"
      :item-count="list.length"
      :item-size="75"
      :item="ListItem"
      width="100%"
      v-if="list.length"
      :overscanCount="20"
    />
    <view class="empty" v-show="list.length === 0">- 暂无内容 -</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro';
import ListItem from './child/listItem';

export default {
  name: 'pageHistory',
  props: {
      list: {
          type: Array,
          default: () => []
      }
  },
  data() {
    return {
      pageState: 1,
      ListItem
    }
  },
  computed: {
    listHeight() {
      return Taro.getSystemInfoSync().windowHeight - 50
    }
  },
  mounted(){
      console.log(this.list);
  }
}
</script>
<style lang="scss" scoped>
    .list-container{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        margin: 24px 32px;
        // background: yellow;
    }
</style>