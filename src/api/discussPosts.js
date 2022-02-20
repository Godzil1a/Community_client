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

export {getDiscussPosts, addPost}
