/**
 * 文章内容相关请求模块
 */

import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} params 数据筛选参数
 * @returns
 */
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body参数用data设置, Query参数用params设置, Headers参数用headers设置
    params
  })
}

/**
 * 获取文章频道
 */

export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 * @param {*} articleId 待删除的文章id
 * @returns
 */
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}` // ES6语法, 拼接
  })
}

/**
 * 新增文章
 * @param {*} data 待添加的文章数据
 * @param {*} draft 是否存入草稿, 默认值为false, 即不存入草稿
 * @returns
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

/**
 * 获取指定文章
 * @param {*} articleId 待获取的文章id
 * @returns
 */
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}` // ES6语法, 拼接
  })
}

export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
