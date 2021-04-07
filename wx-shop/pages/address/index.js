import Address from '../../models/address'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getAllAddress() {
    Address.getAllAddress({token: wx.getStorageSync('token')}).then(res => {
      if (res.code === 200) {
        this.setData({
          addressList: res.data
        })
      }
    })
  },

  edit(e) {
    let index = e.currentTarget.dataset.index
    let address = this.data.addressList[index]
    Object.assign(address, {isEdit: 1})
    wx.navigateTo({
      url: '/pages/address/create',
      success: function(res) {
        res.eventChannel.emit('address', address)
      }
    })
  },

  choiceAddress(e) {
    let index = e.currentTarget.dataset.index
    let address = this.data.addressList[index]
    let pages = getCurrentPages()
    let prev = pages[pages.length - 2]
    prev.setData({
      address
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  createAddress() {
    wx.navigateTo({
      url: './create',
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
    wx.setNavigationBarTitle({
      title: '地址管理',
    })
    this.getAllAddress()
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