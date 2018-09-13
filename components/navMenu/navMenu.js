// components/navMenu/navMenu.js
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    navData:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
      nowIndex:0,
      windowHeight:500,
  },
  /**
   * 组件的方法列表
   */
  attached(){
    let that=this
    that.setData({windowHeight:app.globalData.height})
    
  },
  methods: {
    clickTap(e){
      this.setData({
        nowIndex:e.target.dataset.num
      })
    },
    handleScroll(e){
      this.triggerEvent('scollMain', { top:e.detail.scrollTop});
    },
    changePage(e){
      this.setData({
        nowIndex:e.detail.current
      })
    },
    updateInfo(e){
      console.log(e);
      
    }
  }
})
