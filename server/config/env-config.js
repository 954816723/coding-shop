const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  APP_PORT,
  JWT_KEY
} = process.env
