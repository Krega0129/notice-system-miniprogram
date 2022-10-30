import {
  BASE_URL
} from '../../service/config'
const app = getApp()
Page({
  data: {
    userInfo: {},
    stdOptList: [
      {
        name: "个人信息", 
        route: '/pages/identify/identify',
        icon: 'messagefill',
        color: 'blue'
      },
      {
        name: "修改密码", 
        route: '/pages/updatePassword/updatePassword',
        icon: 'edit',
        color: 'orange'
      },
      {
        name: "关联教师", 
        route: '/pages/teacherInfo/teacherInfo',
        icon: 'messagefill',
        color: 'blue'
      }
    ],
    teaOptList: [
      {
        name: "个人信息", 
        route: '/pages/identify/identify',
        icon: 'messagefill',
        color: 'blue'
      },
      {
        name: "修改密码", 
        route: '/pages/updatePassword/updatePassword',
        icon: 'edit',
        color: 'orange'
      },
      {
        name: "导入学生信息", 
        route: '/pages/importStudent/importStudent',
        icon: 'profilefill',
        color: 'blue'
      },
      {
        name: "创建活动地点", 
        route: '/pages/manageAddress/manageAddress',
        icon: 'locationfill',
        color: 'red'
      }
    ],
    curOptList: []
  },
  toIdentify() {
    wx.navigateTo({
      url: '/pages/identify/identify',
    })
  },
  getTeacherInfo(){
    wx.navigateTo({
      url: '/pages/teacherInfo/teacherInfo',
    })
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      curOptList: wx.getStorageSync('role') == 1 ? this.data.teaOptList : this.data.stdOptList
    })
    console.log(this.data.userInfo);
  },
  onShareAppMessage(options) {
    return {
      title: '校园消息推送助手',
      path: '/pages/notice/notice',
      imageUrl: BASE_URL + '/upload/logo.jpg'
    }
  }
})