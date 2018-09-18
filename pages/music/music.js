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
    
    musicList:[{
      imgPic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000Emh4Z3O6nxD.jpg?max_age=2592000',
      musicName:'Mystery of love',
      musicAuthor:'Sufjan Stevens',
      src:'http://isure.stream.qqmusic.qq.com/C400000A0QR33hfJey.m4a?guid=1838491840&vkey=0512C1006E8A574A899745576D43B6D5CD2E6D6D07AB2355E5FF7DE9884A15A4417ABA1F7C1DB489BB62061BA748C90D09FB9C7F5F823A83&uin=0&fromtag=66'
    },{
      imgPic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000004D0DTt0FLULL.jpg?max_age=2592000',
      musicName:'杀死那个石家庄人',
      musicAuthor:'万能青年旅店',
      src:'http://221.228.218.17/amobile.music.tc.qq.com/C400003CYoWh1udBrn.m4a?guid=1838491840&vkey=CFFFBC116BFF2C1C48F56A9C7D2BD8D9917FC0EC57317A3185E92D000734E10B7D1E80D4F072269E23733F25A37AA530594C609535D2CE19&uin=0&fromtag=66'
    },{
      imgPic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFuFc3LIKmW.jpg?max_age=2592000',
      musicName:'Morning(Alubm Version)',
      musicAuthor:'Beck',
      src:'http://58.216.106.19/amobile.music.tc.qq.com/C400000bBjOP4Llsgb.m4a?guid=1838491840&vkey=BBF6BD4E0BB5CA2D03ABCA8FAECC32F30FAB6B2FA1CFF78381A550A151025FD4FDE3DB6BF326883D1EED6AF8C2105FB9ABDAA8CC31540A3D&uin=0&fromtag=66'
    }],
    nowSongIndex:0,
    nowSongInfo:{
      imgPic:'',
      musicName:'',
      musicAuthor:'',
      src:''
    },
    ifShowList:false,
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
    this.setNowSong(0)
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
  setNowSong(index){
    let data=this.data
    this.setData({
      nowSongIndex:index,
      nowSongInfo:data.musicList[index]
    })
    innerAudioContext.src = data.musicList[data.nowSongIndex].src
    setTimeout(() => {
      innerAudioContext.duration
      this.getMusicInfo()
    }, 500);
  },
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
      clearInterval(playMusic)
      playMusic = setInterval(() => {
        let ifpaused=innerAudioContext.paused
        if (ifpaused){
          clearInterval(playMusic);
          this.setData({
            ifPlay: !ifpaused
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
  },
  nextSong(){
    let next=(this.data.nowSongIndex+1)%this.data.musicList.length
    this.setNowSong(next)
    innerAudioContext.play()
    this.musicPlayControl()
  },
  lastSong(){
    let last=this.data.nowSongIndex==0?this.data.musicList.length-1:(this.data.nowSongIndex-1)
    this.setNowSong(last)
    innerAudioContext.play()
    this.musicPlayControl()
  },
  chooseSong(e){
    this.setNowSong(e.currentTarget.dataset.index)
    innerAudioContext.play()
    this.musicPlayControl()
  },
  showList(){
    this.setData({
      ifShowList:!this.data.ifShowList
    })
  }

})