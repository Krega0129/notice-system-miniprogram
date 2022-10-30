import { getUserInfo } from '../../service/user';
import {
  BASE_URL
} from '../../service/config'
import {
  login, showToast
} from '../../utils/util'

const app = getApp()

Page({
  data: {
    code: null
  },
  onLoad: function (options) {
    wx.login({
      success: (res) => {
        this.setData({
          code: res.code
        })
      }
    })
  },
  showLogin(e) {
    if (e.detail.errMsg == "getUserInfo:ok"){
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;

      wx.showLoading({
        title: '正在登录中...',
        icon: 'loading',
        mask: true
      })

      login({
        code: this.data.code,
        encryptedData: encryptedData,
        iv: iv
      }).then(res => {
        const {user, token} = res.data.data
        wx.setStorageSync('authorization', token)
        wx.setStorageSync('hasBind', user.hasBind)
        wx.setStorageSync('userId', user.userId)
        if(user.hasBind) {
          getUserInfo().then(res => {
            wx.setStorageSync('role', res.data.data.roleId)
            app.globalData.userInfo = res.data.data
            wx.reLaunch({
              url: '/pages/notice/notice'
            })
          }).catch(err => {
            console.log(err);
            showToast('获取用户信息失败')
          })
        } else {
          wx.redirectTo({
            url: `/pages/identify/identify?register=${true}`,
          })
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        // wx.hideLoading()
      })
    }
  },
  onShareAppMessage(options) {
    return {
      title: '校园消息推送助手',
      path: '/pages/notice/notice',
      imageUrl: BASE_URL + '/upload/logo.jpg'
    }
  }
})