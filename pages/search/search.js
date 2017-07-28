// Douban API 操作
const douban = require('../../libraries/su_edu.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    page: 1,
    size: 10,
    subtitle: '请在此输入搜索内容',
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },

  loadMore() {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    douban.find_event('search', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ subtitle: (this.data.search == '') ? '全部' : this.data.search, movies: this.data.movies.concat(d.data.items), loading: false })
        } else {
          this.setData({ hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },

  search(e) {
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value ,page: 1})
    douban.find_event('search', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ subtitle: (this.data.search == '') ? '全部' : this.data.search, movies: d.data.items, loading: false })
        } else {
          this.setData({ hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', movies: [], loading: false })
        console.error(e)
      })
  },
})
