const baseUrl = 'https://www.hobox.com.cn:8080/api/test/app'
var loadding = true

function apiAxios (method, url, params, editHeaders, success, failure) {
  let time = new Date().getTime()
  let sessionId = wx.getStorageSync('sessionId')
  let headers = Object.assign({}, { 'content-type': 'application/json;charset=utf-8', 'Cookie': sessionId })
  if (editHeaders) {
    headers = Object.assign({}, headers, editHeaders)
  }
  console.log(url)
  wx.request({
    url: `${baseUrl}${url}?t=${time}`,
    data: params || {},
    header: headers,
    method: method,
    success: res => {
      setTimeout(_ => {
        if (url === '/login/wechat') {
          wx.setStorageSync('sessionId', res.header['Set-Cookie'])
        }
        if (res.data.statusCode === 200) {
          // 返回正常的数据
          success(res.data)
        } else {
          if (res.data.message) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 3000
            })
          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 3000
            })
          }
        }
      }, 0)
    },
    fail: err => {
      console.log(err)
      wx.showToast({
        title: '加载失败',
        icon: 'none',
        duration: 3000
      })
      failure(err)
    }
  })
}

// 格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
const FmtTime = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

const ToMac = (dmac) => {
  if (!dmac) return
  // dmac = (Array(14).join('0') + dmac).slice(-14);
  let mac = dmac.toString(16).toUpperCase()
  if(mac.length<12){
    mac = (Array(12).join('0') + mac).slice(-12);
  }
  var result = ''
  result = result + mac.substring(0, 2) + '-'
  result = result + mac.substring(2, 4) + '-'
  result = result + mac.substring(4, 6) + '-'
  result = result + mac.substring(6, 8) + '-'
  result = result + mac.substring(8, 10) + '-'
  result = result + mac.substring(10, 12)
  return result
}

const ImgName = (pimage) => {
  if (typeof pimage !== 'number') return
  let imgname = null
  switch (pimage) {
    case 0 :
      imgname = '/static/icon/user_01.png'
      break
    case 1 :
      imgname = '/static/icon/user_02.png'
      break
    case 2 :
      imgname = '/static/icon/user_03.png'
      break
    case 3 :
      imgname = '/static/icon/user_04.png'
      break
    case 4 :
      imgname = '/static/icon/user_05.png'
      break
    case 5 :
      imgname = '/static/icon/user_06.png'
      break
    case 6 :
      imgname = '/static/icon/user_07.png'
      break
    case 100 :
      imgname = '/static/icon/user_00.png'
      break
  }
  return imgname
}

const formatDate = (strFormat, date) => {
  var dDate = date || new Date()
  var str = strFormat
  var Week = ['日', '一', '二', '三', '四', '五', '六']

  str = str.replace(/yyyy|YYYY/, dDate.getFullYear())
  str = str.replace(/yy|YY/, (dDate.getYear() % 100) > 9 ? (dDate.getYear() % 100).toString() : '0' + (dDate.getYear() % 100))

  str = str.replace(/MM/, dDate.getMonth() > 8 ? (dDate.getMonth() + 1) : '0' + (dDate.getMonth() + 1))
  str = str.replace(/M/g, dDate.getMonth() + 1)

  str = str.replace(/w|W/g, Week[dDate.getDay()])

  str = str.replace(/dd|DD/, dDate.getDate() > 9 ? dDate.getDate().toString() : '0' + dDate.getDate())
  str = str.replace(/d|D/g, dDate.getDate())

  str = str.replace(/hh|HH/, dDate.getHours() > 9 ? dDate.getHours().toString() : '0' + dDate.getHours())
  str = str.replace(/h|H/g, dDate.getHours())
  str = str.replace(/mm/, dDate.getMinutes() > 9 ? dDate.getMinutes().toString() : '0' + dDate.getMinutes())
  str = str.replace(/m/g, dDate.getMinutes())

  str = str.replace(/ss|SS/, dDate.getSeconds() > 9 ? dDate.getSeconds().toString() : '0' + dDate.getSeconds())
  str = str.replace(/s|S/g, dDate.getSeconds())

  return str
}

const setLoadding = (flag) => {
  loadding = flag
}

export default { get: function (url, params, editHeaders, success, failure) {
  return apiAxios('GET', url, params, editHeaders, success, failure)
},
  post: function (url, params, editHeaders, success, failure) {
    return apiAxios('POST', url, params, editHeaders, success, failure)
  },
  put: function (url, params, editHeaders, success, failure) {
    return apiAxios('PUT', url, params, editHeaders, success, failure)
  },
  delete: function (url, params, editHeaders, success, failure) {
    return apiAxios('DELETE', url, params, editHeaders, success, failure)
  },
  FmtTime,
  ToMac,
  formatDate,
  ImgName,
  setLoadding}
