import request from '../utils/request'

const getDiscussPosts = (page, queryMode) => {
  return request({
    url: '/community/getDiscussPosts',
    method: 'get',
    params: {
      currentPage: page.currentPage,
      pageSize: page.pageSize,
      total: page.total,
      queryMode: queryMode
    }
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

const setType = (data) => {
  return request({
    url: '/community/discuss/setType',
    method: 'post',
    data: data
  })
}

const setStatus = (data) => {
  return request({
    url: '/community/discuss/setStatus',
    method: 'post',
    data: data
  })
}

export {getDiscussPosts, addPost, getDiscussPostById, searchDiscussPost, setType, setStatus}
