const CategoryService = require('../service/category.service')

class CategoryController {
  async getCategory(ctx, next) {
    let result = await CategoryService.getAll()
    ctx.body = {
      code: 200,
      data: result,
      msg: 'ok'
    }
  }
}

module.exports = new CategoryController()