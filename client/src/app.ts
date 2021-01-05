import Vue from 'vue'
import Taro, { Config, getCurrentInstance } from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'
import { dispatchLogin } from "./actions/common";
import { onCheckForUpdate } from './utils/common';
import store from './store';
import * as filters from './filters'
import * as utils from './utils';
import './app.scss'

Vue.use(VirtualList)

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//添加工具方法
Taro.$utils = utils;

const App = new Vue({
  created(){
    // 检查更新
    onCheckForUpdate();
    let obj = getCurrentInstance();
    Taro.setStorageSync('scene', JSON.stringify(obj.router && obj.router.params && obj.router.params.scene));
    const {token} = store.state.userInfo;
    Taro.showLoading({
      title: "用户状态获取中"
    });
    Taro.checkSession({
      success: () => {
        console.log('检查session成功');
        if (!token) {
          // console.log(dispatchLogin(this, storeData.dispatch));
          dispatchLogin(this, store.dispatch).finally(()=> {
            Taro.hideLoading();
          })
        }
      },
      fail: () => {
        console.log('检查session失败');
        dispatchLogin(this, store.dispatch).finally(()=> {
          Taro.hideLoading();
        })
      }
    });
  },
  mounted () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'wskceshi-2gxpe56l34cb8403',
        traceUser: true
      });
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
