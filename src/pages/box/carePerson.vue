<template>
  <div class="page">
    <div class="top">
      <div class="weui-cells weui-cells_after-title">
        <radio-group @change="checkboxChange">
          <label class="weui-cell weui-check__label" v-for="item in person" :key="index">
            <radio class="weui-check" :value="item.pid" :checked="item.checked"/>
            <div class="weui-cell__hd">
              <Avatar :imageurl="item.imageurl" :online="true" :borderline="true" iclass="dev_avatar"></Avatar>
            </div>
            <div class="weui-cell__bd">
              <h4 class="weui-media-box__title">{{item.pname}}</h4>
              <p class="weui-media-box__desc">描述信息</p>
            </div>
            <div class="weui-cell__ft weui-check__hd_in-checkbox">
              <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
              <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
            </div>
          </label>
        </radio-group>
      </div>
    </div>

    <div class="notice">
      <p style="padding: 0px 20rpx">温馨提示：</p>
      <p>1.当成员的关联设备超过3个时，不支持选择关注成员，建议减少关联设备。</p>
      <p>2.家小盒只支持查看当前关注人员的实时上网数据</p>
    </div>

  </div>
</template>

<script>
  import Avatar from '../../components/avatar'

  export default {
    data() {
      return {
        pid: 0,
        person: []
      }
    },
    components: {
      Avatar
    },
    onLoad() {
    },
    onShow() {
      this.pid = this.$root.$mp.query.pid
      this.personon()
    },
    methods: {
      personon() {
        this.$api.get('/person', null, null, r => {
          let _this = this
          let pid = parseInt(this.pid)
          let personlist = r.data
          r.data.forEach(function (v, k) {
            v['imageurl'] = _this.$api.ImgName(v.pimage)
            if (pid === v.pid) {
              v['checked'] = true
            } else {
              v['checked'] = false
            }
          })
          _this.person = personlist
        })
      },
      checkboxChange(e) {
        let checkboxItems = this.person
        let values = parseInt(e.mp.detail.value)

        this.person.forEach(function (v, k) {
          v.checked = false
          if (v.pid == values) {
            v.checked = true
            wx.setStorageSync('careperson', v)
          }
        })
        wx.navigateBack()
        // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        //   checkboxItems[i].checked = false
        //   if (checkboxItems[i].pid === parseInt(values)) {
        //     checkboxItems[i].checked = true
        //     wx.setStorageSync('careperson', checkboxItems[i])
        //   }
        // }
        // this.person = checkboxItems
      },
      personadd() {
        wx.navigateTo({
          url: '/pages/box/personadd'
        })
      }
    }
  }
</script>

<style scoped>
  .page {
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .top {
    height: 80%;
    overflow-y: scroll;
  }

  .notice {
    position: fixed;
    color: #cccccc;
    width: 100%;
    height: 15%;
    bottom: 0px;
    z-index: 999;
    font-size: 24 rpx;
  }

  .notice p {
    padding: 0px 40 rpx;
  }
</style>
