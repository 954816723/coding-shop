const Router = require('koa-router')
const loginRouter = new Router({prefix: '/user'})
const { login, register, verify } = require('../controllers/auth.controller')
const { verifyToken } = require('../middleware/auth.middleware')

loginRouter.post('/login', login)
loginRouter.post('/register', register)
loginRouter.post('/verifyToken', verifyToken, verify)

module.exports = loginRouter