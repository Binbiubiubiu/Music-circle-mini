// player/index.js
const { fetchSongDetail, fetchSongMp3 } = require('../../api/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    songs:{},
    currentTime:0,
    percent:0,
    isPlay:false,
    progressbarOffsetLeft:0,
    progressbarLength:0
  },
  audioPlay: function () {
    const {isPlay} =this.data;
    if (isPlay){
      this.audioCtx.pause()
    }else{
      this.audioCtx.play()
    }

    this.setData({
      isPlay: !isPlay
    })
  },
  handleTimeUpdate(){
  

    const {  currentTime, duration  } = this.audioCtx;
    const { currentTime:now,percent}=this.data;
    let changeObj={};
    if (~~currentTime> ~~(now/1000)){
      changeObj.currentTime = currentTime*1000;
    }

    const latestPercent = ~~(currentTime / duration * 100);
    if (latestPercent> percent) {
      changeObj.percent = latestPercent;
    }

    if(Object.keys(changeObj).length>0){
      // console.log(~~(currentTime / duration * 100))
      this.setData(changeObj)
    }
  
  },
  handleArchorChange(percent){
    if(percent==this.data.percent) return;
    this.setData({
      currentTime: ~~(percent/100 * this.data.detail.dt),
      percent: percent
    })
  },
  audioMove() {
    const { detail:{dt}, percent}=this.data;
    this.audioCtx.seek(~~(dt*percent/100/1000))
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetchSongDetail(options.id).then((res) => {
      this.setData({
        detail: res.songs[0]
      })
    })

    fetchSongMp3(options.id).then((res) => {
      this.setData({
        songs: res.data[0]
      })

      const audioCtx = wx.createInnerAudioContext()
      audioCtx.autoplay = false;
      audioCtx.src = this.data.songs.url;
      audioCtx.onTimeUpdate(this.handleTimeUpdate);
      this.audioCtx = audioCtx;
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.progress-bar').boundingClientRect( (rect)=> {
      // this.progressbarLength = rect.width;
      this.setData({
        progressbarOffsetLeft: rect.left,
        progressbarLength: rect.width
      })
      console.log(rect)
    }).exec();
    
    
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
    if (!!this.audioCtx){
      this.audioCtx.destroy()
    }
   
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