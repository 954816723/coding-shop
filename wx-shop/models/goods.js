import { HTTP } from './http'

class Goods extends HTTP {
  constructor() {
    super()
  }

  getGoodsById(data) {
    return this.request('/goods',data)
  }

  getGoodsDetail(id) {
    return this.request('/goods/detail', {id})
  }

  getGoodsSku(id) {
    return this.request('/goods/sku', {id})
  }

  addCar(params) {
    return this.request('/goods/car/add', params)
  }

  getCarNum(params) {
    return this.request('/goods/car/num', params)
  }

  getCarList(params) {
    return this.request('/goods/car/list', params)
  }

  delCarGoods(params) {
    return this.request('/goods/car/del', params)
  }
}

module.exports = new Goods()