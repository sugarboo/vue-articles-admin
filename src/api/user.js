/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data用来设置POST请求体
    data
  })
}
