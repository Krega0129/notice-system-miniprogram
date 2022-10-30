import { updatePassword } from "../../service/auth";
import { showToast } from "../../utils/util";
import {
  BASE_URL
} from '../../service/config'
Page({
  data: {
    oldPwd: '',
    newPwd: ''
  },
  onLoad(options) {

  },
  _updatePassword() {
    const {oldPwd, newPwd} = this.data;

    if(!oldPwd || !newPwd) {
      showToast('信息不能为空')
      return;
    }

    if(oldPwd === newPwd) {
      showToast('新密码不能和原密码一致');
      return;
    }

    updatePassword({
      oldPwd,
      newPwd
    }).then(res => {
      if(res.data.code === 2005) {
        return showToast(res.data.message)
      }
      wx.showToast({
        title: '密码修改成功',
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 500)
    }).catch(err => {
      console.log(err);
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