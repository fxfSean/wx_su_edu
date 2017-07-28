// Douban API 操作
const douban = require('../../../../../libraries/su_edu.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    url:'trainingbaseinfo&trainingbase_id=',
    title: '',
    loading: true,
    detail: {},
    imageWidth:100,
    imageHeight:100
  },

  imgload : function(e){
    this.setData(this.wxAutoImageCal(e));

  },

  wxAutoImageCal : function (e){  
    //获取图片的原始长宽  
    var originalWidth = e.detail.width;  
    var originalHeight = e.detail.height;  
    var windowWidth = 0, windowHeight = 0;  
    var imageWidth= 0, imageHeight= 0;  
    var results= {};  
    //获取屏幕信息  
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        //判断按照那种方式进行缩放  
        if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候  
          imageWidth = windowWidth;
          imageHeight = (imageWidth * originalHeight) / originalWidth;
          results.imageWidth = imageWidth;
          results.imageHeight = imageHeight;
        } else {//否则展示原来的数据  
          results.imageWidth = originalWidth;
          results.imageHeight = originalHeight;
        }
      }
    })  
    return results;  
  },

  onLoad(params) {
    douban.findOne(this.data.url,params.id)
      .then(d => this.setData({ title: d.title, detail: d, loading: false }))
      .catch(e => {
        this.setData({ title: '获取数据异常', detail: {}, loading: false })
        console.error(e)
      })
  },

  onReady() {
    wx.setNavigationBarTitle({ title: '机构详情' })
  },

  
})
