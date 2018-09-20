<template>
  <div class="page" v-if="person.pid">
    <div class="page__bd">
      <div class="weui-grids">
        <block>
          <a url="" class="weui-grid">
            <div class="weui-grid__label" style="font-size: 28rpx;font-weight: bold">{{devSize}}</div>
            <div class="weui-grid__label">关联设备</div>
          </a>
          <a class="weui-grid">
            <!--<div class="pointDiv">
              <img v-bind:src="person.imageurl" class="personImg">
            </div>-->
            <Avatar :imageurl="person.imageurl" :online="true" :borderline="true"></Avatar>
            <p class="weui-grid__label" style="font-size: 28rpx">{{person.pname}}</p>
          </a>
          <a url="" class="weui-grid">
            <div class="gzdiv">
              <p class="weui-grid__label gz" @click="carePerson">选择关注</p>
            </div>
          </a>
        </block>
      </div>
      <!--<div class="weui-grid__label">最近更新：{{lastUpdate}}</div>-->
    </div>
    <!--<div class="weui-media-box__title">{{person.pname}}的设备</div>-->
    <div class="weui-panel__bd">
      <div class="weui-media-box" style="padding: 0rpx 10rpx;">
        <div class="slide-box">
          <div class="slide-item" v-for="(item,index) in dev" :key="item.did">
            <div :class="['triangle_border_down',{'triangle_border_on':selected==item.dmac,'triangle_border_off':selected!=item.dmac}]"></div>
            <div :class="['pointDev',{'dev_online':item.online,'dev_offline': !item.online,'bordercolor':selected==item.dmac}]" @click="initChart(index)">
              <i class="iconfont iconcolor" v-bind:class="{'icon-dev_android':item.dtype==0,'icon-dev_iphone':item.dtype==1,
                'icon-dev_pad':item.dtype==2,'icon-dev_pad1':item.dtype==3, 'icon-dev_laptop':item.dtype==4, 'icon-dev_laptop1':item.dtype==5,
                'icon-dev_taishiji':item.dtype==6, 'icon-dev_jiqiren':item.dtype==7,'icon-dev_home':item.dtype==8, 'icon-dev_tv':item.dtype==9}"></i>
              <img v-if="item.blocking==1" src="/static/icon/jzsw.png" class="position" />
            </div>
            <p class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx">{{ item.dname }}</p>
          </div>
        </div>
      </div>
    </div>

    <div style="background: #f7f7f7;height: 20rpx"></div>
    <div class="weui-cells" style="margin-top: 0px">
      <div class="weui-cell">
        <div class="weui-cell__bd" @click="devdetail">
          <div style="width: 70%;height: auto">
            <div class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx;text-align: left">当日在线总时长：{{ onlineS }}</div>
            <i-progress :percent="percent_onlineS" status="active" hide-info></i-progress>
            <div class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx;text-align: left">QQ/微信在线时长：{{ QQ_WECAT }}</div>
            <i-progress :percent="percent_QQ_WECAT" status="success" hide-info></i-progress>
            <div class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx;text-align: left">游戏在线时长：{{ game }}</div>
            <i-progress :percent="percent_game" status="wrong" hide-info></i-progress>
            <div class="weui-grid__label" style="color: #999999;margin-top: 0px;font-size: 22rpx;text-align: left">视频在线时长：{{ video }}</div>
            <i-progress :percent="percent_video" status="video" hide-info></i-progress>
          </div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </div>

    <div style="background: #f7f7f7;height: 20rpx"></div>
    <div class="weui-media-box__title">
      <div style="width: 100%;height: 60rpx;text-align: center">最近活跃度</div>
      <div class="title">
        <div style="background: #ed3f14;height: 22rpx;width: 22rpx;margin: 18rpx 4rpx"></div>
        <div>游戏</div>
        <div style="background: #ff9920;height: 22rpx;width: 22rpx;margin: 18rpx 4rpx"></div>
        <div>视频</div>
        <div style="background: #00bcd4;height: 22rpx;width: 22rpx;margin: 18rpx 4rpx"></div>
        <div>其他</div>
      </div>

    </div>
    <div class="wrap">
      <mpvue-echarts :echarts="echarts" :onInit="handleInit" ref="echarts" />
    </div>
  </div>
  <div v-else-if="show" style="margin-top: 200rpx;width: 100%;text-align: center">
    <img src="/static/icon/page_null.png" style="width: 330rpx;height: 330rpx" />
    <div class="addcare" @click="carePerson"><i class="iconfont icon-add">&nbsp;&nbsp;选择关注</i></div>
  </div>
  <div v-else></div>
