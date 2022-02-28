import request from '../utils/request'

const postLike = (data) => {
  return request({
    url: '/community/like',
    method: 'post',
    data: data
  })
}

export {postLike}
