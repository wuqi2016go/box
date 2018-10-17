<template>
  <div class="page" v-if="show">
    <view class="caption-wrap">
    <i-collapse>
      <i-collapse-item
        :name="index"
        :title="p.pname"
        i-class-title="collapse-item-title"
        :imageurl="p.imageurl"
        i-class-content="collapse-item-content"
        v-for="(p,index) in person" :key="p.pid" @click="dev(index)">
        <view slot="content">
          <div class="weui-cells weui-cells_after-title" style="background-color: #f7f7f7">
            <div class="weui-cell" v-for="(d,devindex) in devList['person'+index]" :key="d.did" @click="devdetail(index,devindex)">
              <div class="weui-cell__hd">
                <span>
                  <i class="iconfont" v-bind:class="{'icon-dev_android':d.dtype==0,'icon-dev_iphone':d.dtype==1,
                      'icon-dev_pad':d.dtype==2,'icon-dev_pad1':d.dtype==3, 'icon-dev_laptop':d.dtype==4, 'icon-dev_laptop1':d.dtype==5,
                      'icon-dev_taishiji':d.dtype==6, 'icon-dev_jiqiren':d.dtype==7,'icon-dev_home':d.dtype==8, 'icon-dev_tv':d.dtype==9,
                          'iconcolor_green':true}"></i>
                  <img v-if="d.blocking==1" src="/static/icon/jzsw.png" class="position" />
                </span>
              </div>
              <div class="weui-cell__bd">
                <h4 class="weui-media-box__title" v-if="d.dname !=''" >{{ d.dname }}</h4>
                <h4 class="weui-media-box__title" v-else-if="d.hostname !=''" >{{ d.hostname }}</h4>
                <h4 class="weui-media-box__title" v-else-if="d.netbios !=''" >{{ d.netbios }}</h4>
                <h4 class="weui-media-box__title" v-else-if="d.oui !=''" >{{ d.oui }}</h4>
                <p class="weui-media-box__desc" v-for="(plan,pindex) in d.plans" :key="pindex">限网时间：{{plan.dtypeStr}}&nbsp;&nbsp;{{plan.starttimeStr}}~{{plan.endtimeStr}}</p>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
          </div>
        </view>
      </i-collapse-item>

    </i-collapse>
  </view>
  </div>
  <div v-else style="margin-top: 200rpx;width: 100%;text-align: center">
    <img src="/static/icon/page_null.png" style="width: 300rpx;height: 300rpx" />
    <h4 class="weui-media-box__desc">{{message}}</h4>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          show:false,
          currentname: 'name2',
          message:'暂无数据',
          person: [],
          devList:{},
          selectPerson:{}
        }
      },
      onShow (){
        this.getPerson()
      },
      methods:{
        getPerson(){
          this.$api.get('/person', {'hasplan': 1}, null, r => {
            let _this = this
            let list = r.data
            let obj = {}
            for(let i =0,len=list.length;i<len;i++){
              obj = list[i]
              obj['imageurl'] = _this.$api.ImgName(obj.pimage)
              _this.getDev(obj)
            }
            _this.person = list
            list.length>0?_this.show = true:_this.show = false
          })
        },
        getDev(obj){
          this.$api.get('/dev-plan', {'pid': obj.pid}, null, r => {
            let devList = r.data
            let dev = {}
            let planDev = []
            for(let i =0,len=devList.length;i<len;i++){
              dev = devList[i]
              if(dev.plans.length>0){
                planDev.push(dev)
              }
            }
            obj['dev'] = planDev
          })
        },
        dev(index){
          let _this = this
          let devList = _this.person[index].dev
          _this.selectPerson = _this.person[index]
          devList.forEach(function (dev,i) {
            let plans = dev.plans
            plans.forEach(function (v,k) {
              if(v.dtype == 0){
                v['dtypeStr'] = '每日'
              }else if(v.dtype == 1){
                v['dtypeStr'] = '周一至周五'
              }else if(v.dtype == 2){
                v['dtypeStr'] = '周六 周日'
              }
              v['starttimeStr'] = _this.$api.formatDate('hh:mm', new Date(v.starttime * 1000))
              v['endtimeStr'] = _this.$api.formatDate('hh:mm', new Date(v.endtime * 1000))
            })
          })
          this.devList['person'+index] = devList
        },
        devdetail (index,devindex) {
          let dev = this.devList['person'+index][devindex]
          if (dev['online']) {
            dev['color'] = 'green'
          }else{
            dev['color'] = 'grey'
          }
          dev['mac'] = this.$api.ToMac(dev.dmac)
          dev['firstTimeStr'] = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.firsttime * 1000))
          dev['lastTimeStr'] = this.$api.formatDate('yyyy-MM-dd hh:mm:ss', new Date(dev.lasttime * 1000))
          dev['person'] = this.selectPerson
          delete dev['person'].dev
          wx.setStorageSync('devdata', dev)
          wx.navigateTo({
            url: '/pages/box/devdetail'
          })
        }
      }
    }
</script>

<style scoped>
.caption-wrap{
  font-size: 28rpx;
  background: #ffffff;
}
.weui-cell__hd>span {
  position: relative;
  width: 84rpx;
  height: 84rpx;
  margin: auto;
  display: block;
  text-align: center;
  overflow: visible;
  background-repeat: no-repeat;
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
.iconcolor_green{
  color: #00bcd4;
  font-size: 35px;
  line-height: 84rpx
}
</style>
