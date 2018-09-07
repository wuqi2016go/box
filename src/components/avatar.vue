<template>
  <div :class="[{'nuknow_avatar':pid==0,'bgavatar_on':online,'bgavatar_off': !online,'border_off':!borderline},'i-avatar',iclass]">
    <image :src="imageurl" v-if="imageurl" :class="{'imagegray':!online }"></image>
    <i v-else class="iconfont" v-bind:class="[{'icon-dev_android':dtype==0,'icon-dev_iphone':dtype==1,
                'icon-dev_pad':dtype==2,'icon-dev_pad1':dtype==3, 'icon-dev_laptop':dtype==4, 'icon-dev_laptop1':dtype==5,
                'icon-dev_taishiji':dtype==6, 'icon-dev_jiqiren':dtype==7,'icon-dev_home':dtype==8, 'icon-dev_tv':dtype==9,
                'font_color_on':online,'font_color_off':!online},ifont]"></i>
  </div>
</template>

<script>
    export default {
      name: 'avatar',
      props: ['pid','imageurl', 'online', 'dtype', 'borderline', 'iclass', 'ifont'],
      methods: {
        userImg () {
          wx.navigateTo({
            url: '/pages/box/userimg'
          })
        }
      }
    }
</script>

<style scoped>
  .i-avatar{display:inline-block;text-align:center;background:#ccc;color:#fff;white-space:nowrap;position:relative;overflow:hidden;vertical-align:middle;width:95rpx;height:95rpx;line-height:95rpx;border-radius:100%;font-size:48rpx}
  .i-avatar .ivu-avatar-string{line-height:32px}
  .i-avatar-large .ivu-avatar-string{line-height:95rpx}
  .i-avatar-small{width:24px;height:24px;line-height:24px;border-radius:12px;font-size:14px}
  .i-avatar-small .ivu-avatar-string{line-height:24px}
  .i-avatar-image{background:0 0}
  .i-avatar-square{border-radius:4px}
  .i-avatar>image{
    width:100%;height:100%;
    /*display: inline*/
  }
  .imagegray{
    background-color:#eeeeee !important;
    -webkit-filter:grayscale(100%);
    -webkit-filter:grayscale(1);
    filter:grayscale(100%) !important;
    filter:gray !important;
  }
  .bgavatar_on{
    background: #f2fbfc;
    border: 1px solid rgba(0, 188, 212, 0.60);
  }
  .bgavatar_off{
    background: #eeeeee;
    border: 1px solid #cccccc !important;
  }
  .border_off{
    border: 1px solid transparent !important;
  }
  .font_color_on{
    color: #00bcd4;
    font-size: 30px;
  }
  .font_color_off{
    color: #cccccc;
    font-size: 30px;
  }
  .nuknow_avatar{
    border: 1px solid #ff9920;
    background: rgba(255,153,32,0.10)!important;
    color: #ff9920;
  }
</style>
