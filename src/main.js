import Vue from 'vue'
import App from './App'
import api from '@/api/index'
Vue.prototype.$api = api

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.getLoadding = function () {
  wx.showLoading({
    title: '加载中'
  })
}
Vue.prototype.closeLoadding = function () {
  wx.hideLoading()
}

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/box/authorization'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#00bcd4',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff',
      backgroundColor: '#f7f7f7'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#00bcd4',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/box/home',
          text: '主页',
          iconPath: 'static/icon/tabbar1_0.png',
          selectedIconPath: 'static/icon/tabbar1_1.png'
        },
        {
          pagePath: 'pages/box/mycare',
          text: '关注',
          iconPath: 'static/icon/tabbar2_0.png',
          selectedIconPath: 'static/icon/tabbar2_1.png'
        },
        {
          pagePath: 'pages/box/my',
          text: '我的',
          iconPath: 'static/icon/tabbar3_0.png',
          selectedIconPath: 'static/icon/tabbar3_1.png'
        }
      ]
    }
  }
}
