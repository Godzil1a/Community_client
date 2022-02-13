import request from '../utils/request'

const getDiscussPosts = (page) => {
  return request({
    url: '/community/getDiscussPosts',
    method: 'post',
    data: page
  })
}

export {getDiscussPosts}
