const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const useRoutes = require('../routers')
const initDb = require('../models/init-db')
const errorHandler = require('../middleware/error.middleware');

const app = new Koa()
app.useRoutes = useRoutes

app.use(bodyparser())
app.useRoutes()
initDb()
app.on('error', errorHandler)

module.exports = app
