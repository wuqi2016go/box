<template>
  <div class="page">
    <div class="weui-grids">
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 0 }" @click="iconChange(0)">
            <img src="/static/icon/user_01.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 1 }" @click="iconChange(1)">
            <img src="/static/icon/user_02.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 2 }" @click="iconChange(2)">
            <img src="/static/icon/user_03.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 3 }" @click="iconChange(3)">
            <img src="/static/icon/user_04.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 4 }" @click="iconChange(4)">
            <img src="/static/icon/user_05.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 5 }" @click="iconChange(5)">
            <img src="/static/icon/user_06.png" class="personImg"/>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" :class="{ bordercolor: uicon == 6 }" @click="iconChange(6)">
            <img src="/static/icon/user_07.png" class="personImg"/>
          </div>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          uicon: 0
        }
      },
      onLoad () {
        this.uicon = wx.getStorageSync('uicon')
      },
      methods: {
        iconChange (uicon) {
          this.uicon = parseInt(uicon)
          wx.setStorageSync('uicon', this.uicon)
        }
      }
    }
</script>

<style scoped>
  .page{
    margin-top: 15px;
  }
  .placeholder {
    margin: 1px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    background-color: #ffffff;
    border: 2px solid transparent;
    -webkit-border-radius: 5px;
  }
  .bordercolor{
    border: 2px solid #75ce66 !important;
  }
  .personImg{
    width: 42px;
    height: 42px;
  }
  .weui-grids{
    border-top: 0px;
    border-left: 0px;
  }
  .weui-grid{
    width: 25%;
    padding: 0px 0px;
    border-right: 0px;
    border-bottom: 0px;
  }
</style>
