<template>
  <div class="page">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" @click="userImg">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">头像</h4>
        </div>
        <div class="weui-cell__ft">
          <div class="pointDiv">
            <img :src="user.imageurl" class="personImg" />
          </div>
        </div>
      </div>

      <div class="weui-cell" @click="updataNick" >
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">昵称</h4>
        </div>
        <div class="weui-cell__ft">{{user.uname}}</div>
      </div>
      <div class="weui-cell" @click="updatePhone">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">手机号</h4>
        </div>
        <div class="weui-cell__ft">{{user.umobile}}</div>
      </div>
    </div>

    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" @click="updatePwd">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">重置密码</h4>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </div>

    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" @click="loginOut">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">退出登录</h4>
        </div>
      </div>
    </div>
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
        let updateUser = wx.getStorageSync('updateUser')
        if (updateUser) {
          wx.removeStorageSync('updateUser')
          if (_user.uicon !== updateUser.uicon || _user.umobile !== updateUser.umobile || _user.uname !== updateUser.uname) {
            this.$api.put('/usr/' + _user.uid, updateUser, null, r => {
              wx.setStorageSync('user', updateUser)
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 1500
              })
            })
          }
          updateUser['imageurl'] = this.$api.ImgName(updateUser.uicon)
          this.user = updateUser
        } else {
          _user['imageurl'] = this.$api.ImgName(_user.uicon)
          this.user = _user
        }
      },
      methods: {
        userImg () {
          wx.navigateTo({
            url: '/pages/box/userimg'
          })
        },
        updataNick () {
          wx.navigateTo({
            url: '/pages/box/userNick'
          })
        },
        updatePhone () {
          wx.navigateTo({
            url: '/pages/box/userPhone'
          })
        },
        updatePwd () {
          wx.navigateTo({
            url: '/pages/box/userPwd'
          })
        },
        loginOut () {
          // wx.navigateTo({
          //   url: '/pages/userPwd/userPwd'
          // })
        }
      }
    }
</script>

<style scoped>
  .page{
    padding-top: 20px;
  }
  .weui-cells:before {
    top: 0;
    border-top: 0px;
  }
  .weui-cells{
    margin-bottom: 20px;
  }
  .weui-cells:after {
    bottom: 0px;
    border-bottom: 0px;
  }
  .weui-cell__bd{
    margin-left: 0px;
  }
  .pointDiv {
    height: 50px;
    width: 50px;
    text-align: center;
    background: #f2fbfc;
    border: 1px solid rgba(0, 188, 212, 0.60);
    border-radius: 50px;
  }
  .personImg{
    width: 42px;
    height: 42px;
    overflow: auto;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
  }
</style>
