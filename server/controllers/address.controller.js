const AddressService = require('../service/address.service')

class addressCtor {
  constructor() {}

  async getDefaultAddress(ctx, next) {
    let user_id = ctx.user.uid
    const result = await AddressService.getDefaultAddress(user_id)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async getAllAddress(ctx, next) {
    let user_id = ctx.user.uid
    const result = await AddressService.getAllAddress(user_id)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async createAddress(ctx, next) {
    const result = await AddressService.createAddress(ctx)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }

  async editAddress(ctx, next) {
    const result = await AddressService.editAddress(ctx)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: result,
      msg: ''
    }
  }
}

module.exports = new addressCtor()