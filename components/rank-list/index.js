// components/today-songs/index.js
const { fetchTopList } = require('../../api/index.js');

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
    fetchTopList().then((res)=>{

      this.setData({
        list:res.list
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
