// const { verify } = require('../lib/utils')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/env-config')

const verifyToken = async (ctx, next) => {
  let token = ctx.request.body.token
  try {
    let result = jwt.verify(token, JWT_KEY)
    ctx.user = result
    await next()
  } catch (error) {
    const err = new Error('UNAUTHORIZATION')
    return ctx.app.emit('error', err, ctx);
  }
}

module.exports = {
  verifyToken
}