const DataTypes = require('sequelize')
const db = require('./mysql-db')

module.exports = db.define('wx_category', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_parent: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: true
})