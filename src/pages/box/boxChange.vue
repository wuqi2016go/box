<template>
  <div class="page">
    <!--<div class="weui-cells weui-cells_after-title" style="background: #00bcd4">-->
      <!--<div class="weui-cell">-->
        <!--<div class="weui-cell__bd"></div>-->
        <!--<div class="weui-cell__ft"><i class="iconfont icon-addcontacts" style="font-size: 90rpx;color: #ffffff"></i></div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="weui-cells">
      <radio-group @change="checkboxChange">
        <label class="weui-cell weui-check__label" v-for="item in box" :key="index">
          <radio class="weui-check" :value="item.bid" :checked="item.checked" />
          <div class="weui-cell__bd" style="margin-left: 0px;width: 80%">
            <h4 class="weui-media-box__title" style="width: 100%">路由器：{{item.essid}}</h4>
            <p class="weui-media-box__desc">路由器MAC地址：{{item.rmacStr}}</p>
            <p class="weui-media-box__desc">盒子MAC地址：{{item.bmacStr}}</p>
          </div>
          <div class="weui-cell__ft weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
          </div>
        </label>
      </radio-group>
    </div>

    <div class="right-icon" @click="searchBox">
      <i class="iconfont icon-addcontacts" style="font-size: 90rpx;color: #15C2BC;"></i>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          bid: 0,
          box: []
        }
      },
      onLoad () {
        this.getBox()
      },
      onShow () {
        this.bid = this.$root.$mp.query.bid
      },
      methods: {
        getBox () {
          this.$api.get('/box/all', null, null, r => {
            let _this = this
            let bid = parseInt(this.bid)
            let boxlist = []
            r.data.forEach(function (v, k) {
              if (bid === v.bid) {
                v['checked'] = true
              } else {
                v['checked'] = false
              }
              v['bmacStr'] = _this.$api.ToMac(v.bmac)
              v['rmacStr'] = _this.$api.ToMac(v.rmac)
              boxlist.push(v)
            })
            _this.box = boxlist
          })
        },
        checkboxChange (e) {
          let _this = this
          wx.showModal({
            title: '切换家小盒',
            content: '确定切换到该盒子吗',
            confirmText: '确认',
            cancelText: '取消',
            success: function (res) {
              if (res.confirm) {
                console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value)
                let checkboxItems = _this.box
                let values = e.mp.detail.value
                for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                  checkboxItems[i].checked = false
                  if (checkboxItems[i].bid === parseInt(values)) {
                    checkboxItems[i].checked = true
                    _this.setbox(checkboxItems[i])
                  }
                }
                _this.box = checkboxItems
              }
            }
          })
        },
        setbox (box) {
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
                wx.setStorageSync('sessionId', res.header['Set-Cookie'])
                let user = wx.getStorageSync('user')
                user.box = box
                user.bmac = box.bmac
                wx.setStorageSync('user', user)
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
        },
        searchBox(){
          wx.navigateTo({
            url: '/pages/box/searchBox'
          })
        }
      }
    }
</script>

<style scoped>
.weui-media-box__desc{
  padding: 4rpx 0;
}
.right-icon{
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
}
</style>
