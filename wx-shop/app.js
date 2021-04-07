import { checkHasLogined, wxlogin } from './utils/util'
import Goods from './models/goods'

App({
  onLaunch() {
  },
  onShow() {
    checkHasLogined().then(isLogined => {
      if(!isLogined) {
        wxlogin()
      }
    })
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
    this.observer(ctx.data, key, ctx.data[key], function (value) {
      obj[key].call(ctx, value)
    })
    })
  },
 // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  },
  globalData: {
    isLogined: false,
  }
})
