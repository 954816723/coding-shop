const GoodsService = require('../service/goods.service')

class Goods {
  // 根据分类获取商品表
  async getGoodsById(ctx, next) {
    let {id, type, size, limit} = ctx.request.body
    if (type === 0 || type === 1) {
      let result = await GoodsService.getGoodsById(id, type, size, limit)
      ctx.body = {
        code: 200,
        data: result,
        msg: ''
      }
    } else {
      const err = new Error('UNAUTHORIZATION')
      return ctx.app.emit('error', err, ctx);
    }
  }

  // 根据id获取商品详情
  async getGoodsDetail(ctx, next) {
    let id = ctx.request.body.id
    let result = await GoodsService.getGoodsDetail(id)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async getGoodsSku(ctx, next) {
    let id = ctx.request.body.id
    let result = await GoodsService.getGoodsSku(id)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async addCar(ctx, next) {
    let { goods_id, sku_str, goods_total, sku_data_id, goods_sku_ids } = ctx.request.body
    let uid = ctx.user.uid
    let result = await GoodsService.addCar({ uid, goods_id, sku_str, goods_total, sku_data_id, goods_sku_ids })
    if (result) {
      ctx.status = 200
      ctx.body = {
        code: 200,
        data: result,
        msg: ''
      }
    } else {
      const err = new Error('UNAUTHORIZATION')
      return ctx.app.emit('error', err, ctx);
    }
  }

  async getCarNum(ctx, next) {
    let uid = ctx.user.uid
    let result = await GoodsService.getCarNum(uid)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async getCarList(ctx, next) {
    let uid = ctx.user.uid
    let result = await GoodsService.getCarList(uid)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async deleteCarGoods(ctx, next) {
    let id = ctx.request.body.id
    let result = await GoodsService.deleteCarGoods(id)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }
}

module.exports = new Goods()