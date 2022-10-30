import { getNotice } from "../../service/teacher"
import {
  BASE_URL
} from '../../service/config'
Page({
  data: {
    toTop:null,
    isTriggered:false,
    hasSubscribed: true,
    TabCur: 0,
    TabName: ["全部", "待开始", "进行中", "已结束"],
    // 状态数组
    statusCode: ['all', 'ready', 'start', 'finished'],
    curList: [],
    pageNum: 1,
    totalPages: 1,
    isTeacher: false,
    showEnd: false,
    add: false,
    statusColor: ['green', 'orange', 'red']
  },

  // 进入详情页
  goToNoticeDetails(e) {
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/noticeDetails/noticeDetails?id=${id}`,
    })
  },
  // 选项卡展示
  tabSelect(e) {
    const index = e.currentTarget.dataset.id
    this.setData({
      TabCur: index,
      pageNum: 1,
      showEnd: false,
      curList: []
    })
    this._getNotice(1)
  },
  async _getNotice(pageNum) {
    const {statusCode, TabCur} = this.data
    getNotice({
      type: statusCode[TabCur],
      pageNum
    }).then(res => {
      const {data, totalPages} = res.data.data
      this.data.curList.push(...data)
      this.setData({
        curList: this.data.curList,
        totalPages: totalPages
      })
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync('role') == 1) {
      this._getNotice(1)
      this.setData({
        isTeacher: true
      })
    } else if(wx.getStorageSync('role') == 2) {
      this._getNotice(1)
      this.setData({
        hasSubscribed: false
      })
    }
    
    wx.createSelectorQuery().select('.scrollTop').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        toTop: res[0].bottom * 2
      })
    })
   },
  onShow() {
    if(this.data.add) {
      this.toRefresh()
      this.setData({
        add: false
      })
      wx.showToast({
        title: '发布成功'
      })
    }
  },
  subScribe() {
    let res = wx.requestSubscribeMessage({
      tmplIds: ['k8KOTBPwSLXLYe6fcz8gLdMycfrtpUtIipVLFA9bLTU'],
      success: (res) => {
        console.log(res);
      }
    })
    console.log(res);
  },
  toRefresh: function () {
    this.setData({
      isTriggered:true,
      showEnd: false,
      pageNum:1
    })
    this.data.curList = []
    this._getNotice(1).then(res => {
      this.setData({
        isTriggered:false
      })
    })
  },
  toLoading() {
    const {pageNum, totalPages} = this.data
    if(pageNum+1 <= totalPages) {
      this._getNotice(pageNum+1)
      this.setData({
        pageNum: pageNum+1
      })
    } else {
      this.setData({
        showEnd: true
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