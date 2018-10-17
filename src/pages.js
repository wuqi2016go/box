module.exports = [
  {
    path: '/pages/box/authorization',
    config: {
      navigationBarTitleText: '',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index'
      }
    }
  }, {
    path: '/pages/box/home',
    config: {
      navigationBarTitleText: '主页',
      enablePullDownRefresh: true,
      usingComponents: {
        'i-avatar': '../../iView/avatar/index',
        "i-notice-bar": "../../iView/notice-bar/index"
      }
    }
  }, {
    path: '/pages/box/my',
    config: {
      navigationBarTitleText: '我的',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index'
      }
    }
  }, {
    path: '/pages/box/mycare',
    config: {
      navigationBarTitleText: '关注',
      usingComponents: {
        "i-progress": "../../iView/progress/index"
      }
    }
  }, {
    path: '/pages/box/devdetail',
    config: {
      navigationBarTitleText: '设备详情',
      usingComponents: {
        'i-button': '../../iView/button/index',
        'i-swipeout': '../../iView/swipeout/index',
        'i-cell': '../../iView/cell/index'
      }
    }
  }, {
    path: '/pages/box/devedit',
    config: {
      navigationBarTitleText: '设备编辑'
    }
  }, {
    path: '/pages/box/devonline',
    config: {
      navigationBarTitleText: '设备列表',
      enablePullDownRefresh: true
    }
  }, {
    path: '/pages/box/personadd',
    config: {
      navigationBarTitleText: '添加成员'
    }
  }, {
    path: '/pages/box/personupdate',
    config: {
      navigationBarTitleText: '成员编辑'
    }
  }, {
    path: '/pages/box/personimg',
    config: {
      navigationBarTitleText: '头像选择'
    }
  }, {
    path: '/pages/box/persondetail',
    config: {
      navigationBarTitleText: '成员详情',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index',
        'i-message': '../../iView/message/index'
      }
    }
  }, {
    path: '/pages/box/personedit',
    config: {
      navigationBarTitleText: '成员列表',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index'
      }
    }
  }, {
    path: '/pages/box/personlist',
    config: {
      navigationBarTitleText: '成员列表',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index'
      }
    }
  }, {
    path: '/pages/box/planadd',
    config: {
      navigationBarTitleText: '计划编辑'
    }
  }, {
    path: '/pages/box/presentlist',
    config: {
      navigationBarTitleText: '最近记录',
      backgroundColor: '#f7f7f7'
    }
  }, {
    path: '/pages/box/userimg',
    config: {
      navigationBarTitleText: '头像选择'
    }
  }, {
    path: '/pages/box/userinfo',
    config: {
      navigationBarTitleText: '个人信息'
    }
  }, {
    path: '/pages/box/userNick',
    config: {
      navigationBarTitleText: '修改昵称'
    }
  }, {
    path: '/pages/box/userPhone',
    config: {
      navigationBarTitleText: '修改手机号'
    }
  }, {
    path: '/pages/box/userPwd',
    config: {
      navigationBarTitleText: '修改密码'
    }
  }, {
    path: '/pages/box/carePerson',
    config: {
      navigationBarTitleText: '选择关注'
    }
  }, {
    path: '/pages/box/onlineHistory',
    config: {
      navigationBarTitleText: '上线历史',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50,
      usingComponents: {
        'i-steps': '../../iView/steps/index',
        'i-step': '../../iView/step/index'
      }
    }
  }, {
    path: '/pages/box/boxChange',
    config: {
      navigationBarTitleText: '选择盒子'
    }
  }, {
    path: '/pages/box/account',
    config: {
      navigationBarTitleText: '账号管理',
      enablePullDownRefresh: true,
      usingComponents: {
        'i-avatar': '../../iView/avatar/index'
      }
    }
  }, {
    path: '/pages/box/swjh',
    config: {
      navigationBarTitleText: '上网计划',
      usingComponents: {
        'i-avatar': '../../iView/avatar/index',
        "i-collapse": "../../iView/collapse/index",
        "i-collapse-item": "../../iView/collapse-item/index"
      }
    }
  }, {
    path: '/pages/box/protocol',
    config: {
      navigationBarTitleText: '用户协议',
    }
  }, {
    path: '/pages/box/questions',
    config: {
      navigationBarTitleText: '常见问题',
    }
  }, {
    path: '/pages/box/searchBox',
    config: {
      navigationBarTitleText: '发现家小盒',
    }
  }, {
    path: '/pages/box/userAgreement',
    config: {
      navigationBarTitleText: '用户协议',
    }
  }
]
