// Douban API 操作
const douban = require('../../libraries/su_edu.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    url:'productinfo&product_id=',
    title: '',
    loading: true,
    movie: {}
  },

  onLoad (params) {
    douban.findOne(this.data.url,params.id)
      .then(d => this.setData({ title: d.title, movie: d, loading: false }))
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {}, loading: false })
        console.error(e)
      })
  },

  onReady () {
    wx.setNavigationBarTitle({ title: '活动详情' })
  }
})
