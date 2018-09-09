// components/navMenu/navMenu.js
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
    navData:[{
      name:'乐库'
      }, {
        name: '推荐'
      }, {
        name: '选择'
      }, {
        name: '看点'
      }],
      nowIndex:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTap(e){
      this.setData({
        nowIndex:e.target.dataset.num
      })
    }
  }
})
