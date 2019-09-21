// components/bannar/index.js
const { fetchBannar } = require('../../api/index.js');

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
    bannars: []
  },
  ready(){
    fetchBannar().then((res) => {
      this.setData({
        bannars: res.banners
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
