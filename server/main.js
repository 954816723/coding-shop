const app = require('./app/index')
const config = require('./config/env-config')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动!`)
})