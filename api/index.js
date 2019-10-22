const API_BASE_URL = 'http://localhost:3000'

const checkHttp = url => /^(http:\/\/|https:\/\/)/.test(url);

const request = (url, method, data) => {
  let _url = checkHttp(url) ? url : API_BASE_URL+url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': method == 'get' ? 'application/x-www-form-urlencoded' : 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}
const MockUrl ="http://192.168.3.101:5500";
const prodUrl = "http://192.168.3.100:3000";
const isDev=false;
module.exports = { 
  request,
  fetchBannar:()=>{
    return isDev ? request(MockUrl + '/bannar.json', 'get') : request(prodUrl + '/banner?type=1', 'get');
  },
  fetchTodaySongs: () => {
    return isDev ? request(MockUrl + '/today-songs.json', 'get') : request(prodUrl + '/personalized?limit=6', 'get');
  },
  fetchLatestSongs: () => {
    return isDev ? request(MockUrl + '/latest-mv.json', 'get') : request(prodUrl + '/mv/first?limit=10', 'get');
  },
  fetchNiceMv: () => {
    return isDev ? request(MockUrl + '/nice-mv.json', 'get') : request(prodUrl + '/personalized/mv', 'get');
  },
  fetchNiceRadio: () => {
    return isDev ? request(MockUrl + '/nice-radio.json', 'get') : request(prodUrl + '/personalized/djprogram', 'get');
  },
  fetchTopList: () => {
    return isDev ? request(MockUrl + '/toplist-detail.json', 'get') : request(prodUrl + '/toplist/detail', 'get');
  },
  fetchSongSheet: (id) => {
    return isDev ? request(MockUrl + '/playlist-detail.json?id=' + id, 'get') : request(prodUrl + '/playlist/detail?id='+id, 'get');
  },
  fetchSongDetail: (id) => {
    return isDev ? request(MockUrl + '/song-detail.json?ids=' + id, 'get') : request(prodUrl + '/song/detail?ids=' + id, 'get');
  },
  fetchSongMp3: (id) => {
    return isDev ? request(MockUrl + '/song-mp3.json?id=' + id, 'get') : request(prodUrl + '/song/url?id=' + id, 'get');
  },
  // mv 详情
  fetchMVDetail: (id) => {
    return isDev ? request(MockUrl + '/song-mp3.json?id=' + id, 'get') : request(prodUrl + '/mv/detail?mvid=' + id, 'get');
  },
  // 歌手详情
  fetchSingerDetail: (id) => {
    return isDev ? request(MockUrl + '/song-mp3.json?id=' + id, 'get') : request(prodUrl + '/artist/desc?id=' + id, 'get');
  },
  // 歌手详情
  fetchMvComment: (id) => {
    return isDev ? request(MockUrl + '/song-mp3.json?id=' + id, 'get') : request(prodUrl + '/comment/mv?id=' + id, 'get');
  },
};