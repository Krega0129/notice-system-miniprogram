import { KEY } from '../../config/config'
import { addAddress, getAddressList } from '../../service/teacher'
import { showToast } from '../../utils/util'
import {
  BASE_URL
} from '../../service/config'
const chooseLocation = requirePlugin('chooseLocation')
Page({
  data: {
    toBottom: 260,
    triggered: false,
    currentPage: 1,
    addressList: [],
    totalPages: 1,
    showEnd: false,
    showBackTop: false,
  },
  async onLoad(options) {
    wx.createSelectorQuery().select('.top').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        toBottom: res[0].bottom * 2
      })
    })
    // 获取第一页
    this._getAddressList(1)
  },
  onShow() {
    let location = chooseLocation.getLocation()
    
    if(location) {
      const { name, latitude, longitude } = location
      addAddress({
        name,
        latitude,
        longitude
      }).then(res => {
        if(res.data.code == 2003) {
          showToast(res.data.message)
        }
        this.onRefresh()
        wx.showToast({
          title: '地址添加成功',
        })
      })
    }
  },
  _getAddressList(pageNum) {
    if(pageNum <= this.data.totalPages) {
      getAddressList({
        pageNum
      }).then(res => {
        const {data, totalPages} = res.data.data
        this.data.addressList.push(...data)
        this.setData({
          totalPages,
          addressList: this.data.addressList
        })
      })
    } else {
      this.setData({
        showEnd: true
      })
    }
  },
  toAddAdderss() {
    wx.getLocation({
      success: res => {
        const {latitude, longitude} = res
        const location = JSON.stringify({
          latitude,
          longitude
        })
        const referer = '校园消息推送助手'

        wx.navigateTo({
          url: `plugin://chooseLocation/index?key=${KEY}&referer=${referer}&location=${location}`,
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  scrollToLower() {
    if(this.data.currentPage < this.data.totalPages) {
      this._getAddressList(++this.data.currentPage)
    } else {
      this.setData({
        showEnd: true
      })
    }
  },
  onRefresh() {
    this.data.addressList = []
    this.setData({
      triggered: true,
      currentPage: 1,
      showEnd: false
    })
    this.onLoad().then(() => {
      this.setData({
        triggered: false
      })
    })
  },
  onReachBottom() {
    this.scrollToLower()
  },
  onShareAppMessage(options) {
    return {
      title: '校园消息推送助手',
      path: '/pages/notice/notice',
      imageUrl: BASE_URL + '/upload/logo.jpg'
    }
  }
})