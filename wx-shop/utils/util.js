import Auth from '../models/auth'

// 检查wx-session是否过期
const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

// 检查是否登录
const checkHasLogined = async () => {
  const token = wx.getStorageSync('token')
  if (!token) return false
  const sessionStatus = await checkSession()
  if (!sessionStatus) {
    wx.removeStorageSync('token')
    return false
  }
  const tokenStatus = await Auth.checkToken(token)
  if (tokenStatus.code !== 200) {
    wx.removeStorageSync('token')
    return false
  }
  return true
}

// 通过code登录获取openid
const wxlogin = async (page) => {
  wx.login({
    success: res => {
      let code = res.code
      Auth.login(code).then(res => {
        if (res.code === 200) {
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userId', res.data.userId)
          if (page) {
            page.onLoad()
          }
        } else {
          return
        }
      })
    }
  })
}

// 通过code登录获取openid
const wxregister = async (page) => {
  wx.login({
    success: res => {
      let code = res.code
      wx.getUserInfo({
        success: res => {
          let encryptedData = res.encryptedData
          let iv = res.iv
          Auth.register({ code, encryptedData, iv }).then(res => {
            if (res.code === 200) {
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('userId', res.data.userId)
              if (page) {
                page.onLoad()
              }
            } 
          })
        }
      })
    }
  })
}

module.exports = {
  checkSession,
  checkHasLogined,
  wxlogin,
  wxregister
}