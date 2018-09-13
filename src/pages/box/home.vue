<template>
  <div class="page">

    <i-notice-bar v-if="noticeShow" icon="systemprompt" loop speed="2000" closable>
      家小盒离线，请检查供电及网络情况
    </i-notice-bar>
    <div class="weui-tab__bd">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd" @click="personmore">
          <div style="display: inline-block; vertical-align: middle">在线人员</div>
          <div class="weui-badge" style="margin-left: 8px;">{{personSize}}</div>
          <div style="float: right;height: 20px;width: 20px">
            <img src="/static/icon/more.png" style="width: 100%;height: 100%"/>
          </div>
        </div>
        <div class="weui-panel__bd">
          <div class="weui-grids">
            <div class="weui-grid" v-for="(p,index ) in person" :key="p.pid">
              <i-avatar v-bind:src="p.imageurl" size="large" i-class="personavatar" @click="personinfo(index)"></i-avatar>
              <p class="weui-grid__label">{{ p.pname }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd" @click="devmore">
          <div style="display: inline-block; vertical-align: middle">在线设备</div>
          <div class="weui-badge" style="margin-left: 8px;">{{devSize}}</div>
          <div style="float: right;height: 20px;width: 20px">
            <img src="/static/icon/more.png" style="width: 100%;height: 100%"/>
          </div>
        </div>
        <div class="weui-panel__bd">
          <div class="weui-grids">
            <div v-for="(dev,index ) in devdata" class="weui-grid" @click="devdetail(index)" :key="dev.did">
              <div class="pointDiv" :class="{'pidbackgroud':dev.pid==0}" style="border: 0px;">
                <i class="iconfont iconcolor" v-if="dev.pid!=0" v-bind:class="{'icon-dev_android':dev.dtype==0,'icon-dev_iphone':dev.dtype==1,
                'icon-dev_pad':dev.dtype==2,'icon-dev_pad1':dev.dtype==3, 'icon-dev_laptop':dev.dtype==4, 'icon-dev_laptop1':dev.dtype==5,
                'icon-dev_taishiji':dev.dtype==6, 'icon-dev_jiqiren':dev.dtype==7,'icon-dev_home':dev.dtype==8, 'icon-dev_tv':dev.dtype==9}"></i>
                <i v-else class="iconfont icon-dev_unknow iconcolor_0"></i>
                <img v-if="dev.blocking==1" src="/static/icon/jzsw.png" class="position" />
              </div>
              <p class="weui-grid__label" v-if="dev.dname !=''">{{ dev.dname }}</p>
              <p class="weui-grid__label" v-else-if="dev.hostname !=''">{{ dev.hostname }}</p>
              <p class="weui-grid__label" v-else-if="dev.netbios !=''">{{ dev.netbios }}</p>
              <p class="weui-grid__label" v-else-if="dev.oui !=''">{{ dev.oui }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd" @click="presentmore">
          <div style="display: inline-block; vertical-align: middle">最近一次上线记录</div>
          <div style="float: right;height: 20px;width: 20px">
            <!--<img src="/static/icon/more.png" style="width: 100%;height: 100%"/>-->
            <i class="iconfont icon-shijianzhou" style="font-size: 18px"></i>
          </div>
        </div>
        <div class="weui-panel__bd line">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <i-avatar v-if="present.onoff == 0" v-bind:src="present.imageurl" size="large" i-class="personavatar_off" iimage="imagegray"></i-avatar>
              <i-avatar v-if="present.onoff == 1" v-bind:src="present.imageurl" size="large" i-class="personavatar"></i-avatar>
            </div>
            <div class="weui-cell__bd">
              <h4 class="weui-media-box__title">{{ present.pname}}[{{ present.dname}}]</h4>
              <p class="weui-media-box__desc" v-if="present.onoff === 1">{{ present.timeStr }}上线</p>
              <p class="weui-media-box__desc" v-else>{{ present.timeStr }}下线</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/index'
  export default {
    data () {
      return {
        devIndex: '',
        devdata: [],
        devSize: 0,
        person: [],
        personSize: 0,
        present: {},
        noticeShow: false
      }
    },
    onLoad(){
      wx.showNavigationBarLoading()
      setTimeout(_ => {
        wx.hideNavigationBarLoading()
      }, 1000)
    },
    onShow () {
      this.devonline()
      this.persononline()
      this.presentData()
      setTimeout(_ => {
        // 判断设备是否在线
        this.getBoxState()
      }, 1000)
    },
    methods: {
      devonline () {
        api.get('/dev', {'online': 1, 'limit': 5, 'haspid': 0, 'order': 'lasttime'}, null, r => {
          this.devdata = r.data
          this.devSize = r.total
        })
      },
      persononline () {
        let _this = this
        api.get('/person', {'online': 1, 'limit': 5}, null, r => {
          _this.personSize = r.data.length
          let person = r.data
          person.forEach(function (v, k) {
            v['imageurl'] = api.ImgName(v.pimage)
          })
          _this.person = person
        })
      },
      presentData () {
        api.get('/present', {'limit': 1}, null, r => {
          if (r.data) {
            let _present = r.data[0]
            _present['timeStr'] = api.formatDate('hh:mm', new Date(_present.time * 1000))
            if (_present.pid === 0) {
              _present['imageurl'] = '/static/icon/user_00.png'
            } else {
              _present['imageurl'] = api.ImgName(_present.pimage)
            }
            this.present = _present
          }
        })
      },
      devmore () {
        wx.navigateTo({
          url: '/pages/box/devonline'
        })
      },
      devdetail (index) {
        this.devIndex = index
        let dev = this.devdata[index]
        if (dev.pid > 0) {
          dev['color'] = 'green'
        } else if (dev.pid === 0) {
          dev['color'] = 'orange'
        }
        dev['firstTimeStr'] = api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.firsttime * 1000))
        dev['lastTimeStr'] = api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.lasttime * 1000))
        if (dev.person) {
          dev.person['imageurl'] = api.ImgName(dev.person.pimage)
        }
        wx.setStorageSync('devdata', dev)
        wx.navigateTo({
          url: '/pages/box/devdetail'
        })
      },
      getBoxState () {
        let user = wx.getStorageSync('user')
        this.$api.get('/box/all',{'bmac':user['box'].bmac},null,r =>{
          r.data[0].bstatus === 0?this.noticeShow = true:this.noticeShow = false
        })
      },
      personinfo (index) {
        let person = this.person[index]
        person['online'] = true
        wx.setStorageSync('person', person)
        wx.navigateTo({
          url: '/pages/box/persondetail'
        })
      },
      personmore () {
        wx.navigateTo({
          url: '/pages/box/personlist'
        })
      },
      presentmore () {
        wx.navigateTo({
          url: '/pages/box/presentlist'
        })
      }
    },
    async onPullDownRefresh () {
      wx.showNavigationBarLoading()
      this.devonline()
      this.persononline()
      this.presentData()
      setTimeout(_ => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }, 1500)
    }
  }
