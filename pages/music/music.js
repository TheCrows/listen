// pages/music/music.js
const app = getApp()
const innerAudioContext=app.innerAudioContext;
let playMusic=playMusic?playMusic:''
let beforetouch=0,aftertouch=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000Emh4Z3O6nxD.jpg?max_age=2592000',
    musicName:'Mystery of love',
    musicAuthor:'Sufjan Stevens',
    
    upTop:app.globalData.height-10,
    deviceHeight:app.globalData.height,
    ifPlay:false,
    ifLike:false,
    ifmove:false,
    circleWay:['circlelist','circlerandom','circlesingle'],
    circleIndex:0,
    totalTime:'0:00',
    totalSecond:0,
    nowTime:'0:00',
    nowSecond:0,
    processX:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.src = 'http://isure.stream.qqmusic.qq.com/C400000A0QR33hfJey.m4a?guid=6695004088&vkey=0B13842139D4809147593B110303725B7A3429AACECA8B175AD49100837DD812B7A44AE45F20E1AC670A6F9BB75CCA81C7EFC8887EA4CFCB&uin=0&fromtag=66'
    setTimeout(() => {
      innerAudioContext.duration
      this.getMusicInfo()
    }, 500);
    // innerAudioContext.play()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  //滑动页面显示评论区
  closeCommet(e){
    this.setData({
      upTop:app.globalData.height-10,
      ifmove:false
    })
  },
  onCommitStart(e){
    beforetouch=e.touches[0].clientY,
    aftertouch=e.touches[0].clientY
  },
  onCommitEnd(e){
    if(this.data.upTop>this.data.deviceHeight/2+40){
      this.setData({
        upTop:this.data.deviceHeight-10,
        ifmove:false
      })
    }else{
      this.setData({
        upTop:80,
        ifmove:false
      })
    }
  },
  onShowCommit(e){
    aftertouch=e.touches[0].clientY
    if(this.data.upTop<80){
      beforetouch = e.touches[0].clientY
    }
    this.setData({
      upTop:this.data.upTop+(aftertouch-beforetouch)*3,
      ifmove:true
    })
    beforetouch=e.touches[0].clientY
  },
  //获取音乐信息
  getMusicInfo(){
    setTimeout(() => {
      this.setData({
        totalTime:app.util.transTime(innerAudioContext.duration),
        totalSecond:innerAudioContext.duration
      })
    }, 500);
  },
  transTime(){

  },
  //播放音乐
  musicPlayControl(){
      playMusic = setInterval(() => {
        if (innerAudioContext.paused){
          clearInterval(playMusic);
          this.setData({
            ifPlay: false
          })
          return
        }
        let nowSecond = innerAudioContext.currentTime
        this.setData({
          nowTime: app.util.transTime(nowSecond),
          nowSecond: nowSecond,
          processX: (app.globalData.width - 80) * nowSecond / this.data.totalSecond
        })
      }, 1000)
      this.setData({
        ifPlay: true
      })
  },
  playMusic(){
    // console.log(this.data.ifPlay);
    // console.log(innerAudioContext.paused);
    // let change
    clearInterval(playMusic)
    if(this.data.ifPlay){
      //暂停播放
      innerAudioContext.pause()
        this.setData({
          ifPlay:false
        })
    }else{
      //开始播放
      innerAudioContext.play()
      this.musicPlayControl()
    }
  },
  likeIt(){
    this.data.ifLike?this.setData({ifLike:false}):this.setData({ifLike:true})
  },
  changeCircle(){
    let nextIndex=(this.data.circleIndex+1)%3
    this.setData({
      circleIndex:nextIndex
    })
  },
  changeProgressBar(e){
    let resultTime=e.detail.x*this.data.totalSecond/(app.globalData.width-80)
    this.setData({
      nowTime:app.util.transTime(resultTime),
      nowSecond:resultTime,
    })
  },
  stopProcessNow(e){
    clearInterval(playMusic)
    innerAudioContext.pause()
    this.setData({
      ifPlay:false,
    })
  },
  playProcessNow(e){
    let nowPlace=0
    const query = wx.createSelectorQuery()
    query.select('.dragSon').boundingClientRect()
    query.selectViewport().scrollOffset()
    
    let getPlace=new Promise((res,rej)=>{
      query.exec(function (result) {
        nowPlace = result[0].left;
        res()
      })
    })
    getPlace.then(()=>{
      let resultTime = nowPlace * this.data.totalSecond / (app.globalData.width - 80)
      //开始播放
      clearInterval(playMusic)
      innerAudioContext.seek(resultTime)
      innerAudioContext.play()
      setTimeout(() => {
        innerAudioContext.currentTime
        this.musicPlayControl()
      }, 0);
    })
    
    
  }
})