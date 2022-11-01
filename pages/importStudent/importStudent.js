import {
  BASE_URL
} from '../../service/config'
Page({
  data: {
    token: ''
  },
  onLoad() {
    const token = wx.getStorageSync('authorization')
    this.setData({
      token: `https://krega.goodboycoder.top/up/?token=${token}`
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