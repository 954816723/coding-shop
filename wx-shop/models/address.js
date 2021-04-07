import { HTTP } from './http'

class Address extends HTTP {
  constructor() {
    super()
  }

  getDefaultAddress(token) {
    return this.request('/address/default', token)
  }

  getAllAddress(data) {
    return this.request('/address/all', data)
  }
  
  createAddress (data) {
    return this.request('/address/create', data)
  }

  editAddress(data) {
    return this.request('/address/edit', data)
  }
}

module.exports = new Address()