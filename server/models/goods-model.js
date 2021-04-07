const DataTypes = require('sequelize')
const db = require('./mysql-db')

const goodsModel = db.define('wx_goods', {
  id: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  pid: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    comment: '分类'
  },
  category_id: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    comment: '所属分类'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '商品名称'
  },
  picUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片'
  },
  desc: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '商品描述'
  },
  average_cost: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    comment: '成本'
  },
  original_price: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    comment: '原价'
  },
  current_price: {
    type: DataTypes.INTEGER(20),
    allowNull: true,
    comment: '现价'
  },
  publish_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '状态 1-正常，2-下架，3-删除'
  }
}, {
  freezeTableName: true,
  timestamps: true
})

const goodsDetailModel = db.define('wx_goods_detail', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true
})

const goodsPicModel = db.define('goods_pic', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  picUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'wx_goods_pic',
  timestamps: true
})

const goodsKeyModel = db.define('goods_key', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'wx_goods_key',
  timestamps: true
})

const goodsSkuModel =db.define('goods_sku', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  key_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'wx_goods_sku',
  timestamps: true
})

const goodsStockModel = db.define('goods_skudata', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  sku_ids: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull:false
  }
}, {
  tableName: 'wx_goods_skudata',
  timestamps: true
})

const shopCarModel = db.define('shop_car', {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  goods_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  sku_str: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  sku_data_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  goods_total: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  goods_sku_ids: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'wx_shop_car',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['goods_sku_ids']
    }
  ]
})

module.exports = {
  goodsModel,
  goodsDetailModel,
  goodsPicModel,
  goodsKeyModel,
  goodsSkuModel,
  goodsStockModel,
  shopCarModel
}