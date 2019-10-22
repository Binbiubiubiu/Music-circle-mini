// pages/mv/index.js
const { fetchMVDetail, fetchSingerDetail, fetchMvComment } = require('../../api/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    singerAvator:[],
    commentList:[],
  },
  fetchSingerDetail(id){
    fetchSingerDetail(id)
      .then((res) =>{
        console.log(res)
        if (!res.topicData)return;
        const pic = res.topicData[0].coverUrl
        let result = [...this.data.singerAvator];
        result.push(pic);
        this.setData({
          singerAvator: result,
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options ) {
    

    fetchMVDetail(options.id)
      .then((res) => {
        console.log(res)
        this.setData({
          detail: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.name  //修改title
        })
        let artists = res.data.artists;
        artists.forEach((item)=>{
          this.fetchSingerDetail(item.id);
        })
      })

    fetchMvComment(options.id)
      .then((res) => {
        console.log(res)
        this.setData({
          commentList: res.hotComments
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})