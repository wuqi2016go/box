<template>
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
      <div class="weui-cell" @click="" v-for="(item,index) in present" :key="item.id">
        <div class="weui-cell__hd">
          <Avatar :pid="item.pid" :imageurl="item.imageurl" :online="item.onoff==1" :borderline="true" iclass="dev_avatar"></Avatar>
        </div>
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title" v-if="item.dname!=''">{{ item.pname}}[{{ item.dname}}]</h4>
          <p class="weui-media-box__desc" v-if="item.onoff === 1">{{ item.timeStr }}上线</p>
          <p class="weui-media-box__desc" v-else>{{ item.timeStr }}下线</p>
        </div>
      </div>
    </div>

    <div v-else-if="show" style="width: 100%;text-align: center">
      <img src="/static/icon/page_null.png" style="width: 300rpx;height: 300rpx;margin-top: 100rpx" />
    </div>
    <div v-else></div>
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
          present:[],
          show:false
        }
      },
      components: {
        Calendar,
        Avatar
      },
      onLoad(){
        wx.showNavigationBarLoading()
        setTimeout(_ => {
          wx.hideNavigationBarLoading()
        }, 1000)
      },
      onShow(){
        let data = this.$api.formatDate('yyyy-MM-dd',new Date());
        this.value = data.split('-')
        this.selectDate = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
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
          this.selectDate = new Date(new Date(val[0]+'-'+val[1]+'-'+val[2]).setHours(0,0,0,0))/1000;
          this.getpresent()
        },
        getpresent () {
          let times = this.selectDate;
          let _present = []
          let _this = this
          console.log({'starttime': times,'endtime':times+60*60*24})
          this.$api.get('/present', {'starttime': times,'endtime':times+60*60*24}, null, r => {
            _present = r.data
            _present.length===0?_this.show = true:''
            _present.forEach(function (v, k) {
              v['timeStr'] = _this.$api.formatDate('hh:mm', new Date(v.time * 1000))
              if(v.pid===0){
                v['pimage'] = 100
              }
              v['imageurl'] = _this.$api.ImgName(v.pimage)
              if(!v.dname){
                _this.$api.get('/dev/'+v.dmac,null,null,r=>{
                  let dev = r.data
                  if(dev.hostname){
                    v.dname = dev.hostname
                  }else if(dev.netbios){
                    v.dname = dev.netbios
                  }else{
                    v.dname = dev.oui
                  }
                })
              }
            })
            this.present = _present
          })
        }
      }
    }
</script>


<style scoped>
</style>
