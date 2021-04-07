import Address from '../../models/address'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    goodsList: [],
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('goodsList', (data) => {
      let totalPrice = 0
      data.forEach(item => {
        totalPrice += item.price * item.goods_total
      })
      this.setData({
        goodsList: data,
        totalPrice: totalPrice
      })
    })
    this.getDefaultAddress()
  },

  getDefaultAddress() {
    Address.getDefaultAddress({token: wx.getStorageSync('token')}).then(res => {
      if (res.code === 200) {
        this.setData({
          address: res.data
        })
      }
    })
  },

  toAddress() {
    wx.navigateTo({
      url: '/pages/address/index',
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