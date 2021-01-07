<template>
  <view class='index-container'>
    <Header @click="handleClickHeader" />
    <UploadList />
    <List :list="list" :noMore="noMore" />
    <Fab @click="handleClickFab" />
  </view>
</template>

<script>
import './index.scss';
import Login from '../../components/login/index.weapp';
import { navigateTo } from '../../utils/common';
import { AtTag, AtIcon, AtButton, AtList, AtListItem } from 'taro-ui-vue';
import Taro from '@tarojs/taro';
import Header from './child/header';
import List from './child/list';
import Fab from './child/fab';
import UploadList from './child/uploadList';

export default {
  name: 'Index',
  components: {
    Login,
    AtTag,
    AtIcon,
    AtButton,
    AtList,
    AtListItem,
    Header,
    List,
    Fab,
    UploadList
  },
  data(){
    return{
      noMore: false,
      list: []
    }
  },
  mounted(){
    Taro.showLoading({
      title: '加载中',
      mask: true 
    });
    setTimeout(() => {
      this.init();
      Taro.hideLoading();
    }, 500)
  },
  // 上拉加载
  onReachBottom(){
    console.log('onReachBottom');
    if (this.noMore){
      return false;
    }
    Taro.showLoading({
      title: "加载中...",
      mask: true
    });
    setTimeout(() => {
      // this.list = this.list.concat(this.buildData());
      // if (this.list.length > 20){
      //   this.noMore = true;
      // }
      Taro.hideLoading();
    }, 1000)
  },
  // 下拉刷新
  onPullDownRefresh(){
    console.log('onPullDownRefresh');
    setTimeout(() => {
      this.init();
      Taro.stopPullDownRefresh();
    }, 1000);
  },
  methods: {
    // 初始化
    init(){
      this.list = [];
    },
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
              vm.list = vm.list.concat(tempFilePaths);
              console.log(vm.list);
          },
          fail(err){
              console.log(err);
          },
          complete(res){
              console.log(res);
          }
      })
    },
    // 点击头部header
    handleClickHeader(){
      navigateTo('/pages/cloud/list/index');
    },
    // 点击添加按钮
    handleClickFab(){
      // console.log('add');
      this.handleClick();
    },
    buildData(offset = 0){
      let arr = [];
      return arr;
    }
  }
}
</script>
