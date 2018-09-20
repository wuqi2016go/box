<template>
  <div class="page">
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd_in-select-after">
          <div class="weui-label">周期</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindAccountChange" :range="accounts">
            <div class="weui-select" style="text-align: right">{{accounts[plan.ptype]}}</div>
          </picker>
        </div>
      </div>
    </div>

    <div class="weui-cells">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">开始时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="time" value="time" @change="bindStartTimeChange">
            <div class="weui-input" key="starttimeStr">{{plan.starttimeStr}}</div>
          </picker>
        </div>
        <div class="weui-cell__ft">
          <i class="iconfont icon-shizhong"></i>
        </div>
      </div>
    </div>

    <div class="weui-cells">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="time" value="time" start="09:00" end="21:00" @change="bindEndTimeChange">
            <div class="weui-input" key="endtimeStr">{{plan.endtimeStr}}</div>
          </picker>
        </div>
        <div class="weui-cell__ft">
          <i class="iconfont icon-shizhong"></i>
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <button class="weui-btn" style="background: #00bcd4;color: #ffffff" @click="submitplan">确定</button>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          accounts: ['每天', '周一至周五', '假日(周末)'],
          plan: {
            dmac: '',
            ptype: 0,
            starttime: 0,
            endtime: 0,
            starttimeStr: '09:00',
            endtimeStr: '21:00'
          }
        }
      },
      onLoad(options){
        if(options.plan){
          wx.setNavigationBarTitle({
            title: "修改计划"//页面标题为路由参数
          })
        }else{
          wx.setNavigationBarTitle({
            title: "新增计划"//页面标题为路由参数
          })
        }
      },
      onShow () {
        this.plan = this.$options.data().plan
        let obj = this.$root.$mp.query.plan
        if (obj) {
          this.plan = JSON.parse(obj)
        } else {
          this.plan.dmac = parseInt(this.$root.$mp.query.dmac)
          this.planstarttime()
          this.planendtime()
        }
      },
      methods: {
        bindAccountChange (e) {
          this.plan.ptype = parseInt(e.mp.detail.value)
        },
        bindStartTimeChange (e) {
          this.plan.starttimeStr = e.mp.detail.value
          this.planstarttime()
          console.log(e.mp.detail.value)
        },
        bindEndTimeChange (e) {
          this.plan.endtimeStr = e.mp.detail.value
          this.planendtime()
          console.log(e.mp.detail.value)
        },
        planstarttime () {
          let obj = this.plan.starttimeStr.split(':')
          this.plan.starttime = parseInt(obj[0]) * 3600 + parseInt(obj[1]) * 60
        },
        planendtime () {
          let obj = this.plan.endtimeStr.split(':')
          this.plan.endtime = parseInt(obj[0]) * 3600 + parseInt(obj[1]) * 60
        },
        submitplan () {
          let pid = this.plan.pid
          if (pid) {
            this.$api.put('/plan/' + pid, this.plan, null, r => {
              wx.showToast({
                title: '已完成',
                icon: 'success',
                duration: 1500
              })
              // setTimeout(_ => {
              //   wx.navigateBack()
              // }, 1000)
            })
          } else {
            this.$api.post('/plan', this.plan, null, r => {
              wx.showToast({
                title: '已完成',
                icon: 'success',
                duration: 1500
              })
              // setTimeout(_ => {
              //   wx.navigateBack()
              // }, 1000)
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
