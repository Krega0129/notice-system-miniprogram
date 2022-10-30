//app.js
import { getUserInfo } from './service/user'
App({
  onLaunch: function () {
    if(!wx.getStorageSync('authorization')){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } else if(!wx.getStorageSync('hasBind')){
      wx.redirectTo({
        url: '/pages/identify/identify',
      })
    } else {
      getUserInfo().then(res => {
        wx.setStorageSync('role', res.data.data.roleId)
        this.globalData.userInfo = res.data.data
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })
  },
  globalData: {
    StatusBar: null,
    userInfo: null,
    Custom: null,
    CustomBar: null,
    token: null
  },
})
