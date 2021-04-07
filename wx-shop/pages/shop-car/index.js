import { wxregister } from '../../utils/util'
import { checkHasLogined } from '../../utils/util'
import Goods from '../../models/goods'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxLogined: true,
    currentCateId: 1,
    hasGoods: false,
    isSelectAll: false,
    totalPrice: 0,
    carList: [],
    selectGoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.watch(this, {
      selectGoods: (val) => {
        let price = 0
        val.forEach(item => {
          price += item.goods_skudatum.price * item.goods_total
        })
        this.setData({
          totalPrice: price
        })
      },
      isSelectAll: val => {
        if (val) {
          let temp = JSON.parse(JSON.stringify(this.data.carList))
          temp.forEach(item => {
            item.checked = true
          })
          this.setData({
            selectGoods: temp,
            carList: temp
          })
        } else {
          this.data.carList.forEach(item => {
            item.checked = false
          })
          this.setData({
            selectGoods: [],
            carList: this.data.carList
          })
        }
      }
    })
  },

  onChange(e) {
    let index = e.currentTarget.dataset.index,
        isSelectAll = false
    this.data.carList[index].checked = e.detail
    let temp = JSON.parse(JSON.stringify(this.data.selectGoods))
    if (e.detail) {
      temp.push(this.data.carList[index])
      if (temp.length === this.data.carList.length) {
        isSelectAll = true
      }
    } else {
      let idx
      temp.forEach((item, index) => {
        if (item.id === this.data.carList[index].id) {
          idx = index
        }
      })
      temp.splice(idx, 1)
    }
    this.setData({
      carList: this.data.carList,
      selectGoods: temp,
      isSelectAll
    })
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

  getShoppingCarInfo() {
    Goods.getCarList({token: wx.getStorageSync('token')}).then(res => {
      if (res.code === 200) {
        let temp = res.data
        let hasGoods = false
        temp.forEach(item => {
          item.checked = false
        })
        if (res.data.length > 0) {
          hasGoods = true
        }
        this.setData({
          carList: temp,
          hasGoods
        })
      }
    })
  },

  selectAll(e) {
    this.setData({
      isSelectAll: e.detail
    })
  },

  onClickButton(e) {
    if (this.data.selectGoods.length === 0) return
    let goodsList = []
    this.data.selectGoods.forEach(item => {
      let obj = {
        car_id: item.id,
        current_price: item.wx_good.current_price,
        desc: item.wx_good.desc,
        goods_id: item.goods_id,
        goods_total: item.goods_total,
        name: item.wx_good.name,
        original_price: item.wx_good.original_price,
        picUrl: item.wx_good.picUrl,
        price: item.goods_skudatum.price,
        sku_data_id: item.sku_data_id,
        sku_ids: item.goods_sku_ids,
        sku_str: item.sku_str,
        stock: item.goods_skudatum.stock
      }
      goodsList.push(obj)
    })
    wx.navigateTo({
      url: '/pages/goods-order/index',
      success: (res) => {
        res.eventChannel.emit('goodsList', goodsList)
      }
    })
  },

  delGoods(e) {
    let id = e.currentTarget.dataset.id
    Goods.delCarGoods({
      id,
      token: wx.getStorageSync('token')
    }).then(res => {
      console.log(res)
      if (res.code === 200) {
        this.getShoppingCarInfo()
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
    checkHasLogined().then(res => {
      this.setData({
        wxLogined: res
      })
      if (res) {
        this.getShoppingCarInfo()
      } 
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isSelectAll: false,
      selectGoods: []
    })
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
    this.selectComponent('#goodsComp').getMore(0)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})