import Goods from '../../models/goods'
import { checkHasLogined } from '../../utils/util'
import { wxregister } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    goodsDetail: {},
    pics: [],
    content: '',
    show: false,
    skuList: [],
    skuData: [],
    num: 1,
    maxNum: 99,
    stock: 0,
    selectSpec: {},
    selectStr: '',
    goodsNum: '',
    select_sku_ids: '',
    showLogin: false,
    wxLogined: true,
    currentSku: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    checkHasLogined().then(res => {
      this.setData({
        wxLogined: res
      })
    })
    this.setData({
      goodsId: options.id,
    })
    this.getGoodsDetail()
    this.getGoodsSku()
  },

  login(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none'
      })
      return
    }
    wxregister(this)
  },

  choiceSku() {
    this.setData({
      show: !this.data.show
    })
  },

  getGoodsDetail() {
    Goods.getGoodsDetail(this.data.goodsId).then(res => {
      if (res.code === 200 && res.data) {
        this.setData({
          content: res.data.content,
          pics: res.data.goods_pics
        })
      }
    })
  },

  getGoodsSku() {
    Goods.getGoodsSku(this.data.goodsId).then(res => {
      if (res.code === 200) {
        let skuList = res.data.goods_keys
        let spec = {}
        skuList.map(item => {
          item.goods_skus.map(val => {
            val.selected = false,
            val.disabled = false
          })
          spec[item.id] = ''
        })
        let skuData = res.data.goods_skudata.filter(item => {
          return item.stock > 0
        })
        this.setData({
          goodsDetail: {
            current_price: res.data.current_price,
            desc: res.data.desc,
            name: res.data.name,
            picUrl: res.data.picUrl,
            original_price: res.data.original_price
          },
          selectSpec: spec,
          skuList,
          skuData
        })
      }
    })
  },

  tapSku(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let disabled = e.currentTarget.dataset.disabled
    if (disabled) return
    let selectSpec = this.data.selectSpec
    if (selectSpec[index] === id) {
      selectSpec[index] = ''
    } else {
      selectSpec[index] = id
    }
    let str = ''
    Object.keys(selectSpec).forEach(item => {
      let cur = selectSpec[item]
      this.data.skuList.forEach(val => {
        if (val.id == item) {
          val.goods_skus.forEach(v => {
            if (v.id == cur) {
              if (str === '') {
                str = v.name
              } else {
                str += ` ${v.name}`
              }
            }
          })
        }
      })
    })
    let currentSku = null
    if (str.split(' ').length === this.data.skuList.length) {
      let arr = []
      Object.keys(this.data.selectSpec).forEach(item => {
        let cur = this.data.selectSpec[item]
        arr.push(~~cur)
      })
      let strs = arr.sort(function(a,b) {
        return a - b
      }).join(',')
      this.data.skuData.forEach(item => {
        let temp = item.sku_ids.split(',').map(val => {
          return ~~val
        }).sort(function(a,b) {
          return a - b
        }).join(',')
        if (temp === strs) {
          currentSku = item
        }
      })
    }
    this.setData({
      selectSpec,
      selectStr: str,
      currentSku
    })
    let temp = this.data.skuList
    temp.forEach(item => {
      item.goods_skus.forEach(val => {
        val.disabled = this.getDisabled(item.id, val.id)
      })
    })
    this.setData({
      skuList: temp
    })
  },

  getDisabled(index, id) {
    let copySelectSpec = JSON.parse(JSON.stringify(this.data.selectSpec))
    copySelectSpec[index] = id
    let flag = this.data.skuData.some(item => {
      let i = 0
      for (const key in copySelectSpec) {
        if (copySelectSpec.hasOwnProperty(key)) {
          const ele = copySelectSpec[key];
          const arr = item.sku_ids.split(',')
          if (ele !== '' && arr.includes(`${ele}`)) {
            i++
          } else if (ele === '') {
            i++
          }
        }
      }
      return i === this.data.skuList.length
    })
    // console.log(flag)
    return !flag
  },

  isSelectAll() {
    let select = this.data.selectSpec
    let name = ''
    for (const key in select) {
      if (select.hasOwnProperty(key)) {
        const cur = select[key]
        if (cur === '') {
          this.data.skuList.forEach(item => {
            if (item.id == key) {
              name = item.name
            }
          })
          break
        }
      }
    }
    if (name === '') {
      return true
    } else {
      wx.showToast({
        title: `请选择 ${name}`,
        icon: 'none'
      })
      return false
    }
  },

  changeNum(e) {
    this.setData({
      num: e.detail
    })
  },
  // 获取库存
  getStock() {
    let arr = [],
        num = this.data.num,
        stock
    Object.keys(this.data.selectSpec).forEach(item => {
      let cur = this.data.selectSpec[item]
      arr.push(~~cur)
    })
    let str = arr.sort(function(a,b) {
      return a - b
    }).join(',')
    this.data.skuData.forEach(item => {
      let temp = item.sku_ids.split(',').map(val => {
        return ~~val
      }).sort(function(a,b) {
        return a - b
      }).join(',')
      if (temp === str) {
        stock = item.stock
      }
    })
    if (num > stock) {
      this.setData({
        stock,
        num: stock,
      })
      wx.showToast({
        title: `库存仅剩${stock}件`,
        icon: 'none'
      })
      return false
    } else {
      this.setData({
        select_sku_ids: str,
        stock
      })
      return true
    }
  },

  addCarBefore() {
    checkHasLogined().then(res => {
      if (res) {
        this.addCar()
      } else {
        this.setData({
          showLogin: true
        })
      }
    })
  },
  
  addCar() {
    if (this.isSelectAll()) {
      if (this.getStock()) {
        let goodsNum = ~~this.data.goodsNum + this.data.num
        let params = {
          token: wx.getStorageSync('token'),
          goods_id: this.data.goodsId,
          sku_str: this.data.selectStr,
          goods_total: this.data.num,
          sku_data_id: this.data.currentSku.id,
          goods_sku_ids: this.data.select_sku_ids
        }
        Goods.addCar(params).then(res => {
          if (res.code === 200) {
            getApp().globalData.goodsNum = goodsNum
            this.setData({
              goodsNum,
              show: !this.data.show
            })
          } else {
            wx.showToast({
              title: '添加失败,稍后再试',
              icon: 'none'
            })
            this.setData({
              show: !this.data.show
            })
          }
        })
      } 
    } 
  },

  buyGoods() {
    if (this.isSelectAll()) {
      if (this.getStock()) {
        let goodsList = []
        let detail = this.data.goodsDetail
        let currentSku = this.data.currentSku
        let obj = {
          sku_str: this.data.selectStr,
          goods_total: this.data.num,
          sku_data_id: currentSku.id,
          stock: currentSku.stock,
          price: currentSku.price,
          sku_ids: currentSku.sku_ids,
          goods_id: currentSku.goods_id
        }
        Object.assign(detail, obj)
        goodsList.push(detail)
        wx.navigateTo({
          url: '/pages/goods-order/index',
          success: (res) => {
            res.eventChannel.emit('goodsList', goodsList)
          }
        })
      } 
    } 
  },

  getCarNum() {
    Goods.getCarNum({token: wx.getStorageSync('token')}).then(res => {
      if (res.code === 200) {
        this.setData({
          goodsNum: res.data
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCarNum()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})