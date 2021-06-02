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

/**
 * 修改用户信息
 * @param {*} name
 * @param {*} email
 * @param {*} photo
 * @returns
 */
export const updateUserProfile = (name, email, photo) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data: {
      name,
      email,
      photo
    }
  })
}

export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
