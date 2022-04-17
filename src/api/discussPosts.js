import request from '../utils/request'

const getDiscussPosts = (page) => {
  return request({
    url: '/community/getDiscussPosts',
    method: 'post',
    data: page
  })
}

const addPost = (post) => {
  return request({
    url: '/community/discuss/add',
    method: 'post',
    data: post
  })
}

const getDiscussPostById = (id, offset, limit) => {
  return request({
    url: `/community/discuss/post/${id}`,
    method: 'get',
    params: {
      offset: offset,
      limit: limit
    }
  })
}

const searchDiscussPost = (keyword, page) => {
  return request({
    url: '/community/search',
    method: 'get',
    params: {
      keyword: keyword,
      currentPage: page.currentPage,
      pageSize: page.pageSize,
      total: page.total
    }
  })
}

export {getDiscussPosts, addPost, getDiscussPostById, searchDiscussPost}
