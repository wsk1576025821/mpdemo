<template>
  <div class="container">
    <van-tabs v-model="active" @change="onChange">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <van-button type="primary">测试按钮</van-button>
    <!-- <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs> -->
    <!-- <i-button type="primary" @click="chooseFile">选择文件</i-button>
    <i-button type="primary" @click="handleClick">开始监听</i-button>
    <i-button type="primary" @click="handleClickStop">停止监听</i-button>
    <i-button type="primary" @click="handleClick1">点击1</i-button>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="image" v-if="item.type == 'image'">
          <img :src="item.path" />
        </div>
        <div class="video" v-if="item.type == 'video'">
          <video :src="item.path" />
        </div>
        <div class="file" v-if="item.type == 'file'">
          <div @click="handlePreviewFile(item)">{{item.name}}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      serviceList: [],
      resolveFailList: [],
      active: 1,
    }
  },

  components: {
  },

  methods: {
    onChange(event) {
      console.log(event);
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
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
          vm.list = tempFilePaths;
          console.log(vm.list);
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
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.container{
  background: #ccc;
}
</style>
