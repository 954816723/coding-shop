const DataTypes = require('sequelize')
const db = require('./mysql-db')

module.exports = db.define('address', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  region: {
    type: DataTypes.JSON,
    allowNull: false
  },
  detail_info: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  is_default: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'wx_address',
  timestamps: true
})