<template>
  <div class="page">

    <div class="weui-cells weui-cells_after-title">
      <radio-group @change="checkboxChange">
        <label class="weui-cell weui-check__label" v-for="item in person" :key="index">
          <radio class="weui-check" :value="item.pid" :checked="item.checked" />
          <div class="weui-cell__hd">
            <Avatar :imageurl="item.imageurl" :online="true" :borderline="true" iclass="dev_avatar"></Avatar>
            <!--<div class="user-circle" :class="{ 'offlinebackgroud':item.offline}">
              <img :src="item.imageurl" class="personImg" />
            </div>-->
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
</template>

<script>
  import Avatar from '../../components/avatar'
  export default {
    data () {
      return {
        pid: 0,
        person: []
      }
    },
    components: {
      Avatar
    },
    onLoad () {
    },
    onShow () {
      this.pid = this.$root.$mp.query.pid
      this.personon()
    },
    methods: {
      personon () {
        this.$api.get('/person', {'online': 1}, null, r => {
          let _this = this
          let pid = parseInt(this.pid)
          let personlist = []
          r.data.forEach(function (v, k) {
            v['imageurl'] = _this.$api.ImgName(v.pimage)
            if (pid === v.pid) {
              v['checked'] = true
            } else {
              v['checked'] = false
            }
            personlist.push(v)
          })
          _this.$api.get('/person', {'online': 2}, null, rep => {
            rep.data.forEach(function (v, k) {
              v['imageurl'] = _this.$api.ImgName(v.pimage)
              if (pid === v.pid) {
                v['checked'] = true
              } else {
                v['checked'] = false
              }
              v['offline'] = true
              personlist.push(v)
            })
            _this.person = personlist
          })
        })
      },
      checkboxChange (e) {
        console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value)
        let checkboxItems = this.person
        let values = e.mp.detail.value
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false
          if (checkboxItems[i].pid === parseInt(values)) {
            checkboxItems[i].checked = true
            wx.setStorageSync('careperson', checkboxItems[i])
          }
        }
        this.person = checkboxItems
      },
      personadd () {
        wx.navigateTo({
          url: '/pages/box/personadd'
        })
      }
    }
  }
</script>

<style scoped>
</style>
