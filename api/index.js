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
module.exports = { 
  request,
  fetchBannar:()=>{
    return request(MockUrl+'/bannar.json','get');
  },
  fetchTodaySongs: () => {
    return request(MockUrl + '/today-songs.json', 'get');
  },
  fetchLatestSongs: () => {
    return request(MockUrl + '/latest-mv.json', 'get');
  },
  fetchNiceMv: () => {
    return request(MockUrl + '/nice-mv.json', 'get');
  },
  fetchNiceRadio: () => {
    return request(MockUrl + '/nice-radio.json', 'get');
  },
  fetchTopList: () => {
    return request(MockUrl + '/toplist-detail.json', 'get');
  }
};