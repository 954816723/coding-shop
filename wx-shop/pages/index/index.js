import Category from '../../models/category'
import Goods from '../../models/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    categories: [],
    scrollCate: {},
    hasAd: false,
    advert: null,
    active: 0,
    currentCateId: null,
    goods: [],
    slideWidth: 0,
    ratio: 0,
    marginLeft: 0,
    // size: 0,
    // limit: 10,
    isEmpty: false,
    // isLoding: false,
    // isMaxL: false,
    // count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners()
    this.getCategory()
    this.getAd()
  },

  getBanners() {
    this.setData({
      banners: [
        {
          id: 0,
          userId: 1,
          picUrl: '../../static/images/banner/banner1.png'
        },{
          id: 1,
          userId: 1,
          picUrl: '../../static/images/banner/banner2.png'
        }
      ]
    })
  },

  getCategory() {
    Category.getAllCategory().then(res => {
      if (res.code === 200) {
        let result = res.data.filter(item => {
          return item.is_parent === 0
        })
        let current = result[0].id
        let temp = {
          first: [],
          second: []
        }
        res.data.forEach((item, index) => {
          if (index < 8) {
            temp.first.push(item)
          } else if (index >= 8 && index < 16) {
            temp.second.push(item)
          }
        })
        this.setData({
          categories: res.data,
          scrollCate: temp,
          currentCateId: current
        })
        this.initSlide()
      }
    })
  },

  initSlide() {
    let _totalLength = this.data.scrollCate.first.length * 140
    let slideWidth = 700 / _totalLength * 100
    let ratio = 100 / _totalLength * (750 / wx.getSystemInfoSync().windowWidth)
    this.setData({
      slideWidth,
      ratio
    })
  },

  getLeft(e) {
    this.setData({
      marginLeft: e.detail.scrollLeft * this.data.ratio
    })
  },

  getAd() {
    this.setData({
      hasAd: true,
      advert: {
        picUrl: '../../static/images/banner/ad.png',
        linkUrl: ''
      }
    })
  },
  
  tapBanner(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: 'url',
      })
    }
  },
  
  tapScrollCate(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    if (index === this.data.active) return
    this.setData({
      active: index,
      currentCateId: id,
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
    this.selectComponent('#goodsComp').getMore(0)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})