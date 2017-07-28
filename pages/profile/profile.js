Page({
  data: {
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'fxfSean',
      avatarUrl: '../../images/wechat.png'
    },
      isBind: ''    
  },

  getUserInfo() {
    const that = this
    wx.getUserInfo({
      success(res) {
        console.log(res)
        that.setData({ userInfo: res.userInfo ,isBind:true })
      }
    })
  },

  onLoad() {
    this.getUserInfo();
  }
})
