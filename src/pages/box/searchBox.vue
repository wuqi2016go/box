<template>
  <div class="page" v-if="state==2">
    <div class="bg_image">
      <img src="/static/icon/bg_hbox.png" style="width: 100%;height: 100%" />
      <div class="weui-media-box__desc" style="text-align: center;position: absolute;z-index: 9999;bottom: 50rpx;width: 100%">路由器：{{wifi.bssidStr}}</div>
      <div class="weui-media-box__desc" style="text-align: center;position: absolute;z-index: 9999;bottom: 16rpx;width: 100%">盒子MAC地址：{{user.box.bmacStr}}</div>
    </div>
    <div class="bangd" @click="setbox">我要绑定</div>
  </div>
  <div class="page" v-else-if="state==1">
    <div style="margin-top: 60rpx;width: 100%;text-align: center">
      <img src="/static/icon/page_null.png" style="width: 300rpx;height: 300rpx" />
    </div>
    <div class="weui-media-box__desc" style="text-align: center">未发现家小盒，请重新匹配</div>
    <div class="find_box" @click="searchBox"><i class="iconfont icon-add">&nbsp;&nbsp;发现家小盒</i></div>
    <div class="weui-media-box__desc" style="color: #ff9920;margin: 60rpx 0 40rpx 30rpx;">[匹配失败原因]</div>
    <div class="weui-media-box__desc" style="color: #cccccc;font-size: 22rpx;margin-left: 30rpx;">1.请确认设备是否连接到带有家小盒的无线网络</div>
    <div class="weui-media-box__desc" style="color: #cccccc;font-size: 22rpx;margin-left: 30rpx;">2.请确认家小盒的接口连接是否正常</div>
    <div class="weui-media-box__desc" style="color: #cccccc;font-size: 22rpx;margin-left: 30rpx;">3.请确认路由器是否有网络</div>
  </div>
  <div v-else></div>
</template>

<script>
  export default {
    data () {
      return {
        // 0 页面初始化 1 未发现家小盒 2 发现家小盒
        state:0,
        wifi:{},
        user:{}
      }
    },
    onLoad () {
      this.state=0
    },
    onShow () {
      this.user = wx.getStorageSync('user')
      this.searchBox()
    },
    methods: {
      searchBox(){
        wx.showLoading({
          title: '加载中',
        })
        let _this = this
        wx.startWifi({
          success: function (res) {
            wx.getConnectedWifi({
              complete: r=>{
                wx.hideLoading()
              },
              success: res => {
                res.wifi['bssidStr'] = res.wifi.BSSID.toUpperCase()
                _this.wifi = res.wifi
                _this.wxbind()
                // _this.state = 2
              },
              fail: err => {
                _this.state = 1
              }
            })
          }
        })
      },
      wxbind () {
        let bssid = this.wifi.BSSID
        bssid = bssid.replace(/:/g, '')
        this.$api.post('/box/wxbind', {'ssid': this.wifi.SSID, 'bssid': parseInt(bssid, 16)}, null, r => {
          if(r.data){
            this.user['box'] = r.data
            this.user['box'].bmacStr = this.$api.ToMac(this.user['box'].bmac)
            this.state = 2
          }else{
            this.state = 1
          }
        })
      },
      setbox () {
        let box = this.user.box
        wx.request({
          url: 'https://www.hobox.com.cn:8080/api/test/app/usrbox',
          data: {'bmac': box.bmac, 'rmac': box.rmac},
          method: 'POST',
          header: {
            'Cookie': wx.getStorageSync('sessionId')
          },
          success: res => {
            // 设置盒子后，更改session
            if (res.data.statusCode === 200) {
              wx.setStorageSync('user', this.user)
              wx.setStorageSync('sessionId', res.header['Set-Cookie'])
              wx.switchTab({
                url: '/pages/box/home',
                success (res) {
                  let page = getCurrentPages().pop()
                  if (page === undefined || page === null) {
                    return
                  }
                  page.onLoad()
                }
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .find_box{
    width: 80%;
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    color: #ff9920;
    font-size: 32rpx;
    border:4rpx solid #ff9920;
    border-radius:10rpx;
    margin: 80rpx auto;
  }
  .bangd{
    width: 85%;
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    background: #00bcd4;
    border-radius: 8rpx;
    color: #ffffff;
    margin: 80rpx auto;
  }
  .bg_image{
    width: 90%;
    height: 450rpx;
    margin: 60rpx auto;
    border: 4rpx solid #cccccc;
    position: relative;
  }
</style>
