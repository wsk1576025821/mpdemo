<template>
    <view class="list-container">
        <view class="list" v-if="list.length">
            <view class="item" v-for="(item, index) in list" :key="index" @tap="handleTap(item)">
                <view class="img-box">
                    <image
                        v-if="item.type == 'image'"
                        class="img"
                        :src="item.path"
                    />
                    <text 
                        v-else
                        :class="['icon iconfont',getImgByTypeFun(item.name)]"
                    >
                    </text>
                </view>
                <!-- <view class="icon iconfont icon-yinyue"></view> -->
                <view class="desc">
                    <view class="top">{{item.name}}</view>
                    <view class="bottom">
                        <view class="time">{{item.time | formatTime}}</view>
                        <view class="size">{{item.size | formatSize}}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- empty -->
        <view class="empty-list" v-else>
            <view class="empty-img">
                <image class="img" :src="emptyImg" />
                <view class="empty-txt">
                    点击
                    <text class="icon iconfont icon-zengjia-copy"></text>
                    选择群聊文件进行备份
                </view>
            </view>
        </view>
        <!-- noMore -->
        <view class="no-more" v-if="noMore">
            <text class="txt">没有更多了</text>
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import { getImgByType } from '../../../../utils/utils';
    export default {
        props:{
            list: {
                type: Array,
                default: () => []
            },
            noMore: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                emptyImg: require('../../../../resource/backups.png')
            }
        },
        mounted(){
        },
        methods: {
            getImgByTypeFun(val){
                return getImgByType(val);
            },
            handleTap(item){
                console.log('111');
                console.log(item);
            },
            handlePreviewFile(item){
                console.log(item.path);
                wx.openDocument({
                    filePath: item.path,
                    success: function (res) {
                        console.log('打开文档成功')
                    },
                    fail: function(err){
                        console.log(err);
                    }
                });
            },
            onChange(event) {
      console.log(event);
      wx.showToast({
        title: `切换到标签 ${event.mp.detail.name}`,
        icon: 'none',
      });
    },
    handleClick1(){
        let that = this;
        wx.startLocalServiceDiscovery({

        serviceType: '_http._tcp.',

        success: function(res){

          // let items = that.data.items;

          // items.push('success');

          // items.push(res.errMsg)

          // that.setData({items: items})
          console.error('success', res);
        },

        fail:function(res){

          // let items = that.data.items;

          // items.push('fail');

          // items.push(res.errMsg)

          // that.setData({items: items})
          console.error('fail', res);
        },

        complete:function(res){

          // let items = that.data.items;

          // items.push('complete');

          // items.push(res.errMsg)

          // that.setData({items: items})
          console.error('complete', res);
        },

      });
    },
    chooseFile(){
      let vm = this;
      wx.chooseMessageFile({
        count: 10,
        type: 'all',
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles
          console.log(tempFilePaths);
          // vm.list = tempFilePaths;
          // console.log(vm.list);
        },
        fail(err){
          console.log(err);
        }
      })
    },
    handlePreviewFile(item){
      // wx.downloadFile({
      //   // 示例 url，并非真实存在
      //   url: item.path,
      //   success: function (res) {
          // const filePath = res.tempFilePath

          const filePath = item.path;
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
      //   }
      // })
    },
    /**
     * 开始搜索
     */
    startDiscovery:function(){
      let that = this
      that.serviceList = []
      that.resolveFailList = []
      wx.startLocalServiceDiscovery({
        serviceType:'_http._tcp.',
        success:function(res){
          console.log('start success')
          that.onLocalService();
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
          that.offLocalService()
          
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
        that.serviceList.push(obj)
        console.warn(that.serviceList);
        wx.request({
          url: '192.168.32.1:5353'
          // 省略其他参数
        })
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
        handleClick(){
        this.startDiscovery();
        },
        handleClickStop(){
        this.stopDiscovery();
        }
        }
    }
</script>