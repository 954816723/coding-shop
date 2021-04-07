import { HTTP } from './http'

class Auth extends HTTP {
  constructor() {
    super()
  }

  /**
   * 验证token合法性
   * @param {String} token 本地token值
   */
  checkToken(token) {
    return this.request('/user/verifyToken', {token})
  }

  /**
   * 
   * @param {Object} code 
   * @returns {Object} token, userId
   */
  login(code) {
    return this.request('/user/login', {code})
  }

  /**
   * 获取token
   * @param {Object}
   * @returns {Object} token, userId
   */
  register(data) {
    return this.request('/user/register', data)
  }
}

module.exports = new Auth()