// pages/music/music.js
const app = getApp()
const innerAudioContext=app.innerAudioContext;
let playMusic=playMusic?playMusic:''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000Emh4Z3O6nxD.jpg?max_age=2592000',
    musicName:'Mystery of love',
    musicAuthor:'Sufjan Stevens',
    
    ifPlay:false,
    ifLike:false,
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
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
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
  onShowCommit(e){
    // console.log(e.touches[0].clientX,e.touches[0].clientY);
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
      playMusic=setInterval(()=>{
        let nowSecond=innerAudioContext.currentTime
        this.setData({
          nowTime:app.util.transTime(nowSecond),
          nowSecond:nowSecond,
          processX:(app.globalData.width-80)*nowSecond/this.data.totalSecond
        })
      },1000)
      this.setData({
        ifPlay:true
      })
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
  playProcessNow(e){
    
    let resultTime=e.changedTouches[0].clientX*this.data.totalSecond/(app.globalData.width-80)
    //开始播放
    clearInterval(playMusic)
    innerAudioContext.seek(resultTime)
    innerAudioContext.play()
    setTimeout(() => {
      innerAudioContext.currentTime
      playMusic=setInterval(()=>{
        let nowSecond=innerAudioContext.currentTime
        this.setData({
          nowTime:app.util.transTime(nowSecond),
          nowSecond:nowSecond,
          processX:(app.globalData.width-80)*nowSecond/this.data.totalSecond
        })
      },1000)
      this.setData({
        ifPlay:true
      })
    }, 0);
    
  }
})