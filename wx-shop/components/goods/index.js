import Goods from '../../models/goods'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {
      type: Number
    },
    cid: {
      type: Number
    },
    limit: {
      type: Number,
      value: 10
    }
  },

  observers: {
    pid: function(newV, oldV) {
      if (newV !== oldV) {
        this.setData({
          goods: [],
          size: 0,
          isEmpty: false,
          isLoding: false,
          isMaxL: false,
          count: 0
        })
      }
      this.setData({
        id: newV
      })
      this.getGoodsById(0)
    },
    cid: function(newV, oldV) {
      console.log('ss:' +  newV)
      if (newV !== oldV) {
        this.setData({
          goods: [],
          size: 0,
          isEmpty: false,
          isLoding: false,
          isMaxL: false,
          count: 0
        })
      }
      this.setData({
        id: newV
      })
      this.getGoodsById(1)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    goods: [],
    size: 0,
    isEmpty: false,
    isLoding: false,
    isMaxL: false,
    count: 0
  },

  lifetimes: {
    ready() {
      
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    getMore(type) {
      let num = ++this.data.size
      this.setData({
        size: num
      })
      this.getGoodsById(type)
    },
    getGoodsById(type) {
      if (this.data.isMaxL || this.data.isEmpty) {
        return
      }
      this.setData({
        isLoding: true
      })
      let size = this.data.size
      let limit = this.data.limit
      let data = {
        id: this.data.id,
        type,
        size,
        limit
      }
      Goods.getGoodsById(data).then(res => {
        this.setData({
          isLoding: false
        })
        if (res.code == 200) {
          if (res.data.count <= 0) {
            this.setData({
              isEmpty: true
            })
            return
          } else {
            if (this.data.isMaxL) {
              return
            } else {
              let temp = this.data.goods.concat(res.data.data)
              let isMaxL
              temp.length >= res.data.count
                 ? isMaxL = true
                 : isMaxL = false
              this.setData({
                goods: temp,
                count: res.data.count,
                isMaxL
              })
            }
          }
        }
      })
    },
    tapGoods(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/goods-detail/index?id=${id}`,
      })
    }
  }
})
