// app.js
const AV = require('./lib/av-live-query-core.js')
const wxAdapters = require('./lib/leancloud-adpters-weapp.js')
// 初始化leanClound存储相关配置
AV.setAdapters(wxAdapters)
AV.init({
    appId:'56fXXUDIgjwAdrQgy9xSaEZG-gzGzoHsz',
    appKey: '7hGIPWhVPThwzdmXrVHbvZeL',
    serverURLs:"https://56fxxudi.lc-cn-n1-shared.com"
})

App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
