<template>
  <view class="caption-wrap">
    <i-collapse name="currentname">
      <i-collapse-item
        name="name1"
        :title="p.pname"
        i-class-title="collapse-item-title"
        :imageurl="p.imageurl"
        i-class-content="collapse-item-content"
        v-for="(p,index) in person" :key="index" @click="dev(index)">
        <view slot="content">
          <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell" v-for="(d,devindex) in devList" :key="devindex" style="padding: 0px" @click="devdetail(index)">
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
                <h4 class="weui-media-box__title">{{ d.dname }}</h4>
                <p class="weui-media-box__desc" v-for="(plan,pindex) in d.plans" :key="pindex">限网时间：{{plan.dtypeStr}}&nbsp;&nbsp;{{plan.starttimeStr}}~{{plan.endtimeStr}}</p>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
          </div>
        </view>
      </i-collapse-item>

    </i-collapse>
  </view>
</template>

<script>
    export default {
      data () {
        return {
          currentname: 'name2',
          person: [],
          devList:[]
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
          this.devList = this.person[index].dev
          for(let k=0,len=this.devList.length;k<len; k++){
            let plans = this.devList[k].plans
            for(let i=0,len=plans.length;i<len; i++){
              if(plans[i].dtype == 0){
                plans[i]['dtypeStr'] = '每日'
              }else if(plans[i].dtype == 1){
                plans[i]['dtypeStr'] = '周一至周五'
              }else if(plans[i].dtype == 2){
                plans[i]['dtypeStr'] = '周六 周日'
              }
              plans[i]['starttimeStr'] = this.$api.formatDate('hh:mm', new Date(plans[i].starttime * 1000))
              plans[i]['endtimeStr'] = this.$api.formatDate('hh:mm', new Date(plans[i].endtime * 1000))
            }
          }
        },
        devdetail (index) {
          let dev = this.devList[index]
          if (dev['online']) {
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
