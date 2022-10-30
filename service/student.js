import request from './network'

import {
  config
} from './config'

export function getTeacherInfo() {
  return request({
    url: config.API_getTeacherInfo_URL
  })
}