</template>

<script>
  import * as echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  import Avatar from '../../components/avatar'
  let chart = null
  export default {
    data () {
      return {
        option: null,
        echarts,
        person: {},
        dev: [],
        item:{},
        devSize: 0,
        lastUpdate: '',
        selected: null,
        onlineS:0, // 当日累计在线时长
        percent_onlineS:0,
        QQ_WECAT:0, // QQ、微信在线时长
        percent_QQ_WECAT:0,
        game:0, // 游戏在线时长
        percent_game:0,
        video:0, // 视频时长
        percent_video:0,
        show:false
      }
    },
    components: {
      mpvueEcharts,
      Avatar
    },
    onLoad () {
      this.getLoadding()
    },
    onShow () {
      this.$api.setLoadding(false)
      let carePerson = wx.getStorageSync('careperson')
      if (carePerson) {
        carePerson.care = true
        this.person = carePerson
        wx.removeStorageSync('careperson')
        this.$api.setLoadding(false)
        this.$api.put('/person/' + carePerson.pid + '/care', carePerson, null, r => {
          this.getDev()
          wx.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 1500
          })
          return
        })
      }
      this.getCare()
    },
    methods: {
      getCare () {
        this.$api.get('/person-cared', null, null, r => {
          if (r.data) {
            r.data['imageurl'] = this.$api.ImgName(r.data['pimage'])
            this.person = r.data
            this.getDev()
          }else{
            // 若没有关注的人则取消加载
            wx.hideLoading()
            this.show = true
          }
        })
      },
      getDev () {
        let pid = this.person['pid']
        if (pid) {
          this.$api.get('/dev', {'pid': pid, 'order': 'lasttime'}, null, r => {
            this.dev = r.data
            this.devSize = r.total
            this.lastUpdate = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(r.data[0].lasttime * 1000))
            if (this.dev.length > 0) {
              this.initChart(0)
            }
          })
        }
      },
      carePerson () {
        wx.navigateTo({
          url: '/pages/box/carePerson?pid=' + this.person.pid
        })
      },
      initChart (index) {
        let _this = this
        let dmac = _this.dev[index].dmac
        let now = new Date()
        let endtime = Date.parse(now)/1000 - now.getSeconds()
        let starttime = endtime - 60*60*24
        _this.selected = dmac
        _this.item = _this.dev[index]
        _this.$api.get('/activity/minnew', {'dmac': dmac,'starttime':starttime,'endtime':endtime}, null, r => {
          var list = r.data
          var pkt_other = [],date = [], obj = {},listSize = list.length,listIndex = 0
          var onlineS=0,QQ_WECAT =0,game=0,video=0
          var today = new Date(new Date().setHours(0, 0, 0, 0)) / 1000
          for (let i = 0, len = 60*24; i < len; i++) {
            if(listIndex<listSize){
              obj = list[listIndex]
            }

            if (starttime === obj['time']) {

              if(starttime>endtime-5*60*60){
                obj.pkt>2000?obj.pkt = 2000:obj.pkt
                if(obj.atype == 1){
                  pkt_other.push({value:obj['pkt'],itemStyle:{color:'#ed3f14'}})
                } else if(obj.atype == 2){
                  pkt_other.push({value:obj['pkt'],itemStyle:{color:'#ff9920'}})
                } else {
                  pkt_other.push({value:obj['pkt'],itemStyle:{color:'#15bbbc'}})
                }
                date.push(_this.$api.formatDate('hh:mm', new Date(starttime * 1000)))
              }




              // 如果对象时间大于当天凌晨时间，则开始计算在线时长
              if(obj['time']>=today){
                if(obj.pkt>=200){
                  onlineS++
                }
                // sns: 0 QQ 1 微信 2 微博
                // atype: 1 game 2 video
                if((obj.sns>>0) & 1 == 1 || (obj.sns>>1) & 1 == 1){
                  QQ_WECAT ++
                }
                if(obj.atype === 1){game++}
                if(obj.atype === 2){video++}
              }
              listIndex++
            } else {
              if(starttime>endtime-5*60*60) {
                pkt_other.push({value: 0, itemStyle: {color: '#15bbbc'}})
                date.push(_this.$api.formatDate('hh:mm', new Date(starttime * 1000)))
              }
            }
            starttime = starttime + 60
          }

          if(QQ_WECAT>onlineS){ QQ_WECAT = onlineS }
          let xx = onlineS>180?onlineS:180
          if(onlineS>60){
            _this.onlineS = parseInt(onlineS/60) + '小时'
            if(onlineS%60 - (onlineS%60)%10 > 0){
              _this.onlineS += (onlineS%60 - (onlineS%60)%10) + '分钟'
            }
          }else{
            if(onlineS - onlineS%10 === 0){
              _this.onlineS = '不足10分钟'
              onlineS = 10
            }else{
              _this.onlineS = onlineS - onlineS%10 + '分钟'
            }
          }
          _this.percent_onlineS = onlineS/xx * 100

          if(QQ_WECAT>60){
            _this.QQ_WECAT = parseInt(QQ_WECAT/60) + '小时'
            if(QQ_WECAT%60 - (QQ_WECAT%60)%10 > 0){
              _this.QQ_WECAT += (QQ_WECAT%60 - (QQ_WECAT%60)%10) + '分钟'
            }
          }else{
            if(QQ_WECAT - QQ_WECAT%10 === 0){
              _this.QQ_WECAT = '不足10分钟'
              QQ_WECAT = 10
            }else{
              _this.QQ_WECAT = QQ_WECAT - QQ_WECAT%10 + '分钟'
            }
          }
          _this.percent_QQ_WECAT = QQ_WECAT/xx * 100

          if(game>60){
            _this.game = parseInt(game/60) + '小时'
            if(game%60 - (game%60)%10 > 0){
              _this.game += (game%60 - (game%60)%10) + '分钟'
            }
          }else{
            if(game - game%10 === 0){
              _this.game = '不足10分钟'
              game = 10
            }else{
              _this.game = game - game%10 + '分钟'
            }
          }
          _this.percent_game = game/xx * 100

          if(video>60){
            _this.video = parseInt(video/60) + '小时'
            if(video%60 - (video%60)%10 > 0){
              _this.video += (video%60 - (video%60)%10) + '分钟'
            }
          }else{
            if(video - video%10 === 0){
              _this.video = '不足10分钟'
              video = 10
            }else{
              _this.video = video - video%10 + '分钟'
            }
          }
          _this.percent_video = video/xx * 100

          _this.option = {
            grid:{
              top:'20rpx',
              bottom:'30rpx'
            },
            xAxis: {
              data: date,
              axisLabel:{
                interval: function (i,v) {
                  return v=='00:00'||v=='01:00'||v=='02:00'||v=='03:00'||v=='04:00'||v=='05:00'||v=='06:00'||v=='07:00'||v=='08:00'
                  ||v=='09:00'||v=='10:00'||v=='11:00'||v=='12:00'||v=='13:00'||v=='14:00'||v=='15:00'||v=='16:00'
                  ||v=='17:00'||v=='18:00'||v=='19:00'||v=='20:00'||v=='21:00'||v=='22:00'||v=='23:00'?v:''
                }
              }
            },
            yAxis: {
              min: 0,
              max: 2000,
              // interval: 400,
              type: 'value',
              axisLabel: {
                formatter: function (value) {
                  var texts = null
                  if (value === 0) {
                    texts = '低'
                  } else if (value === 2000) {
                    texts = '高'
                  }
                  return texts
                }
              }
            },
            dataZoom: [
              {
                type: 'slider',
                start:0,
                end:100,
                show:false,
                xAxisIndex: 0,
                filterMode: 'empty',
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              },
              {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
              }
            ],
            series: [
              {
                id: 'c',
                type: 'bar',
                data: pkt_other,
                barCategoryGap:'0%',
                barGap:'0%'
              }
            ]
          }
          _this.$refs.echarts.init()
        })
      },
      handleInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        chart.setOption(this.option)
        wx.hideLoading()
        this.$api.setLoadding(true)
        return chart
      },
      devdetail () {
        let dev = this.item
        if (dev.online) {
          dev['color'] = 'green'
        }else{
          dev['color'] = 'grey'
        }
        dev['firstTimeStr'] = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.firsttime * 1000))
        dev['lastTimeStr'] = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.lasttime * 1000))
        dev.person = this.person
        wx.setStorageSync('devdata', dev)
        wx.navigateTo({
          url: '/pages/box/devdetail'
        })
      }
    }
  }
