import Category from '../../models/category'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    goods: [],
    topCategories: [],
    childCategories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory()
  },

  getCategory() {
    Category.getAllCategory().then(res => {
      if (res.code === 200) {
        let result = res.data.filter(item => {
          return item.is_parent === 0
        })
        let current = result[0].id
        this.setData({
          categories: res.data,
          topCategories: result,
          currentCateId: current
        })
        this.getChildCategory()
      }
    })
  },

  getChildCategory() {
    let result = this.data.categories.filter(item => {
      return item.pid === this.data.currentCateId && item.is_parent === 1
    })
    this.setData({
      childCategories: result
    })
  },

  onCategoryClick(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      currentCateId: id
    })
    this.getChildCategory()
  },

  tapCategory(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/goods/index?id=${id}&name=${name}`,
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