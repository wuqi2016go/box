<template>
  <div class="page">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__bd">
          <input type="password" class="weui-input" v-model="upasswd"  placeholder="请输入原密码" />
        </div>
        <div class="weui-cell__ft">
          <icon type="success" size="23" v-if="checkOld==1"></icon>
          <icon type="warn" size="23" color="#F43530" v-if="checkOld==0"></icon>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__bd">
          <input type="password" class="weui-input" v-model="newUpasswd"  placeholder="请输入新密码" />
        </div>
        <div class="weui-cell__ft">
          <icon type="success" size="23" v-if="checkNew==1"></icon>
          <icon type="warn" size="23" color="#F43530" v-if="checkNew==0"></icon>
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="submitPwd">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        upasswd: '',
        newUpasswd: '',
        user: {},
        checkOld: -1,
        checkNew: -1
      }
    },
    watch: {
      upasswd: function (newQuestion, oldQuestion) {
        if (newQuestion) {
          if (newQuestion === this.user.upasswd) {
            this.checkOld = 1
          } else {
            this.checkOld = 0
          }
        } else {
          this.checkOld = -1
        }
      },
      newUpasswd: function (newQuestion, oldQuestion) {
        if (newQuestion) {
          this.checkNew = 1
        } else {
          this.checkNew = -1
        }
      }
    },
    onLoad () {
      this.user = wx.getStorageSync('user')
    },
    methods: {
      submitPwd () {
        if (this.checkOld === -1 && this.checkNew === -1) {
          this.checkOld = 0
        }
        if (this.checkNew === -1) {
          this.checkNew = 0
        }
        if (this.checkOld === 1 && this.checkNew === 1) {
          this.$api.post('/usr/upasswd', {upasswd: this.upasswd, newUpasswd: this.newUpasswd}, null, r => {
            this.user.upasswd = this.newUpasswd
            wx.setStorageSync('user', this.user)
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 1500
            })
          })
        }
      }
    }
  }
</script>

<style scoped>
  .weui-cells:before {
    top: 0;
    border-top: 0px;
    /*border-top: 1rpx solid #eeeeee;*/
  }
  .weui-cells{
    margin-top: 15px;
  }
  .weui-cells:after {
    bottom: 0px;
    border-bottom: 0px;
  }
</style>
