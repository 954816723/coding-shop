import { HTTP } from './http'

class Category extends HTTP {
  constructor() {
    super()
  }
  getAllCategory() {
    return this.request('/category/all', '', 'get')
  }
}

module.exports = new Category()