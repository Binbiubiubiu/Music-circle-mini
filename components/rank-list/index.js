// components/today-songs/index.js
const { fetchTopList } = require('../../api/index.js');
const computedBehavior = require('miniprogram-computed');

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [computedBehavior],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },
  computed: {
    gfRank(data) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return data.list&&data.list.length?data.list.slice(0,4):[];
    },
    tjRank(data) {
      return data.list && data.list.length ? data.list.slice(4, 10) : [];
    },
    qqRank(data) {
      return data.list && data.list.length ? data.list.slice(10, 16) : [];
    },
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
