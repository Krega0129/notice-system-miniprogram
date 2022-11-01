// const BASE_URL = 'http://localhost:8888'
const BASE_URL = ''

const config = {}
config.STATECODE_SUCCESS = 200

// 登录
config.API_login_URL = '/login'
config.API_getCampusList_URL = '/getCampusList'
config.API_bindInfo_URL = '/bindInfo'
config.API_getUserInfo_URL = '/getUserInfo'
config.API_getTeacherInfo_URL = '/getTeacherInfo'
config.API_addAddress_URL = '/addAddress'
config.API_getAddressList_URL = '/getAddressList'
config.API_addNotice_URL = '/addNotice'
config.API_getNoticeById_URL = '/getNoticeById'
config.API_getNotice_URL = '/getNotice'
config.API_updatePassword_URL = '/updatePassword'

// 改成对象
export {
  BASE_URL,
  config,
}
