const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/env-config')


const generateToken = (uid) => {
  let token = jwt.sign({
    uid
  }, JWT_KEY, {})
  return token
}

const verify = (token) => {
  let result = jwt.verify(token, JWT_KEY)
  return result
}

module.exports = {
  generateToken,
  verify
}