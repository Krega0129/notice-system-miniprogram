import {
  BASE_URL
} from '../../service/config'
import { getTeacherInfo } from '../../service/student';
Page({
  data: {
    hasBind: true,
    teacherInfo: {}
  },
  onLoad: function (options) {
    const hasBind = wx.getStorageSync('hasBind')
    getTeacherInfo().then(res => {
      const teacherInfo = res.data.data
      console.log(teacherInfo);
      this.setData({
        hasBind,
        teacherInfo
      })
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