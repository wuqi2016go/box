<template>
  <i-steps direction="vertical" i-class="mysteps">
    <i-step :icon="item.dtypeStr" v-for="(item,index) in present" :key="item.id" :bgcolor="item.bg">
      <view slot="title">
        {{item.pname}} / {{item.dname}}
      </view>
      <view slot="content">
        {{ item.memo }}
      </view>
    </i-step>
  </i-steps>
</template>

<script>
    export default {
      name: 'onlineHistory',
      data () {
        return {
          dmac: '',
          limit: 10,
          offset: 0,
          present: []
        }
      },
      onLoad (options) {
        this.dmac = options.dmac
      },
      onReady () {
        this.offset = 0
        this.present = []
        this.getPresent()
      },
      methods: {
        getPresent () {
          wx.showNavigationBarLoading()
          this.$api.get('/present', {'dmac': this.dmac, 'limit': this.limit, 'offset': this.offset}, null, r => {
            let data = r.data
            let obj = {}
            for (let i = 0, len = data.length; i < len; i++) {
              obj = data[i]
              if (obj.onoff === 1) {
                obj['memo'] = '上线时间：' + this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(obj.time * 1000))
                obj['bg'] = 'bg_on'
              } else {
                obj['memo'] = '下线时间：' + this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(obj.time * 1000))
                obj['bg'] = 'bg_off'
              }
              if (obj.dtype === 0) {
                obj['dtypeStr'] = 'dev_android'
              } else if (obj.dtype === 1) {
                obj['dtypeStr'] = 'dev_iphone'
              } else if (obj.dtype === 2) {
                obj['dtypeStr'] = 'dev_pad'
              } else if (obj.dtype === 3) {
                obj['dtypeStr'] = 'dev_pad1'
              } else if (obj.dtype === 4) {
                obj['dtypeStr'] = 'dev_laptop'
              } else if (obj.dtype === 5) {
                obj['dtypeStr'] = 'dev_laptop1'
              } else if (obj.dtype === 6) {
                obj['dtypeStr'] = 'dev_taishiji'
              } else if (obj.dtype === 7) {
                obj['dtypeStr'] = 'dev_jiqiren'
              } else if (obj.dtype === 8) {
                obj['dtypeStr'] = 'dev_home'
              } else if (obj.dtype === 9) {
                obj['dtypeStr'] = 'dev_tv'
              }
              this.present.push(obj)
            }
            wx.hideNavigationBarLoading()
          })
        }
      },
      async onPullDownRefresh () {
        wx.showNavigationBarLoading()
        this.offset = 0
        this.present = []
        this.getPresent()
        setTimeout(_ => {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }, 1500)
      },
      onReachBottom () {
        // 到这底部在这里需要做什么事情
        this.offset = this.offset + this.limit
        this.getPresent()
      }
    }
</script>

<style scoped>
  .personavatar{
    background: #f2fbfc !important;
    border: 1px solid rgba(0, 188, 212, 0.60);
  }
</style>
