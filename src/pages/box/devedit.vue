<template>
  <div class="page">
    <div class="weui-cells  weui-cells_form" style="padding: 20rpx 0rpx">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">IP地址</label>
        </div>
        <div class="weui-cell__bd">
          {{ devdata.devip }}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">MAC地址</label></div>
        <div class="weui-cell__bd">
          {{ devdata.mac }}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label  class="weui-label">设备厂商</label></div>
        <div class="weui-cell__bd">
          {{ devdata.vendor }}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label  class="weui-label">主机名</label></div>
        <div class="weui-cell__bd">
          {{ devdata.hostname }}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label  class="weui-label">NetBIOS名称</label></div>
        <div class="weui-cell__bd">
          {{ devdata.netbios }}
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_bottom_1px">
      <div class="weui-cell">
        <div class="weui-cell__hd">请选择设备类型</div>
      </div>
    </div>
    <div class="weui-grids">
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(0)" >
            <div :class="['triangle_border_down',{'triangle_border_on':0==devdata.dtype,'triangle_border_off':0!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="0" :borderline="0==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">Android</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(1)">
            <div :class="['triangle_border_down',{'triangle_border_on':1==devdata.dtype,'triangle_border_off':1!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="1" :borderline="1==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">iPhone</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(2)">
            <div :class="['triangle_border_down',{'triangle_border_on':2==devdata.dtype,'triangle_border_off':2!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="2" :borderline="2==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">平板</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(3)">
            <div :class="['triangle_border_down',{'triangle_border_on':3==devdata.dtype,'triangle_border_off':3!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="3" :borderline="3==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">平板2</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(4)">
            <div :class="['triangle_border_down',{'triangle_border_on':4==devdata.dtype,'triangle_border_off':4!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="4" :borderline="4==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">笔记本</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(5)">
            <div :class="['triangle_border_down',{'triangle_border_on':5==devdata.dtype,'triangle_border_off':5!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="5" :borderline="5==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">笔记本2</div>
          </div>
        </div>
      </block>

      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(6)">
            <div :class="['triangle_border_down',{'triangle_border_on':6==devdata.dtype,'triangle_border_off':6!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="6" :borderline="6==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">电脑</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(7)">
            <div :class="['triangle_border_down',{'triangle_border_on':7==devdata.dtype,'triangle_border_off':7!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="7" :borderline="7==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">扫地机器人</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(8)">
            <div :class="['triangle_border_down',{'triangle_border_on':8==devdata.dtype,'triangle_border_off':8!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="8" :borderline="8==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">智能家居</div>
          </div>
        </div>
      </block>
      <block>
        <div class="weui-grid">
          <div class="placeholder" @click="borderLine(9)">
            <div :class="['triangle_border_down',{'triangle_border_on':9==devdata.dtype,'triangle_border_off':9!=devdata.dtype}]"></div>
            <Avatar :online="true" :dtype="9" :borderline="9==devdata.dtype" iclass="dev_avatar"></Avatar>
            <div class="weui-grid__label">电视</div>
          </div>
        </div>
      </block>
    </div>

    <div class="weui-cells weui-cells_bottom_1px">
      <div class="weui-cell">
        <div class="weui-cell__hd">设备名称</div>
        <div class="weui-cell__bd">
          <input type="text" placeholder="请输入设备名称" v-model="devdata.dname" style="height: 60rpx" />
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__hd">使用人</div>
        <div class="weui-cell__bd" @click="personedit()">
          <div v-if="person">
            <Avatar :imageurl="person.imageurl" iclass="d_p_avatar" online="true" borderline="true"></Avatar>
          </div>
          <div v-else>
            <input type="text" placeholder="请选择" readonly="true" disabled="disabled" style="height: 60rpx" />
          </div>
        </div>
        <div class="weui-cell__hd weui-cell__ft_in-access">{{ person.pname }}</div>
      </div>
    </div>

    <div class="button-sp-area">
      <button class="weui-btn" style="background: #00bcd4;color: #ffffff" @click="devupdate">提交</button>
    </div>

  </div>
</template>

<script>
    import Avatar from '../../components/avatar'
    export default {
      data () {
        return {
          devdata: {},
          person: {}
        }
      },
      onLoad () {
        this.devDetails()
      },
      components: {
        Avatar
      },
      onShow () {
        let devpersonid = wx.getStorageSync('devpersonid')
        if (devpersonid) {
          this.person = devpersonid
          this.devdata.pid = this.person.pid
          wx.removeStorageSync('devpersonid')
        }
      },
      methods: {
        devDetails () {
          this.devdata = wx.getStorageSync('devdata')
          if (this.devdata.person) {
            this.person = this.devdata.person
          } else {
            this.person = false
          }
        },
        personedit () {
          wx.navigateTo({
            url: '/pages/box/personedit?pid=' + this.person.pid
          })
        },
        borderLine (dtype) {
          this.devdata.dtype = dtype
        },
        devupdate () {
          let dev = this.devdata
          this.$api.put('/dev/' + dev.dmac, dev, null, r => {
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 1500
            })
            dev.person = this.person
            dev.online?dev.color = 'green':dev.color = 'grey'
            wx.setStorageSync('devdata', dev)
            // setTimeout(_ => {
            //   wx.navigateBack()
            // }, 1000)
          })
        }
      }
    }
</script>

<style scoped>
  .weui-cell:before {
    border-top: 0px;
  }
  .weui-label{
    color: rgba(154,154,154,0.80);
  }
  .weui-cells_form .weui-cell{
    padding: 5px 15px;
  }
  .weui-cell__bd{
    text-align: right;
  }
  .weui-grids{
    border-top: 0px;
    border-left: 0px;
    background: #ffffff;
  }
  .weui-grid{
    width: 20%;
    padding: 0px 0px;
    border-right: 0px;
    border-bottom: 0px;
  }
  .weui-grid__label{
    margin-top: 0px;
    color: #999999;
  }

  .weui-panel{
    margin-top: 0px;
    padding-top: 15px;
  }
  .weui-panel:before{
    border-top: 0px;
  }
  .weui-flex{
    margin: 15px 0px 15px 0px;
  }
  .page .placeholder {
    margin: 5px;
    text-align: center;
    font-size: 12px;
    color: black;
    border: 2px solid transparent;
    -webkit-border-radius: 5px;
  }

  .button-sp-area {
    margin: 1.17647059em 15px 2em;
  }
</style>
