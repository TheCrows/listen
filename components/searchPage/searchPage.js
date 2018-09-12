// components/searchPage/searchPage.js
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
    ifFirstIn:false,
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
  attached(){
    let that=this
    this.setData({
      ifFirstIn:true
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeSearch(){
      this.triggerEvent('closeSearch');
      
    }
  }
})
