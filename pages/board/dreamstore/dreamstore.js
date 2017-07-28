
const douban = require('../../../libraries/su_edu.js')

Page({
  data: {
    gift: [],

  },

  onLoad() {
    douban.find_event('giftcategory&path=7', 1, 5)
      .then(d => this.setData({ gift: d.data.items }))
      .catch(e => {
        console.error(e)
      })
  },
})