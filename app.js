//app.js
const util = require('./utils/util')
App({
  onLaunch: function () {
    const innerAudioContext= wx.createInnerAudioContext()
    let that=this
    innerAudioContext.autoplay = false
    innerAudioContext.onPlay(() => {
        console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
    this.innerAudioContext=innerAudioContext;
    
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.height=res.windowHeight
        that.globalData.width=res.windowWidth
      }
    })
  },
  globalData:{},
  util,

})