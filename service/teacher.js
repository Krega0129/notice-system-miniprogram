import request from './network'

import {
  config
} from './config'

export function addAddress(data) {
  return request({
    url: config.API_addAddress_URL,
    data,
    // method: 'post'
  })
}

export function getAddressList(data) {
  return request({
    url: config.API_getAddressList_URL,
    data,
  })
}

export function addNotice(data) {
  return request({
    url: config.API_addNotice_URL,
    data: data.buffer,
    method: 'post',
    header: {
      'content-type': data.contentType
    }
  })
}

export function getNotice(data) {
  return request({
    url: config.API_getNotice_URL,
    data
  })
}

export function getNoticeById(data) {
  return request({
    url: config.API_getNoticeById_URL,
    data
  })
}