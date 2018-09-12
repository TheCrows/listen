//app.js
App({
  onLaunch: function () {
    const innerAudioContext= wx.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.onPlay(() => {
        console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
    this.innerAudioContext=innerAudioContext
  },
  
})