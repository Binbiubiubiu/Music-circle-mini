// components/today-songs/index.js
const { fetchNiceRadio } = require('../../api/index.js');

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
    list:[]
  },
  ready(){
    fetchNiceRadio().then((res)=>{
      this.setData({
        list:res.result
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
