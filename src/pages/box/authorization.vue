<template>
  <div class="page" v-if="show">
    <div class="pointDiv">
      <open-data type="userAvatarUrl"></open-data>
      <open-data type="userNickName"></open-data>
    </div>
    <!-- 需要使用 button 来授权登录 -->
    <div>
      <button v-if="canIUse"  open-type="getUserInfo" @click="bindGetUserInfo(2)" class="weui-btn authButton">授权登录</button>
      <div v-else>请升级微信版本</div>
    </div>
  </div>
  <div v-else style="background: #ffffff;position: fixed;height: 100%;width: 100%;display: flex;">
    <img src="/static/icon/img_launch.jpg" style="width: 100%;height: 100%" />
  </div>
</template>

<script>
    const baseUrl = 'https://www.hobox.com.cn:8080/api/test/app'
    import api from '@/api/index'
    export default {
      data () {
        return {
          canIUse: wx.canIUse('button.open-type.getUserInfo'),
          code:'',
          unionid:'',
          user:{},
          loginType:0,
          show:false
        }
      },
      onShow () {
        this.bindGetUserInfo()
      },
      methods: {
        bindGetUserInfo (type) {
          // 如果第一次登陆
          if(type===2){
            wx.showLoading({
              title: '登录中',
              mask:true
            })
            setTimeout(_ => {
              wx.hideLoading()
            }, 1500)
          }
          var _this = this
          wx.login({
            success: res => {
              var code = res.code
              // 查看是否授权
              wx.getSetting({
                success: function (res) {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: function (res) {
                        wx.request({
                          url: baseUrl + '/getunionid',
                          data: {'code': code, 'iv': res.iv, 'encryptedData': res.encryptedData},
                          method: 'POST',
                          success: r => {
                            if (r.data.unionid) {
                              _this.unionid = r.data.unionid
                              _this.unionidlogin()
                            }
                          },
                          fail: err => {
                            console.log(err)
                          }
                        })
                      }
                    })
                  }else{
                    _this.show = true
                  }
                }
              })
            }
          })
        },
        wxlogin (params) {
          var _this = this
          wx.request({
            url: baseUrl + '/login/wechat',
            data: params,
            method: 'POST',
            success: res => {
              wx.setStorageSync('sessionId', res.header['Set-Cookie'])
              _this.user = res.data.data
              if (res.data.statusCode === 200) {
                wx.setStorageSync('user', _this.user)
                // 如果当前用户存在绑定盒子，直接跳转到首页；不存在则进行绑定
                setTimeout(_ => {
                  wx.switchTab({
                    url: '/pages/box/home'
                  })
                }, 1000)

              } else {
                wx.startWifi({
                  success: function (res) {
                    wx.getConnectedWifi({
                      success: res => {
                        console.log(res)
                        _this.wxbind(res.wifi)
                      },
                      fail: err => {
                        wx.showToast({
                          title: '请确认设备是否连接到带有家小盒的无线网络',
                          icon: 'none',
                          duration: 3000
                        })
                      }
                    })
                  }
                })
              }
            },
            fail: err => {
              wx.showToast({
                title: '登录失败：' + err,
                icon: 'none',
                duration: 3000
              })
            }
          })
        },
        setbox (box) {
          wx.request({
            url: baseUrl + '/usrbox',
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
                  url: '/pages/box/home'
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
        },
        wxbind (wifi) {
          let bssid = wifi.BSSID
          bssid = bssid.replace(/:/g, '')
          api.post('/box/wxbind', {'ssid': wifi.SSID, 'bssid': parseInt(bssid, 16)}, null, r => {
            this.user['box'] = r.data
            this.setbox(r.data)
            // this.user['bmac'] = r.data.bmac
          })
        },
        unionidlogin () {
          wx.request({
            url: baseUrl + '/usr/'+ this.unionid,
            method: 'GET',
            success: r => {
              if(r.data.data && r.data.data['box']){
                let user = r.data.data
                this.wxlogin({'wxuuid': this.unionid,'bmac':user['box'].bmac})
              }else{
                this.wxlogin({'wxuuid': this.unionid})
              }
            }
          })
        }
      }
    }
</script>

<style scoped>
  .pointDiv {
    height: 50px;
    width: 50px;
    margin: 200rpx auto 200rpx auto;
    text-align: center;
    border-radius: 50px;
    position: relative;
  }
  .authButton{
    width: 580rpx;
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    background: #00bcd4;
    color: #ffffff
  }
</style>
