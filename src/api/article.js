/**
 * 文章内容相关请求模块
 */

import request from '@/utils/request'

/**
 * 获取文章列表
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
 */
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}` // ES6语法, 拼接
  })
}
