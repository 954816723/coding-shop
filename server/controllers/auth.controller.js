const axios = require('axios')
const authService = require('../service/auth.service')
const { WX_OPENID_URL, WX_APPID, WX_SECRET } = require('../config/config')
const WXBizDataCrypt = require('../lib/WXBizDataCrypt')
const { generateToken } = require('../lib/utils')

class LoginController {
  async login(ctx, next) {
    let code = ctx.request.body.code
    let wxRes = await axios({
      url: WX_OPENID_URL,
      method: 'get',
      params: {
        appid: WX_APPID,
        secret: WX_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    if (wxRes.status === 200) {
      let { openid, session_key: sessionKey } = wxRes.data
      let result = await authService.findById(openid)
      if (result) {
        let token = generateToken(result.id)
        ctx.body = {
          code: 200,
          data: {
            token,
            userId: result.id
          },
          msg: 'ok'
        }
      } else {
        ctx.body = {
          code: 404,
          data: null,
          msg: '未注册用户'
        }
      }
    }
  }

  async register(ctx, next) {
    let code = ctx.request.body.code
    let encryptedData = ctx.request.body.encryptedData
    let iv = ctx.request.body.iv
    let wxRes = await axios({
      url: WX_OPENID_URL,
      method: 'get',
      params: {
        appid: WX_APPID,
        secret: WX_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    if (wxRes.status === 200) {
      // 获取openid, session_key
      let { openid, session_key: sessionKey } = wxRes.data
      // 解密用户数据
      let pc = new WXBizDataCrypt(WX_APPID, sessionKey)
      let userInfo = pc.decryptData(encryptedData , iv)
      Object.assign(userInfo, {sessionKey})
      // 查询openid是否已存在
      let result = await authService.findById(openid)
      if (result) {
        // 已存在用户
        // 更新数据库信息
        await authService.update(userInfo, openid)
      } else {
        // 新用户
        // 信息存据存库
        result = await authService.login(userInfo)
      }
      // 生成jwt
      let token = generateToken(result.id)
      ctx.status = 200
      ctx.body = {
        code: 200,
        data: {
          token,
          userId: result.id
        },
        msg: 'ok'
      }
    }
  }

  async verify(ctx, next) {
    let user = ctx.user
    ctx.body = {
      code: 200,
      data: user,
      msg: 'ok'
    }
  }

}

module.exports = new LoginController()