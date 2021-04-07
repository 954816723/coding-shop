const errorTypes = require('../lib/error-types')

const errorHandler = (error, ctx) => {
  let msg = error.message
  let status,
      message
  switch (msg) {
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = '无效token'
      break;
  
    default:
      status = 404
      message = 'Not Found'
      break;
  }
  ctx.status = status
  ctx.body = {
    code: status,
    msg: message
  }
}

module.exports = errorHandler