</script>

<style scoped>
  .page{
    background: #ffffff;
  }
  .page__bd{
    background: #00bcd4;padding-bottom: 20rpx
  }
  .weui-grid__label{
    color: #ffffff;
  }
  .dev_online{
    background: #f2fbfc;
    color: #00bcd4;
  }
  .dev_offline{
    background: #eeeeee;
    color: #cccccc;
  }
  .iconcolor{
    font-size: 60rpx;
    line-height: 72rpx
  }
  .position {
    position:absolute;
    z-index:999;
    width: 12px;
    height: 12px;
    right: 0%;
    top:0%;
    text-align:center;
  }
  .weui-grids {
    border-top: 0px;
    border-left: 0px;
    /*border-bottom: 1px solid #d9d9d9;*/
  }

  .weui-grid {
    padding: 10px 10px 5px 10px;
    border-bottom: 0px;
    border-right: 0px;
  }
  .gzdiv{
    height: 50px;width: 80px;margin: 0px auto;display:flex;justify-content:center;align-items:center;
  }
  .gz{
    margin-top: 0px;height: 50rpx;width:130rpx; border-radius: 40rpx;background: #ffffff;line-height: 50rpx;color: #00bcd4;
  }
  .bordercolor{
    border: 2rpx solid #00bcd4 !important;
  }
  .weui-media-box__title{
    height: 60rpx; text-align: center; line-height: 60rpx;
    border-bottom: 2px solid #eeeeee;
    position: relative;
  }
  .slide-box{
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .slide-item{
    /*width: 50px;*/
    /*margin-right: 20px;*/
    padding: 20rpx;
    width: auto;
    text-align: center;
    width: 110rpx;
  }
  .pointDev {
    height: 72rpx;
    width: 72rpx;
    text-align: center;
    margin: 0 auto;
    border-radius: 50px;
    position: relative;
  }
  .triangle_border_on{
    border-color:#00bcd4 transparent transparent;/*灰 透明 透明 */
  }
  .triangle_border_off{
    border-color:transparent transparent transparent;/*灰 透明 透明 */
  }
  .triangle_border_down{
    width:0;
    height:0;
    border-width:10rpx 10rpx 0;
    border-style:solid;
    margin:8rpx auto;
    position:relative;
  }
  .wrap {
    width: 100%;
    height: 280rpx;
  }
  .addcare{
    width: 470rpx;
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    color: #ff9920;
    font-size: 32rpx;
    border:1px solid #ff9920;
    border-radius:10rpx;
    margin: 80rpx auto;
  }
  .title{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 22rpx;
    position: absolute;
    top: 0px;
    z-index: 9999;
    right: 20rpx;
  }
  .title div{
    float: left;
  }
</style>
