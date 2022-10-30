import { addNotice, getAddressList } from '../../service/teacher'
const FormData = require('../../utils/formData')
import {
  showToast
} from '../../utils/util'
import {
  BASE_URL
} from '../../service/config'
Page({
  data: {
    num: 0,
    name: '',
    content: '',
    imgList: [],
    addressList: [{name: ''}],
    // 地点索引
    idx: 0,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    colorList: ['orange', "blue", "red"],
    curColor: ['orange', 'grey', 'grey'],
    tags: ['通知'],
  },
  onLoad(options) {
    getAddressList().then(res => {
      const {data} = res.data
      this.data.addressList.push(...data)
      this.setData({
        addressList: this.data.addressList
      })
    })
  },
  onUnload() {

  },
  inputContent(e) {
    let val = e.detail.value
    this.setData({
      content: val,
      num: val.length
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '注意',
      content: '确定要删除这个照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  DateChange(e) {
    const {detail, target} = e
    if(target.dataset.flag == 'start') {
      this.setData({
        startDate: detail.value
      })
    } else {
      this.setData({
        endDate: detail.value
      })
    }
  },
  TimeChange(e) {
    const {detail, target} = e
    if(target.dataset.flag == 'start') {
      this.setData({
        startTime: detail.value
      })
    } else {
      this.setData({
        endTime: detail.value
      })
    }
  },
  chooseTag(e) {
    const {idx, tag} = e.target.dataset
    const {curColor, colorList, tags} = this.data

    if(curColor[idx] == 'grey') {
      curColor[idx] = colorList[idx];
      tags.push(tag)
    } else {
      if(tags.length === 1) {
        showToast('至少要选择一个')
        return;
      }

      curColor[idx] = 'grey';
      let i = tags.indexOf(tag);
      tags.splice(i, 1);
    }

    this.setData({
      curColor,
      tags
    })
  },
  toFormData(data) {
    if (data === null) return null;
    return Object.keys(data).reduce((formData, item) => {
      if (item === 'imgList') { //特殊判断如果内容为files数组，就让里面值不用走JSON.stringify
        data[item] &&
          data[item].forEach((curr) => {
            formData.appendFile('file', curr, curr);
          });
      } else {
        formData.append(item, JSON.stringify(data[item]));
      }
      return formData;
    }, new FormData());
  },
  releaseNotice() {
    const {name, content, imgList, addressList, idx, startDate, startTime, endDate, endTime, tags} = this.data
    const data = {
      name,
      content,
      imgList,
      addressId: addressList[idx]?.id,
      startTime: `${startDate} ${startTime}`,
      endTime: `${endDate} ${endTime}`,
      tags: tags.join(',')
    }

    if([name, content].some(n => n == '')) {
      showToast('标题与内容不能为空');
      return;
    }

    const formdata = this.toFormData(data);

    addNotice(formdata.getData()).then(res => {
      if(res.data.code == 200) {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        prevPage.setData({
          add: true
        })
        wx.navigateBack()
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