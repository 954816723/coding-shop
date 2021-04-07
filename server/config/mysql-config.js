const config = {
  database: 'kucoding',
  username: 'root',
  password: 'chenwei19921020',
  host: 'localhost',
  port: 3306,
  define: {
    freezeTableName: true,
    timestamps: true,
    paranoid: false
  },
  dialect: 'mysql',
  timezone: '+08:00'
}

module.exports = config