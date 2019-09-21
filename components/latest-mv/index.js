// components/today-songs/index.js
const { fetchLatestSongs } = require('../../api/index.js');

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
    fetchLatestSongs().then((res)=>{
     
      this.setData({
        list: res.data
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
