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
import * as Types from '../../store/mutation-type';
import {mapState, mapGetters} from 'vuex';

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
  computed:{
      ...mapState([
          'curCloud',
          'cloudList'
      ]),
      ...mapGetters([
          'curCloudBox'
      ])
  },
  data(){
    return{
      noMore: false,
      list: [],
      serviceList: [],
      resolveFailList: []
    }
  },
  mounted(){
    this.onLocalService()
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
  /**
   * 生命周期函数--监听页面显示
  */
  onShow(){
    
  },
  methods: {
    // 初始化
    init(){
      this.list = [];
      this.serviceList = [];
      this.resolveFailList = [];
      // 清空store的云盒
      // 设置云盒
      this.$store.dispatch(Types.SET_CLOUD_LIST, this.serviceList);
      console.error('cloudList,cloudList, cloudList', this.cloudList);
      // 默认设置第一个云盒为当前云盒
      this.$store.dispatch(Types.SET_CUR_CLOUD, 0);
      this.startDiscovery();
    },
    chooseFile () {
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
      this.chooseFile();
    },
    buildData(offset = 0){
      let arr = [];
      return arr;
    },
    /**
     * 开始搜索
     */
    startDiscovery:function(){
      let that = this
      that.serviceList = []
      that.resolveFailList = []
      wx.startLocalServiceDiscovery({
        serviceType:'_jcbox_test._tcp.',
        success:function(res){
          console.log('start success')
          // that.onLocalService();
        },
        fail:function(err){
          console.log('start fail')
          console.log(err)
        },
        complete:function(){
          console.log('complete')
        }
      })
    },
    /**
     * stopDiscovery
     */
    stopDiscovery:function(){
      let that = this
      wx.stopLocalServiceDiscovery({
        success: function () {
          that.showTips('停止搜索成功','success')
          that.serviceList = []
          that.resolveFailList = []
          that.offLocalService();
        },
        fail: function () {
          that.showTips('停止搜索失败，请重试！')
        },
        complete: function () {
          console.log('stopDiscovery complete')
        }
      })
    },
    /**
     * 监听方法合集
     */
    onLocalService:function(){
      console.error('111');
      let that = this
      // 监听服务发现事件
      wx.onLocalServiceFound(function (obj) {
        console.log('监听服务发现事件')
        console.log(obj)
        that.serviceList.push(obj);
        // 设置云盒
        that.$store.dispatch(Types.SET_CLOUD_LIST, that.serviceList);
        // 默认设置第一个云盒为当前云盒
        that.$store.dispatch(Types.SET_CUR_CLOUD, 0);
        console.error(that.curCloudBox);
        console.warn(that.serviceList);

        // 关闭搜索
        that.stopDiscovery();
        wx.request({
          url: obj.ip + ':' + obj.port
          // 省略其他参数
        });
      })
  
      // 监听服务解析失败事件
      wx.onLocalServiceResolveFail(function (obj){
        console.log('监听服务解析失败事件')
        that.resolveFailList.push(obj)
      })
  
      // 监听服务离开
      wx.onLocalServiceLost(function (obj){
        console.log('监听服务离开')
        that.showTips('有服务离开啦');
        console.log(obj)
      })
  
      // 监听搜索停止
      wx.onLocalServiceDiscoveryStop(function (obj){
        console.log('监听到搜索停止事件')
      })
  
    },
    /**
     * 提示方法
     */
    showTips:function(title='出错啦',icon='none'){
        wx.showToast({
          title: title,
          icon: icon,
          duration:2000
        })
    },
    /**
     * offLocalService
     */
    offLocalService: function () {
      console.log('是否执行此部分数据')
      // 取消监听服务发现事件
      wx.offLocalServiceFound(function () {
        console.log('取消监听服务发现事件 成功')
      })
      // 取消监听服务解析失败事件
      wx.offLocalServiceResolveFail(function () {
        console.log('取消监听 mDNS 服务解析失败的事件 成功')
      })
      // 取消监听服务离开
      wx.offLocalServiceLost(function () {
        console.log('取消监听服务离开事件 成功')
      })
      // 取消监听搜索停止
      wx.offLocalServiceDiscoveryStop(function () {
        console.log('取消监听 mDNS 服务停止搜索的事件 成功')
      })
    },
  }
}
</script>
