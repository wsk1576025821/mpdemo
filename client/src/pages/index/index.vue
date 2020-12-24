<template>
  <view className='index'>
    <Login />
    <AtTag>标签</AtTag>
    <AtIcon value="clock" color="#F00"></AtIcon>
    <AtButton type='primary' :onClick="handleClick">点击</AtButton>
    <AtList>
      <AtListItem v-for="(item, index) in list" :key="index" :title='item.name' :thumb="item.path" :note="item.size + ''" :extraText="item.time + '' " />
    </AtList>
  </view>
</template>

<script>
import './index.scss';
import Login from '../../components/login/index.weapp';
import { AtTag, AtIcon, AtButton, AtList, AtListItem } from 'taro-ui-vue';

export default {
  name: 'Index',
  components: {
    Login,
    AtTag,
    AtIcon,
    AtButton,
    AtList,
    AtListItem
  },
  data(){
    return{
      list: []
    }
  },
  methods: {
    handleClick () {
      let vm = this;
      wx.chooseMessageFile({
          count: 10,
          type: 'all',
          success (res) {
              console.log('success');
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFiles;
              console.log(tempFilePaths);
              vm.list = tempFilePaths;
          },
          fail(err){
              console.log(err);
          },
          complete(res){
              console.log(res);
          }
      })
    }
  }
}
</script>
