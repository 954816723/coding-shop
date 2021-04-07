const Router = require("koa-router")
const categoryRouter = new Router({prefix: '/category'})
const { getCategory } = require('../controllers/category.controller')

categoryRouter.get('/all', getCategory)

module.exports = categoryRouter