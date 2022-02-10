import request from '../utils/request'

const getDiscussPosts = (page) => {
  return request({
    url: '/api/getDiscussPosts',
    method: 'post',
    data: page
  })
}

export {getDiscussPosts}
