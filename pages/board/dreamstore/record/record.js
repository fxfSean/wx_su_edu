// pages/board/dreamstore/record/record.js
var app = getApp();
var Util = require('../../../../utils/util.js');
Page({

  data: {
    detail: [],
    loading: false,

    page: 1,
    size: 10,
    hasMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search()
  },

  loadMore() {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    var that = this;
    wx.request({
      url: app._server + 'getusergiftlist&page=' + this.data.page++,
      data: Util.json2Form({ id: "123456789000000001" }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.data.items.length) {
          that.setData({ detail: that.data.detail.concat(res.data.data.items), loading: false })
          if (res.data.data.items.length < that.data.size) {
            that.setData({ hasMore: false })
          }
        } else {
          that.setData({ hasMore: false, loading: false })
        }
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },

  search() {
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: '', page: 1 })
    var that = this;
    wx.request({
      url: app._server + 'getusergiftlist&page=' + this.data.page++,
      data: Util.json2Form({ id: "123456789000000001" }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.data.items.length) {
          that.setData({ detail: res.data.data.items, loading: false })
          if (res.data.data.items.length < that.data.size) {
            that.setData({ hasMore: false })
          }
        } else {
          that.setData({ hasMore: false, loading: false })
        }
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },


})