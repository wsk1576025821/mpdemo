import Vue from 'vue'
import Taro, { Config } from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'
import store from './store';
import * as filters from './filters'
import './app.scss'

Vue.use(VirtualList)

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

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
  store,
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})

export default App
