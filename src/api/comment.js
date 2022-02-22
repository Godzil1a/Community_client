import request from '../utils/request'

const insertComment = (comment) => {
  return request({
    url: '/community/comment/add',
    method: 'post',
    data: comment
  })
}

export {insertComment}
