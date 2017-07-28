const douban = require('../../../libraries/su_edu.js')

Page({

  data:{
    movies: [],
    loading: false,

    page: 1,
    size: 10,
    hasMore: false
  },

  onLoad(){
    this.search();
  },

  loadMore() {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    douban.find_event('trainingprovidercategory&path=18', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.data.items), loading: false })
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
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: '', page: 1 })
    douban.find_event('trainingprovidercategory&path=18', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.data.items.length) {
          this.setData({ movies: d.data.items, loading: false })
          if(d.data.items.length < this.data.size){
            this.setData({hasMore: false})
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

