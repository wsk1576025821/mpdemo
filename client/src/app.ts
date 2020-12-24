import Vue from 'vue'
import Taro, { Config } from '@tarojs/taro'

import './app.scss'

const App = new Vue({
  mounted () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'wskceshi-2gxpe56l34cb8403',
        traceUser: true
      })
    }
  },
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})

export default App
