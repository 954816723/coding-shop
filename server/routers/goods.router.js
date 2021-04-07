const Router = require('koa-router')
const goodsRouter = new Router({prefix: '/goods'})
const { getGoodsById, getGoodsDetail, getGoodsSku, addCar, getCarNum, getCarList, deleteCarGoods } = require('../controllers/goods.controller')
const { verifyToken } = require('../middleware/auth.middleware')

goodsRouter.post('/', getGoodsById)
goodsRouter.post('/detail', getGoodsDetail)
goodsRouter.post('/sku', getGoodsSku)
goodsRouter.post('/car/add', verifyToken, addCar)
goodsRouter.post('/car/num', verifyToken, getCarNum)
goodsRouter.post('/car/list', verifyToken, getCarList)
goodsRouter.post('/car/del', verifyToken, deleteCarGoods)

module.exports = goodsRouter