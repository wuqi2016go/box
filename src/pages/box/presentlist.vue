<template>
<!--<div class="page">-->
    <!--<div class="weui-cell weui-cell_input" style="background-color: rgba(153,153,153,0.11);font-size: 18px;">-->
      <!--<div class="weui-cell__hd">-->
        <!--<div class="weui-label">日期</div>-->
      <!--</div>-->
      <!--<div class="weui-cell__bd">-->
        <!--<picker mode="date" value="date" start="2015-09-01" @change="bindDateChange">-->
          <!--<div class="weui-input">{{date}}</div>-->
        <!--</picker>-->
      <!--</div>-->
      <!--<div class="weui-cell__ft">-->
        <!--<i class="iconfont icon-rili"></i>-->
      <!--</div>-->
    <!--</div>-->

  <!--<div class="weui-cells">-->
    <!--<div class="weui-cell" @click="" v-for="(item,index) in present" :key="item.id">-->
      <!--<div class="weui-cell__hd">-->
        <!--<div class="user-circle" :class="{ 'offlinebackgroud':item.onoff==0}" @click="personinfo(index)">-->
          <!--<img :src="item.imageurl" class="personImg" />-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="weui-cell__bd">-->
        <!--<h4 class="weui-media-box__title">{{ item.pname}}[{{ item.dname}}]</h4>-->
        <!--<p class="weui-media-box__desc" v-if="item.onoff === 1">{{ item.timeStr }}上线</p>-->
        <!--<p class="weui-media-box__desc" v-else>{{ item.timeStr }}下线</p>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

<!--</div>-->

  <div class="page">
      <Calendar
        :months="months"
        :value="value"
        @next="next"
        @prev="prev"
        clean
        lunar
        @select="select"
        ref="calendar"
        @selectMonth="selectMonth"
        @selectYear="selectYear"
        :arrowLeft="arrowLeft"
        :arrowRight="arrowRight"
      />

    <div class="weui-cells weui-cells_after-title" v-if="present.length>0">
      <div class="weui-cell" @click="" v-for="(item,index) in present" :key="index">
        <div class="weui-cell__hd">
          <Avatar :pid="item.pid" :imageurl="item.imageurl" :online="item.onoff==1" :borderline="true" iclass="dev_avatar"></Avatar>
        </div>
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{ item.pname}}[{{ item.dname}}]</h4>
          <p class="weui-media-box__desc" v-if="item.onoff === 1">{{ item.timeStr }}上线</p>
          <p class="weui-media-box__desc" v-else>{{ item.timeStr }}下线</p>
        </div>
      </div>
    </div>

    <div v-else style="width: 100%;text-align: center">
      <img src="/static/icon/page_null.png" style="width: 300rpx;height: 300rpx;margin-top: 100rpx" />
    </div>
  </div>
</template>

<script>
    import Calendar from 'mpvue-calendar'
    import arrowLeft from '../../../static/icon/left.png'
    import arrowRight from '../../../static/icon/right.png'
    import Avatar from '../../components/avatar'

    export default {
      data () {
        return {
          value: [2018,6,28],
          selectDate:'2018-6-28',
          arrowLeft: arrowLeft,
          arrowRight: arrowRight,
          present:[]
        }
      },
      components: {
        Calendar,
        Avatar
      },
      onShow(){
        let data = this.$api.formatDate('yyyy-MM-dd',new Date());
        this.selectDate = data
        this.value = data.split('-')
        this.getpresent()
      },
      methods: {
        selectMonth(month,year){
          console.log(year,month)
        },
        prev(month){
          console.log(month)
        },
        next(month){
          console.log(month)
        },
        selectYear(year){
          console.log(year)
        },
        setToday() {
          this.$refs.calendar.setToday();
        },
        dateInfo() {
          const info = this.$refs.calendar.dateInfo(2018, 8, 23);
          console.log(info);
        },
        select(val, val2) {
          this.selectDate = val[0]+'-'+val[1]+'-'+val[2]
          this.getpresent()
        },
        getpresent () {
          let times = new Date(this.selectDate).getTime() / 1000
          let _present = []
          let _this = this
          this.$api.get('/present', {'starttime': times,'endtime':times+60*60*24}, null, r => {
            r.data.forEach(function (v, k) {
              v['timeStr'] = _this.$api.formatDate('hh:mm', new Date(v.time * 1000))
              if(v.pid===0){
                v['pimage'] = 100
              }
              v['imageurl'] = _this.$api.ImgName(v.pimage)
              _present.push(v)
            })
            this.present = _present
          })
        }
      }
    }

    // export default {
    //   data () {
    //     return {
    //       date: this.$api.formatDate('yyyy-MM-dd', new Date()),
    //       present: []
    //     }
    //   },
    //   onLoad () {
    //     this.getpresent()
    //   },
    //   methods: {
    //     bindDateChange (e) {
    //       this.date = e.mp.detail.value
    //     },
    //     getpresent () {
    //       let times = new Date(this.date).getTime() / 1000
    //       let _present = []
    //       let _this = this
    //       this.$api.get('/present', {'starttime': times}, null, r => {
    //         r.data.forEach(function (v, k) {
    //           v['timeStr'] = _this.$api.formatDate('hh:mm', new Date(v.time * 1000))
    //           v['imageurl'] = _this.$api.ImgName(v.pimage)
    //           _present.push(v)
    //         })
    //         this.present = _present
    //       })
    //     },
    //     personinfo (index) {
    //       let pid = this.present[index].pid
    //       this.$api.get('/person/findById/' + pid, null, null, r => {
    //         r.data['imageurl'] = this.$api.ImgName(r.data.pimage)
    //         wx.setStorageSync('person', r.data)
    //         wx.navigateTo({
    //           url: '/pages/box/persondetail'
    //         })
    //       })
    //     }
    //   }
    // }
</script>


<style scoped>
</style>