</script>

<style scoped>
  .weui-bar__item--on i {
    color: #04BE02 !important;
  }
  .weui-panel:before {
    top: 0;
    border-top: 0px;
  }
  .weui-panel:after {
    bottom: 0;
    border-bottom: 0px;
  }
  .weui-panel__hd:after {
    border-bottom: 0px;
  }

  .weui-cell:before {
    border-top: 0px;
  }

  .weui-grid {
    width: 20%;
  }
  .pointDiv {
    height: 50px;
    width: 50px;
    margin: auto;
    text-align: center;
    background: #f2fbfc;
    border: 1px solid rgba(0, 188, 212, 0.60);
    border-radius: 50px;
    position: relative;
  }
  .position {
    position:absolute;
    z-index:999;
    width: 16px;
    height: 16px;
    right: 0%;
    top:0%;
    border-radius:16px;
    height:16px;
    text-align:center;
    line-height:16px;
    font-size: 16px;
  }
  .iconcolor{
    color: #00bcd4;
    font-size: 35px;
    line-height: 50px
  }
  .iconcolor_0{
    color: #ff9920;
    font-size: 35px;
    line-height: 50px
  }

  .personImg {
    width: 42px;
    height: 42px;
    overflow: auto;
    margin: auto;
  }

  .weui-grids {
    border-left: 0px;
    border-top: 1px solid #eeeeee;
    /*border-bottom: 1px solid #d9d9d9;*/
  }

  .weui-grid {
    border-bottom: 0px;
    border-right: 0px;
  }

  .line {
    border-top: 1px solid #eeeeee;
  }

  .pidbackgroud {
    background: rgba(255, 153, 32, 0.10) !important;
    /*background: #fcc37e !important;*/
  }

  .onlineImg {
    height: 37px;
    width: 37px;
    position: absolute;
    left: -48px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    border-right: 30px solid transparent;
    -webkit-filter: drop-shadow(#00bcd4 40px 0px);
    filter: drop-shadow(40px 0px 0px #00bcd4);
    /*position: relative;
    left: -35px;
    border-right: 30px solid transparent;
    -webkit-filter: drop-shadow(#00bcd4 42px -1px);
    filter: drop-shadow(#00bcd4 42px 5px);*/
  }
</style>
