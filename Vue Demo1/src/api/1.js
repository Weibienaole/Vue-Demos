import request from '../utils/request'

export function code () {
  return request({
    url: 'shopping/restaurants/?latitude=39.90469&longitude=116.407173',
    method: 'get',
    data: {}
  })
}
