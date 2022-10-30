// pages/map/map.js
const QQMaxWX = require('../../lib/qqmap-wx-jssdk')
let qqmapsdk
import { KEY } from '../../config/config'

const chooseLocation = requirePlugin('chooseLocation')
Page({
  data: {
    key: KEY,
    address: {
      latitude: 23,
      longitude: 114,
      name: '111'
    },
    polyline: [],
    markers: [],
    route: [],
    currentRoute: {}
	},
	onLoad: async function () {
		qqmapsdk = new QQMaxWX({
      key: KEY
    })

    this.mapCtx = wx.createMapContext('map', this)




    const routePlan = requirePlugin('routePlan');
    const referer = 'wxb52101cbf029cabd'
    const endPoint = JSON.stringify(this.data.address)
    console.log(KEY);

    wx.navigateTo({
      url: `plugin://routePlan/index?key=${KEY}&referer=${referer}&endPoint=${endPoint}`,
    })


  },
  onShow() {
    const location = chooseLocation.getLocation()
  }
})