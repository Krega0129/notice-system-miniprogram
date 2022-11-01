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
    code: null,
    canIUseGetUserProfile: false
  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.login({
      success: (res) => {
        this.setData({
          code: res.code
        })
      }
    })
  },
  getUserInfo(e) {
    if (e.detail.errMsg == "getUserInfo:ok"){
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      this._login({
        code: this.data.code,
        encryptedData: encryptedData,
        iv: iv
      })
    }
  },
  _login(data) {
    login(data).then(res => {
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
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善个人信息',
      success: (e) => {
        if (e.errMsg == "getUserProfile:ok") {
          const avatarUrl = e.userInfo.avatarUrl
          this._login({
            code: this.data.code,
            avatarUrl
          })
        }
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  onShareAppMessage(options) {
    return {
      title: '校园消息推送助手',
      path: '/pages/notice/notice',
      imageUrl: BASE_URL + '/upload/logo.jpg'
    }
  }
})