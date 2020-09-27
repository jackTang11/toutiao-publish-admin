
import request from '@/utils/request'

export const getArticles = params => {
    return request({
      method: 'GET',
      url: '/mp/v1_0/articles',
      params
    })
}

export  const  getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
  })
}


export  const  deleteArticle = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`,
  })
}
