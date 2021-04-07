import Address from '../../models/address'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userTel: '',
    userAddress: '',
    region: [],
    checked: false,
    isEdit: 0,
    id: ''
    // customItem: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('address', (data) => {
      this.setData({
        userName: data.user_name,
        userTel: data.tel,
        userAddress: data.detail_info,
        region: data.region,
        checked: data.is_default === 1 ? true : false,
        isEdit: data.isEdit,
        id: data.id
      })
    })
  },

  siteDefault(e) {
    this.setData({
      checked: e.detail,
    });
  },

  submit() {
    const { userName, userTel, userAddress, region } = this.data
    if (userName === '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (userTel === '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    } else {
      if(!(/^[1]([3-9])[0-9]{9}$/.test(userTel))){ 
        wx.showToast({
          title: '手机号码有误',
          icon: 'none'
        })
        return
      } 
    }
    if (region.length === 0) {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none'
      })
      return
    }
    if (userAddress === '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
      return
    }
    let params = {
      userName,
      userTel,
      userAddress,
      region,
      checked: this.data.checked,
      token: wx.getStorageSync('token')
    }
    if (this.data.isEdit === 1) {
      Object.assign(params, {id: this.data.id})
      Address.editAddress(params).then(res => {
        if (res.code === 200) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    } else {
      Address.createAddress(params).then(res => {
        if (res.code === 200) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },

  onChangeName(event) {
    this.setData({
      userName: event.detail
    })
  },

  onChangeTel(event) {
    this.setData({
      userTel: event.detail
    })
  },

  onChangeAddress(event) {
    this.setData({
      userAddress: event.detail
    })
  },

  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
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