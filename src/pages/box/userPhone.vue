<template>
  <div class="page">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="user.umobile"  placeholder="请输入手机号" />
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
    onLoad () {
      this.user = wx.getStorageSync('user')
    },
    onUnload () {
      wx.setStorageSync('updateUser', this.user)
    }
  }
</script>

<style scoped>
  .weui-cells:before {
    top: 0;
    /*border-top: 0px;*/
    border-top: 1rpx solid #eeeeee;
  }
  .weui-cells{
    margin-top: 0px;
  }
  .weui-cells:after {
    bottom: 0px;
    border-bottom: 0px;
  }
</style>
