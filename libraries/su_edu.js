const API_URL = 'https://api.douban.com/v2/movie'
const API_URL_SUEDU = 'http://222.92.102.129/suedu/index.php?route=api/suedu'
const Promise = require('./bluebird')


function fetchApi_event(type,herf, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      // url: `${API_URL_SU_EDU}`,//TODO edu
      url: `${herf}${type}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {

  find_event(type, page = 1, count = 10, search = '') {
    const params = { page: page , limit: count }
    return fetchApi_event(type, API_URL_SUEDU, search ? Object.assign(params, { search: search }) : params)
      .then(res => res.data)
  },

  findOne(url,id) {
    return fetchApi_event(url + id, API_URL_SUEDU,null)
      .then(res => res.data)
  },

  
}




// class Douban {
//   // 不支持
//   // static API_URL = 'https://api.douban.com/v2/movie/'

//   constructor (title, movies) {
//     this.title = title
//     this.movies = movies
//   }
// }
