const Router = require('koa-router')
const addressRouter = new Router({prefix: '/address'})
const { verifyToken } = require('../middleware/auth.middleware')
const { getAllAddress, createAddress, getDefaultAddress, editAddress } = require('../controllers/address.controller')

addressRouter.post('/all', verifyToken, getAllAddress)
addressRouter.post('/create', verifyToken, createAddress)
addressRouter.post('/default', verifyToken, getDefaultAddress)
addressRouter.post('/edit', verifyToken, editAddress)

module.exports = addressRouter