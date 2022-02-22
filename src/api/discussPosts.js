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

export {getDiscussPosts, addPost, getDiscussPostById}
