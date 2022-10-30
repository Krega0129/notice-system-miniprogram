import {
  BASE_URL
} from '../../service/config'

import {KEY} from '../../config/config'
import { getNoticeById } from '../../service/teacher'
Page({
  data: {
    notice: {},
    // status: ['待开始', '进行中', '已结束'],
    statusColor: ['green', 'orange', 'red']
  },
  onLoad: function (options) {
    const id = options.id
    
    getNoticeById({
      id
    }).then(res => {
      this.setData({
        notice: res.data.data
      })
    })
  },
  navigateToAddress() {
    const routePlan = requirePlugin('routePlan');
    const referer = 'wxb52101cbf029cabd'
    const endPoint = JSON.stringify(this.data.notice.address)

    wx.navigateTo({
      url: `plugin://routePlan/index?key=${KEY}&referer=${referer}&endPoint=${endPoint}&mode=walking`,
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.notice.images,
      current: e.currentTarget.dataset.url
    });
  },
  onShareAppMessage(options) {
    return {
      title: '校园消息推送助手',
      path: '/pages/notice/notice',
      imageUrl: BASE_URL + '/upload/logo.jpg'
    }
  }
})