// pages/index/musicLibrary/musicLibrary.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    topButtonList:[{
      icon:'/static/icons/recommend.svg',
      name:'每日推荐',
      target:'/pages/secondPage/recommend'
    },{
      icon:'/static/icons/newmusic.svg',
      name:'新歌新碟',
      target:'/pages/secondPage/recommend'
    },{
      icon:'/static/icons/ranklist.svg',
      name:'排行榜',
      target:'/pages/secondPage/recommend'
    },{
      icon:'/static/icons/broadcast.svg',
      name:'音乐电台',
      target:'/pages/secondPage/recommend'
    }],
    tagData:[{
      name:'Ed Shreen',
      target:'/pages/secondPage/recommend'
    },{
      name:'节奏布鲁斯',
      target:'/pages/secondPage/recommend'
    },{
      name:'Sufjan Stevens',
      target:'/pages/secondPage/recommend'
    },{
      name:'Beyonce',
      target:'/pages/secondPage/recommend'
    },{
      name:'日本动漫游戏 Japanese ACG',
      target:'/pages/secondPage/recommend'
    },{
      name:'万能青年旅店',
      target:'/pages/secondPage/recommend'
    },{
      name:'抒情',
      target:'/pages/secondPage/recommend'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
