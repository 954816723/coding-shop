const Category = require('../models/category-model')

class CategoryService {
  async getAll() {
    let result = await Category.findAll()
    return result
  }
}

module.exports = new CategoryService()