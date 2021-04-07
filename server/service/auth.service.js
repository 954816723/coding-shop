const User = require('../models/user-model')

class AuthService {
  async login(userInfo) {
    let result = await User.create(userInfo)
    return result
  }
  async findById(openid) {
    let result = await User.findOne({
      where: {
        openid
      }
    })
    return result
  }
  async update(userInfo, openid) {
    let result = await User.update(userInfo, {
      where: {
        openid
      }
    })
    return result[0].length > 0 ? true : false
  }
}

module.exports = new AuthService()