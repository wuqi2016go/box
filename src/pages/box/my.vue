<template>
    <div class="page">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell" @click="userInfo">
          <div class="weui-cell__hd">
            <i-avatar v-bind:src="user.imageurl" size="large" i-class="personavatar"></i-avatar>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title">{{user.uname}}</h4>
            <p class="weui-media-box__desc">{{ user.box.essid }}</p>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>

      <div style="padding: 20rpx 10px;background: #ffffff;margin-bottom: 30rpx">
        <div class="weui-grids">
          <block>
            <div class="weui-grid" style="border-right: 1px solid #dcdbdb" @click="boxChange">
              <img class="weui-grid__icon my_detail" src="/static/icon/qhhz.png" />
              <div class="weui-grid__label">盒子管理</div>
            </div>
            <div class="weui-grid" @click="goSwjh">
              <img class="weui-grid__icon my_detail" src="/static/icon/jzsw.png" />
              <div class="weui-grid__label">上网计划</div>
            </div>
          </block>
        </div>
      </div>

      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="my_detail">
              <img src="/static/icon/zhgl.png" class="my_img" />
            </div>
          </div>
          <div class="weui-cell__bd" @click="goAccount">
            <h4 class="weui-media-box__title">账号管理</h4>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="my_detail">
            <img src="/static/icon/bzfk.png" class="my_img" />
            </div>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title">帮助反馈</h4>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="my_detail">
            <img src="/static/icon/tjfx.png" class="my_img" />
            </div>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title">推荐分享</h4>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="my_detail">
            <img src="/static/icon/gywm.png" class="my_img" />
            </div>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title">关于我们</h4>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="my_detail">
            <img src="/static/icon/bbh.png" class="my_img" />
            </div>
          </div>
          <div class="weui-cell__bd">
            <h4 class="weui-media-box__title">版本号</h4>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>

      <!--取消退出登录-->
      <!--<div class="weui-cells weui-cells_after-title">-->
        <!--<div class="weui-cell">-->
          <!--<div class="weui-cell__bd" @click="loginOut" style="height: 60rpx;line-height: 60rpx">-->
            <!--<h4 class="weui-media-box__title" style="color: #e9392a;text-align: center">退出登录</h4>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    </div>
</template>

<script>
    export default {
      data () {
        return {
          user: {}
        }
      },
      onShow () {
        let _user = wx.getStorageSync('user')
        _user['imageurl'] = this.$api.ImgName(_user.uicon)
        this.user = _user
      },
      methods: {
        userInfo () {
          wx.navigateTo({
            url: '/pages/box/userinfo'
          })
        },
        boxChange () {
          let box = this.user.box
          wx.navigateTo({
            url: '/pages/box/boxChange?bid=' + box.bid
          })
        },
        goSwjh () {
          wx.navigateTo({
            url: '/pages/box/swjh'
          })
        },
        goAccount(){
          wx.navigateTo({
            url: '/pages/box/account'
          })
        },
        loginOut () {
          wx.clearStorage()
          wx.redirectTo({
            url: '/pages/box/authorization'
          })
        }
      }
    }
</script>

<style scoped>
  .page{
    padding-top: 30rpx
  }
  .weui-cells:before {
    top: 0;
    border-top: 0px;
  }
  .weui-cells{
    margin-bottom: 30rpx;
  }
  .weui-cells:after {
    bottom: 0px;
    border-bottom: 0px;
  }
  .weui-grids {
    border-top: 0px;
    border-left: 0px;
  }
  .weui-grid{
    border-bottom: 0px;
    border-right: 0px;
    width: 50%;
    padding: 0px 0px;
  }
  .my_detail{
    height: 60rpx;
    width: 60rpx;
  }
  .my_img{
    width: 100%;
    height: 100%;
  }
</style>
