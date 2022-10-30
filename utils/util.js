import request from '../service/network'
import {
  BASE_URL,
  config
} from '../service/config'

const formatTime = d => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {
    getDate() {
      return [year, month, day].map(formatNumber).join('-')
    },
    getTime() {
      return [hour, minute].map(formatNumber).join(':')
    }
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function login(data) {
  return request({
    url: config.API_login_URL,
    data,
    // method: 'post'
  })
}

export function loadingOn(loadingContent) {
  wx.showLoading({
    title: loadingContent,
  })
}
export function loadingOff() {
  wx.hideLoading({
    success: (res) => { },
  })
}

export function showToast(showMsg, time) {
  wx.showToast({
    title: showMsg,
    icon: 'none',
    duration: time || 1000
  })
}

export function previewImage(urls, index) {
  wx.previewImage({
    urls: urls,
    current: index || urls[0]
  })
}

module.exports = {
  formatTime: formatTime,
  login,
  loadingOn,
  loadingOff,
  showToast,
  previewImage
}
