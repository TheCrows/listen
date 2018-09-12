//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    raiseTop:0,
    navData:[{
      name:'乐库',
      type:'music'
    }, {
      name: '推荐',
      type:'recommend'
    }, {
      name: '看点',
      type:'watch'
    }],
    ifShowSearch:false
  },
  
  onLoad: function () {
    
  },

  //methods
  handleScoll(msg){
    this.setData({
      raiseTop:msg.detail.top>160?160:msg.detail.top
    })
  },
  showSearch(){
    this.setData({
      ifShowSearch:true
    })
  },
  closeSearch(){
    this.setData({
      ifShowSearch:false
    })
  },
  methods:{
    
  }
})
