// components/navMenu/navMenu.js
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
      windowHeight:500
  },
  /**
   * 组件的方法列表
   */
  attached(){
    let that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({windowHeight:res.windowHeight})
      }
    })
  },
  methods: {
    clickTap(e){
      this.setData({
        nowIndex:e.target.dataset.num
      })
    },
    handleScroll(e){
      this.triggerEvent('scollMain', { top:e.detail.scrollTop});
    }
  }
})
