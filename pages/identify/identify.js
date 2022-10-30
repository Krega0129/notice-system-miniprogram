import {
  showToast
} from '../../utils/util'
import {
  BASE_URL
} from '../../service/config'
import {
  getCampusList,
  bindInfo
} from '../../service/auth'
import { getUserInfo } from '../../service/user'

const app = getApp()

Page({
  data: {
    code: null,
    hasBind: true,
    userInfo: {},
    campus: '',
    name: '',
    userNo: '',
    password: '',
    role: 2,
    campusList: [],
    index: 0,
    array: [],
    isStd: true,
    show: false
  },
  onLoad: function (options) {
    const hasBind = wx.getStorageSync('hasBind')
    const isStd = wx.getStorageSync('role') == 2
    if(!hasBind) {
      getCampusList().then(res => {
        let array = res.data.data.map(n => n.name)
        array.unshift('')
        this.setData({
          campusList: res.data.data,
          array: array
        })
      })
    }
    this.setData({
      hasBind,
      isStd,
      userInfo: app.globalData.userInfo
    }, () => {
      this.setData({
        show: true
      })
    })
  },
  onShow: function () {
    
  },

  changeCampus(e) {
    this.data.campus = e.detail.value
  },

  changeRole(e) {
    this.data.role = e.detail.value
  },

  _bindInfo(e) {
    let arr = ['campus', 'name', 'userNo', 'password', 'role']
    for(let k of arr) {

      if(!this.data[k]) {
        showToast('请填写完整的信息')
        return;
      }
    }

    const { campus, name, userNo, password, role } = this.data
    
    bindInfo(campus, name, userNo, password, role).then(res => {
      console.log(res);
      if(res.data.code === 2001 || res.data.code === 2002) {
        showToast(res.data.message, 3000)
        return;
      }
      wx.setStorageSync('hasBind', true)
      wx.setStorageSync('authorization', res.data.data.token)
      getUserInfo().then(res => {
        console.log(res);
        wx.setStorageSync('role', res.data.data.roleId)
        app.globalData.userInfo = res.data.data
      }).then(() => {
        wx.reLaunch({
          url: '/pages/notice/notice',
        })
      }).catch(err => {
        showToast(err)
        console.log(err);
      })
    }).catch(e => {
      showToast(e)
      console.log(e);
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