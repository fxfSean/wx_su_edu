// Douban API 操作
const douban = require('../../libraries/su_edu.js')

Page({
  data: {
    boards: [
      { key: 'in_theaters', name: '正在热映' },
      { key: 'coming_soon', name: '即将上映' },
      { key: 'top250', name: 'T0P250' },
      { key: 'weekly', name: '口碑榜' },
      { key: 'us_box', name: '北美票房榜' },
      { key: 'new_movies', name: '新片榜' }
    ],
    movies: [],
    movie:[],
    loading: false,

    page: 1,
    size: 10,
    subtitle: '请在此输入搜索内容',
    search: '',
    hasMore: false
  },

  onLoad () {
    douban.find_event('category&path=63', 1, 5)
      .then(d => this.setData({ movie: d.data.items, loading: false }))//TODO edu d.data.items
      .catch(e => {
        console.error(e)
        this.setData({ movie: [], loading: false })
      })

      this.search();
  },


  loadMore() {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    douban.find_event('category', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.data.items), loading: false })
          if (d.data.items.length < this.data.size) {
            this.setData({ hasMore: false })
          }
        } else {
          this.setData({ hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },

  search() {
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: '' ,page: 1})
    douban.find_event('category', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ subtitle: d.title, movies: d.data.items, loading: false })
          if (d.data.items.length < this.data.size) {
            this.setData({ hasMore: false })
          }
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





