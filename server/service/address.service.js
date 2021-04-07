const addressModel = require('../models/address-model')

class AddressService {
  constructor() {}

  async getDefaultAddress(user_id) {
    let result = await addressModel.findOne({
      where: {
        user_id,
        is_default: 1
      }
    })
    if (result) {
      return result
    } else {
      result = await addressModel.findOne({
        where: {
          user_id
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      return result
    }
  }

  async getAllAddress(user_id) {
    let result = await addressModel.findAll({
      where: {
        user_id
      }
    })
    return result
  }

  async createAddress(ctx) {
    const { userName, userTel, userAddress, region, checked } = ctx.request.body
    const user_id = ctx.user.uid
    if (checked) {
      let res = await addressModel.findOne({
        where: {
          user_id,
          checked: 1
        }
      })
      console.log(res)
      if (res) {
         await addressModel.update({
          checked: 0
        }, {
          where: {
            user_id
          }
        })
      }
    }
    let result = await addressModel.create({
      user_id,
      user_name: userName, 
      tel: userTel, 
      detail_info: userAddress, 
      region, 
      is_default: checked ? 1 : 0
    })
    return result
  }

  async editAddress(ctx) {
    const { id, userName, userTel, userAddress, region, checked } = ctx.request.body
    const user_id = ctx.user.uid
    let result = await addressModel.update({ 
      user_name: userName, 
      user_id, 
      tel: userTel, 
      detail_info: userAddress, 
      region, 
      is_default: checked ? 1 : 1
    }, {
      where: {
        id
      }
    })
    return result
  }
}

module.exports = new AddressService()