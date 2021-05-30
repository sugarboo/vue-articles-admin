/**
 * 评论模块相关请求
 */

import request from '@/utils/request'

/**
 * 获取评论列表
 */
export const getComments = (page, pageSize) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: {
      response_type: 'comment',
      page,
      per_page: pageSize
    }
  })
}

export const changeCommentStatus = (articleId, commentStatus) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId.toString()
    },
    data: {
      allow_comment: commentStatus
    }
  })
}
