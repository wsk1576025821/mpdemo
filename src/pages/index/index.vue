<template>
  <div class="container">
    <i-button type="primary" @click="chooseFile">选择文件</i-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },

  components: {
  },

  methods: {
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
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.container{
  .btn{
    width: 100px;
    height: 50px;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
