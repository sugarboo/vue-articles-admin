/**
 * 素材请求相关模块
 */

import request from '@/utils/request'

/**
 * 上传图片素材
 */
export const uploadImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 使用axios进行文件上传请求时, 不需要把请求头的Content-Type
    // 设置为multipart/form-data, 只需要为data赋值一个FormData对象即可
    data
  })
}

/**
 * 获取素材列表
 */
export const getImages = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

/**
 * 收藏素材
 * @param {*} imageId 待收藏的素材id
 * @param {*} collect 收藏状态
 * @returns
 */
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
