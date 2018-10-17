<template>
  <div class="page" v-if="show">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" v-for="(item,index) in account" :key="item.pid">
        <div class="weui-cell__hd">
          <i-avatar v-bind:src="item.imageurl" size="large" i-class="personavatar person_list_avatar"></i-avatar>
        </div>
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.uname}}</h4>
        </div>
        <div class="weui-cell__ft">
          <div class="shouquan" v-if="item.authority==1" :data-item="index" @click="cancelSQ">取消授权</div>
          <div class="shouquan" v-else style="border: 1px solid #00bcd4 !important;color: #00bcd4" :data-item="index" @click="sureSQ">授权</div>
        </div>
      </div>
    </div>
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
          show: false,
          message:'非管理用户，权限不足',
          account: [],
          params:{
            uid:0,
            tid:0,
            authority:false
          }
        }
      },
      onLoad () {
        this.getAccount()
      },
      methods:{
        getAccount(){
          let user = wx.getStorageSync('user')
          let _this = this
          this.$api.get('/usr-box/'+user.box.bid,null,null,r =>{
            if(r.data.length){
              this.show = true
              let list = r.data
              list.forEach(function (v,k) {
                v['imageurl'] = _this.$api.ImgName(v['uicon'])
              })
              this.account = list
            }else{
              this.message = '暂无数据'
            }
          })
        },
        cancelSQ(e){
          let item = this.account[e.currentTarget.dataset.item]
          let user = wx.getStorageSync('user')
          this.params.uid = item.uid
          this.params.tid = user.box.bid
          this.params.authority = false
          this.$api.post('/usr-box/wxauthority',this.params,null,r=>{
            this.account[e.currentTarget.dataset.item]['authority'] = 0
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1500
            })
          })
        },
        sureSQ(e){
          let item = this.account[e.currentTarget.dataset.item]
          let user = wx.getStorageSync('user')
          this.params.uid = item.uid
          this.params.tid = user.box.bid
          this.params.authority = true
          this.$api.post('/usr-box/wxauthority',this.params,null,r=>{
            this.account[e.currentTarget.dataset.item]['authority'] = 1
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1500
            })
          })
        }
      },
      async onPullDownRefresh () {
        wx.showNavigationBarLoading()
        this.getAccount()
        setTimeout(_ => {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }, 1500)
      }
    }
</script>

<style scoped>
.shouquan{
  opacity:0.6;
  border:1px solid #cccccc;
  border-radius:30px;
  width:150rpx;
  height:56rpx;
  text-align: center;
  line-height: 56rpx;
}
</style>
