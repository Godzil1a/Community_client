import request from '../utils/request'

const getMessageList = (page) => {
  return request({
    url: '/community/message/list',
    method: 'get',
    params: page
  })
}

export {getMessageList}
