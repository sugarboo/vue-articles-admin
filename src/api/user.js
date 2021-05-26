/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

/**
 * 用户登录
 * @returns 变量名request, 对应method和url的axios对象
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data用来设置POST请求体
    data
  })
}

/**
 * 获取用户信息
 * @returns 变量名request, 对应method和url的axios对象
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
