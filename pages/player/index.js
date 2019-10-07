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
    isPlay:false
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
  audio14: function () {
    this.audioCtx.seek(14)
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
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
    
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