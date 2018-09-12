<template>
  <div class="page">
    <div class="weui-cells">
      <!--<div class="cart_list-item" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-index="0" :style="marginLeft">-->
        <div class="li_info">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <i-avatar v-if="person.online" v-bind:src="person.imageurl" size="large" i-class="personavatar person_detail_avatar"></i-avatar>
              <i-avatar v-else v-bind:src="person.imageurl" size="large" i-class="personavatar_off person_detail_avatar" iimage="imagegray"></i-avatar>
            </div>
            <div class="weui-cell__bd">
              <h4 class="weui-media-box__title">{{person.pname}}</h4>
            </div>
            <div class="weui-cell__ft">
              <div style="height:50rpx;width: 120rpx;text-align: center;line-height: 50rpx;background:#ff8b03;border-radius: 8rpx;color: #ffffff;" @click="personEdit"><i class="iconfont icon-bianji" style="font-size: 14px"> 编辑</i></div>
              <div style="height:50rpx;width: 120rpx;text-align: center;line-height: 50rpx;background:red;border-radius: 8rpx;color: #ffffff;margin-top: 10rpx" @click="personDel"><i class="iconfont icon-shanchu" style=" font-size: 14px"> 删除</i></div>
            </div>
          </div>
        </div>
        <!--<div class="list_item_del" :style="delStyle" @click="delShop">删除</div>-->
      <!--</div>-->
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="slide-box">
            <div class="slide-item" v-for="(item,index) in dev" :key="item.did" @click="devSelect(item)">
              <div :class="['triangle_border_down',{'triangle_border_on':selected==item.did,'triangle_border_off':selected!=item.did}]"></div>
              <Avatar :pid="item.pid" :online="item.online" :dtype="item.dtype" :borderline="selected==item.did" iclass="dev_avatar"></Avatar>
              <p class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx">{{ item.dname }}</p>
            </div>
          </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title" style="border-top: 1px solid #eeeeee">
      <div class="weui-cell" @click="goOnlineHistory">
        <div class="weui-cell__bd" style="color:#ff9920;margin-left: 0px;font-size: 24rpx">{{currentOnline}}</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </div>
    <!--<div class="weui-cells">-->
      <!--<div class="weui-cell">-->
        <!--<div style="width: 15%; float: left;text-align: center;height: 40rpx;line-height: 40rpx" @click="prevActivity"><img src="/static/icon/left.png" style="width: 40rpx;height: 100%;" /></div>-->
        <!--<div style="width: 70%;float: left;text-align: center;font-size: 24rpx;">{{activityTitle}}</div>-->
        <!--<div style="width: 15%;float: left;text-align: center;height: 40rpx;line-height: 40rpx;" @click="nextActivity"><img src="/static/icon/right.png" style="width: 40rpx;height: 100%;" /></div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="weui-cells weui-cells_after-title">-->
      <!--<div class="weui-cell" style="padding: 5px 15px">-->
        <!--<div style="width: 82.2%;float: right;text-align: right;font-size: 20rpx;color: #999999">-->
          <!--活跃等级 (高到低)&nbsp;&nbsp;&nbsp;-->
        <!--</div>-->
        <!--<div style="width: 17.8%; float: right"><div class="div_title divs_5"></div> <div class="div_title divs_4"></div> <div class="div_title divs_3"></div><div class="div_title divs_2"></div><div class="div_title" style="background: #ebedf0"></div></div>-->
      <!--</div>-->
      <!--<div class="weui-cell">-->
        <!--<div style="float: left;width: 4%">-->
          <!--<div class="divs_week">一</div><div class="divs_week">二</div><div class="divs_week">三</div><div class="divs_week">四</div>-->
          <!--<div class="divs_week">五</div><div class="divs_week">六</div><div class="divs_week">日</div>-->
        <!--</div>-->
        <!--<div style="float: left;width: 96%">-->
          <!--<div :class="['divs_1',{'divs_2':div.present<=15 && div.present>0,'divs_3':div.present<=30 && div.present>15,'divs_4':div.present<=45&&div.present>30,'divs_5':div.present>45}]" v-for="(div,index) in divSizes" :key="index" :data-index="index"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Avatar from '../../components/avatar'
  export default {
    data () {
      return {
        person: {},
        dev: [],
        dhcp: [],
        selected: '',
        startX: 0,
        leftVal: 0,
        delBtnWidth: 60,
        leftMove: 0,
        params: {
          dmac: '',
          limit: 10,
          offset: 0,
          orderby: 'desc'
        },
        currentOnline: '暂无上线记录',
        MondayTime: '',
        SundayTime: '',
        activityTitle: '',
        divSizes: 168,
        activityParams: {},
        item: {}
      }
    },
    components: {
      Avatar
    },
    computed: {
      marginLeft: function () {
        return 'margin-left:' + this.leftVal
      },
      delStyle: function () {
        return 'right:' + -this.delBtnWidth + 'px;' + 'width:' + this.delBtnWidth + 'px'
      }
    },
    onLoad () {
      this.person = wx.getStorageSync('person')
      this.getdev()
    },
    onShow () {
      this.person = wx.getStorageSync('person')
    },
    methods: {
      touchS (e) {
        if (e.mp.touches.length === 1) {
          this.startX = e.mp.touches[0].clientX
        }
      },
      touchM (e) {
        let index = e.currentTarget.dataset.index
        if (e.mp.touches.length === 1) {
          // 手指滑动开始的位置记录
          let moveX = e.mp.touches[0].clientX
          let disX = this.startX - moveX
          let left = 0
          if (disX === 0 || disX < 0) { // 如果移动距离小于等于0，位置不变
            left = '0px'
          } else if (disX > 0) { // 移动距离大于0，left值等于手指移动距离
            left = '-' + disX + 'px'
            if (disX >= this.delBtnWidth) {
              left = '-' + this.delBtnWidth + 'px'
            }
          }
          // console.log(left)
          if (index !== '' && index != null) {
            this.leftVal = left
          }
        }
      },
      touchE (e) {
        let index = e.currentTarget.dataset.index
        if (e.mp.changedTouches.length === 1) {
          // 手指抬起的位置
          let endX = e.mp.changedTouches[0].clientX
          let disX = this.startX - endX
          let left = 0
          // 如果距离小于删除按钮的1/2，不显示删除按钮
          left = disX > this.delBtnWidth / 2 ? '-' + this.delBtnWidth + 'px' : '0px'
          if (index !== '' && index != null) {
            this.leftVal = left
          }
        }
      },
      getWeek () {
        let now = new Date()
        let nowTime = now.getTime()
        let day = now.getDay()
        if (day === 0) { day = 7 }
        let oneDayTime = 24 * 60 * 60 * 1000
        this.MondayTime = nowTime - (day - 1) * oneDayTime
        this.SundayTime = nowTime + (7 - day) * oneDayTime
        this.activityTitle = '周活跃情况  (' + this.$api.formatDate('yyyy-MM-dd', new Date(this.MondayTime)) +
          ' ~ ' + this.$api.formatDate('yyyy-MM-dd', new Date(this.SundayTime)) + ')'
      },
      getdev () {
        this.$api.get('/dev', {'online': 0, 'haspid': 1, 'pid': this.person.pid}, null, r => {
          this.dev = r.data
          if (this.dev.length > 0) {
            this.devSelect(this.dev[0])
          } else {
            this.dhcp = []
          }
        })
      },
      devSelect (e) {
        this.getWeek()
        this.item = e
        let item = e
        this.$api.get('/present', {'dmac': this.item.dmac, 'limit': 1}, null, r => {
          let obj = r.data[0]
          let time = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(obj.time * 1000))
          if (obj.onoff === 1) {
            this.currentOnline = '最近上线：' + time
          } else {
            this.currentOnline = '最近离线：' + time
          }
        })
        this.selected = item.did
        // this.getActivity()
      },
      getActivity () {
        let starttime = new Date(this.MondayTime).setHours(0, 0, 0, 0) / 1000
        let endtime = new Date(this.SundayTime).setHours(0, 0, 0, 0) / 1000 + 3600 * 24
        this.activityParams = {'starttime': starttime, 'endtime': endtime, 'dmac': this.item.dmac}
        this.$api.get('/present/hour', this.activityParams, null, r => {
          let length = r.data.length
          let list = r.data
          let newlist = []
          let obj = {}
          let newobj = {}

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              obj = list[i]
              while (starttime < endtime) {
                if (starttime === obj['date']) {
                  newlist.push({'date': obj.date, 'present': obj.present})
                  starttime = starttime + 3600
                  break
                }
                newobj = {'date': starttime, 'present': 0}
                newlist.push(newobj)
                starttime = starttime + 3600
              }
            }
            while (starttime < endtime) {
              newobj = {'date': starttime, 'present': 0}
              newlist.push(newobj)
              starttime = starttime + 3600
            }
            this.divSizes = newlist
          } else {
            this.divSizes = 168
          }
        })
      },
      prevActivity () {
        this.SundayTime = this.MondayTime - 60 * 60 * 24 * 1000
        this.MondayTime = this.MondayTime - 60 * 60 * 24 * 1000 * 7

        this.activityTitle = '周活跃情况  (' + this.$api.formatDate('yyyy-MM-dd', new Date(this.MondayTime)) +
          ' ~ ' + this.$api.formatDate('yyyy-MM-dd', new Date(this.SundayTime)) + ')'
        this.getActivity()
      },
      nextActivity () {
        this.MondayTime = this.SundayTime + 60 * 60 * 24 * 1000
        this.SundayTime = this.SundayTime + 60 * 60 * 24 * 1000 * 7
        this.activityTitle = '周活跃情况  (' + this.$api.formatDate('yyyy-MM-dd', new Date(this.MondayTime)) +
          ' ~ ' + this.$api.formatDate('yyyy-MM-dd', new Date(this.SundayTime)) + ')'
        this.getActivity()
      },
      goOnlineHistory () {
        wx.navigateTo({
          url: '/pages/box/onlineHistory?dmac=' + this.item.dmac
        })
      },
      personEdit () {
        wx.navigateTo({
          url: '/pages/box/personupdate'
        })
      },
      personDel () {
        this.$api.delete('/person/' + this.person.pid, null, null, r => {
          wx.navigateBack()
        })
      }
    }
  }
</script>

<style scoped>
  .weui-cell:before {
    border-top: 0px;
  }
  .slide-box{
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .slide-item{
    /*width: 50px;
    margin-right: 20px;*/
    padding: 20rpx 0rpx;
    text-align: center;
    width: 140rpx;
  }
  .div_title {
    width: 24rpx !important; height: 24rpx !important;float: right;
  }
  .divs_week{
    width: 100%;height: 24rpx;font-size: 20rpx; text-align: center;padding: 2rpx;line-height: 22rpx;margin-right: 4rpx;
  }
  .divs_1{
    width: 3.566666666%;height: 24rpx;background: #ebedf0;float: left;margin: 2rpx;
  }
  .divs_2{
    background: #c6e48b !important;
  }
  .divs_3{
    background: #7bc96f !important;
  }
  .divs_4{
    background: #239a3b !important;
  }
  .divs_5{
    background: #196127 !important;
  }
</style>
