const douban = require('../../../libraries/su_edu.js')

Page({
  data: {
    core: [],
  },

  onLoad() {
    douban.find_event('trainingbasecategory', 1, 10)
      .then(d => this.setData({ core: d.data.items }))
      .catch(e => {
        console.error(e)
      })
  },
})