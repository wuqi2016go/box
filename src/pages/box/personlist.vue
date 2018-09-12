<template>
    <div class="page">
      <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell" v-for="(item,index) in personon" :key="item.pid" @click="personInfoOn(index)">
            <div class="weui-cell__hd">
              <i-avatar v-bind:src="item.imageurl" size="large" i-class="personavatar person_list_avatar"></i-avatar>
            </div>
            <div class="weui-cell__bd">
              <h4 class="weui-media-box__title">{{item.pname}}</h4>
              <p class="weui-media-box__desc">描述信息</p>
            </div>
          </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell" v-for="(item,index) in personoff" :key="item.pid" @click="personInfoOff(index)">
          <div class="weui-cell__hd">
            <i-avatar v-bind:src="item.imageurl" size="large" i-class="personavatar_off" iimage="imagegray"></i-avatar>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title" style="color: #999999">{{item.pname}}</h4>
            <p class="weui-media-box__desc">描述信息</p>
          </div>
        </div>
      </div>
      <div class="right-icon" @click="personAdd">
        <i class="iconfont icon-addcontacts" style="font-size: 3em;color: #15C2BC;"></i>
      </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          personon: [],
          personoff: []
        }
      },
      onShow () {
        wx.showNavigationBarLoading()
        this.persononline()
        this.personoffline()
        setTimeout(_ => {
          wx.hideNavigationBarLoading()
        }, 500)
      },
      methods: {
        persononline () {
          let _person = []
          this.$api.get('/person', {'online': 1}, null, r => {
            let _this = this
            r.data.forEach(function (v, k) {
              v['imageurl'] = _this.$api.ImgName(v.pimage)
              _person.push(v)
            })
            _this.personon = _person
          })
        },
        personoffline () {
          // 不在线person
          this.$api.get('/person', {'online': 2}, null, r => {
            let _this = this
            let _person = []
            r.data.forEach(function (v, k) {
              v['imageurl'] = _this.$api.ImgName(v.pimage)
              _person.push(v)
            })
            _this.personoff = _person
          })
        },
        personInfoOn (index) {
          let person = this.personon[index]
          person['online'] = true
          wx.setStorageSync('person', person)
          wx.navigateTo({
            url: '/pages/box/persondetail'
          })
        },
        personInfoOff (index) {
          let person = this.personoff[index]
          person['online'] = false
          wx.setStorageSync('person', person)
          wx.navigateTo({
            url: '/pages/box/persondetail'
          })
        },
        personAdd () {
          wx.navigateTo({
            url: '/pages/box/personadd'
          })
        }
      }
    }
</script>

<style scoped>
  .weui-cell__hd>span {
    width: 50px;
    height: 50px;
    display: block;
    overflow: hidden;
    background-repeat: no-repeat;
    margin-right: 15px;
    -webkit-background-size: cover;
    -webkit-border-radius: 200px;
  }

  .user-circle{
    height: 50px;
    width: 50px;
    background: #f2fbfc;
    text-align: center;
    margin-right: 10px;
    border: 1px solid rgba(0, 188, 212, 0.60);
    border-radius: 50px;
  }
  .personImg{
    width: 42px;
    height: 42px;
    overflow: auto;
    margin: auto;
  }
  .offlinebackgroud{
    background-color: #eeeeee !important;
    filter:grayscale(100%);
　　-webkit-filter:grayscale(100%);
　　-moz-filter:grayscale(100%);
　　-ms-filter:grayscale(100%);
　　-o-filter:grayscale(100%);
　　filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
　　-webkit-filter:grayscale(1);
  }
  .right-icon{
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999;
  }
</style>
