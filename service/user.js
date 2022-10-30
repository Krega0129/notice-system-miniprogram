import request from './network'

import {
  config
} from './config'

export function getUserInfo() {
  return request({
    url: config.API_getUserInfo_URL
  })
}