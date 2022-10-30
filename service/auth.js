import request from './network'

import {
  config
} from './config'

// export function getAllAddress(data) {
//   return request({
//     url: H_config.API_getAllAddress_URL,
//     method: 'post',
//     data: data,
//     header: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }

export function getCampusList() {
  return request({
    url: config.API_getCampusList_URL
  })
}

export function bindInfo(universityId, name, userNo, password, roleId) {
  return request({
    url: config.API_bindInfo_URL,
    data: {
      universityId,
      name,
      userNo,
      password,
      roleId
    },
    // method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: config.API_updatePassword_URL,
    data
  })
}