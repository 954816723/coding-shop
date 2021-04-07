import { CONFIG } from '../config'

class HTTP {
  constructor() {
    this.baseUrl = CONFIG.APP_BASE_URL
  }

  request(url, data, method = 'post') {
    let _url = this.baseUrl + url
    let header = {
      'content-type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: _url,
        method,
        header,
        data,
        success: res => {
          resolve(res.data)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  }
}

module.exports = {
  HTTP
}