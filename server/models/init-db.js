const fs = require('fs')
const db = require('./mysql-db')

module.exports = () => {
  let files = fs.readdirSync(__dirname + '/')
  let jsFiles = files.filter(f => {
    return f.endsWith('-model.js')
  }, files)

  for (const f of jsFiles) {
    console.log(`import file ${f}...`)
    require(__dirname + '/' + f)
  }
  db.sync({alter: true})
}