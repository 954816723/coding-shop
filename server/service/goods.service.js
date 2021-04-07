const { Op } = require('sequelize')
const {goodsModel, goodsDetailModel, goodsPicModel, goodsKeyModel, goodsSkuModel, goodsStockModel, shopCarModel} = require('../models/goods-model')

class GoodsService {
  async getGoodsById(id, type, size, limit) {
    let params
    if (type == 0) {
      params = {
        pid: id,
        publish_status: {
          [Op.eq]: 1
        }
      }
    } else {
      params = {
        category_id: id,
        publish_status: {
          [Op.eq]: 1
        }
      }
    }
    let list = await goodsModel.findAll({
      where: params,
      offset: size*limit,
      limit
    })
    let count = await goodsModel.count({
      where: params
    })
    let result = {
      data: list,
      count
    }
    return result
  }

  async getGoodsDetail(id) {
    goodsDetailModel.hasMany(goodsPicModel, {
      foreignKey: 'goods_id',
      sourceKey: 'goods_id'
    })
    let detail = await goodsDetailModel.findOne({
      where: {
        goods_id: id
      },
      include: {
        model: goodsPicModel,

      }
    })
    return detail
  }
  
  async getGoodsSku(id) {
    goodsModel.hasMany(goodsKeyModel, {
      foreignKey: 'goods_id',
      sourceKey: 'id'
    })
    goodsKeyModel.hasMany(goodsSkuModel, {
      foreignKey: 'key_id',
      sourceKey: 'id'
    })
    goodsModel.hasMany(goodsStockModel, {
      foreignKey:'goods_id',
      sourceKey: 'id'
    })
    let goods = await goodsModel.findOne({
      where: {
        id
      },
      include: [{
        model: goodsKeyModel,
        include: [goodsSkuModel],
        required: false 
      }, {
        model: goodsStockModel,
      }]
    })
    return goods
  }

  async addCar(params) {
    let { uid, goods_id, sku_str, goods_total, sku_data_id, goods_sku_ids } = params
    let result = await shopCarModel.findOne({
      where: {
        uid,
        goods_id,
        goods_sku_ids
      }
    })
    if (result) {
      let total = result.goods_total + goods_total
      let res = await shopCarModel.update({
        goods_total: total
      }, {
        where: {
          uid,
          goods_sku_ids
        }
      })
      return res.length > 0 ? true : false
    } else {
      let res = await shopCarModel.create({
        uid, goods_id, sku_str, goods_total, sku_data_id, goods_sku_ids
      })
      return res.id ? true : false
    }
  }

  async getCarNum(uid) {
    let result = await shopCarModel.count({
      where: {
        uid
      }
    })
    return result
  }

  async getCarList(uid) {
    shopCarModel.belongsTo(goodsModel, {
      foreignKey: 'goods_id',
      sourceKey: 'id'
    })
    shopCarModel.belongsTo(goodsStockModel, {
      foreignKey: 'sku_data_id',
      sourceKey: 'id'
    })
    let result = await shopCarModel.findAll({
      where: {
        uid
      },
      include: [{
        model: goodsModel
      }, {
        model: goodsStockModel
      }]
    })
    return result
  }

  async deleteCarGoods(id) {
    let result = await shopCarModel.destroy({
      where: {
        id
      }
    })
    return result
  }
}

module.exports = new GoodsService()