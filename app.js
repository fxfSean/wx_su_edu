// 创建应用程序对象
App({
  _server: 'http://222.92.102.129/suedu/index.php?route=api/suedu',
  // ========== 全局数据对象（整个应用程序共享） ==========
  // globalData: {},

  // ========== 应用程序全局方法 ==========
  // fetchApi (url, callback) {
  //   // return callback(null, top250)
  //   wx.request({
  //     url,
  //     data: {},
  //     header: { 'Content-Type': 'application/json' },
  //     success (res) {
  //       callback(null, res.data)
  //     },
  //     fail (e) {
  //       console.error(e)
  //       callback(e)
  //     }
  //   })
  // },

  // ========== 生命周期方法 ==========

  // onLaunch () {
  //   // 应用程序启动时触发一次
  //   console.log('App Launch')
  // },

  // onShow () {
  //   // 当应用程序进入前台显示状态时触发
  //   console.log('App Show')
  // },

  // onHide () {
  //   // 当应用程序进入后台状态时触发
  //   console.log('App Hide')
  // }

  // ...

  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },
})
