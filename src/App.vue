<script>
  export default {
    onLaunch () {
      //
    },
    created () {
      // 调用API从本地缓存中获取数据
      // const logs = wx.getStorageSync('logs') || []
      // logs.unshift(Date.now())
      // wx.setStorageSync('logs', logs)
      //
      // console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style>
  @import '../static/weui/weui.css';
  @import '../static/font/stylesheet.css';
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10rpx 0;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  /*滑动删除*/
  .cart_list-item{
    padding: 8px;
    display: flex;
    align-items: center;
    transition: margin-left 0.6s ease;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .li_info {
    flex-grow: 1;
  }
  .list_item_del {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #ff5a5b;
    font-size: 12px;
  }
  .list_item_edit {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #ff8b03;
    font-size: 12px;
  }

  .weui-cells_bottom_1px{
    border-bottom: 1px solid #eeeeee
  }
  .weui-cells_bottom_2px{
    border-bottom: 2px solid #eeeeee
  }
  .personavatar{
    background: #f2fbfc !important;
    border: 1px solid rgba(0, 188, 212, 0.60);
  }
  .personavatar_off{
    background: #eeeeee !important;
    border: 1px solid #cccccc;
  }
  .dev_online{
    background: #f2fbfc !important;
  }
  .dev_offline{
    background: #eeeeee !important;
  }
  .person_list_avatar{
    width:84rpx !important;height: 84rpx !important;
    border-radius: 84rpx !important;
  }
  .dev_avatar{
    width:72rpx !important;
    height: 72rpx !important;
    border-radius: 72rpx !important;
    line-height: 72rpx !important;
  }
  .d_p_avatar {
    width: 60rpx !important;
    height: 60rpx !important;
    float: right;
    margin-right: 20rpx;
  }
  .font_color_online{
    color: #00bcd4 !important;
    font-size: 30px !important;
  }
  .font_color_offline{
    color: #cccccc !important;
    font-size: 30px !important;
  }
  .person_detail_avatar{
    width:125rpx !important;
    height: 125rpx !important;
    border-radius: 125rpx !important;
  }
  .dev_border{
    border: 1px solid rgba(0, 188, 212, 0.60);
  }
  .mysteps{
    padding-top: 30rpx;
    background: #ffffff;
  }
  .i-step-item-ico{
    width: 30px;
    height: 30px;
  }
  .button-sp-area {
    margin: 1.17647059em 15px 2em;
  }
  .triangle_border_on{
    border-color:#00bcd4 transparent transparent;/*灰 透明 透明 */
  }
  .triangle_border_off{
    border-color:transparent transparent transparent;/*灰 透明 透明 */
  }
  .triangle_border_down{
    width:0;
    height:0;
    border-width:10rpx 10rpx 0;
    border-style:solid;
    margin:8rpx auto;
    position:relative;
  }
</style>
