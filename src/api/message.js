import request from '../utils/request'

const getMessageList = (page) => {
  return request({
    url: '/community/message/list',
    method: 'get',
    params: page
  })
}

const queryLetterDetail = (conversationId, page) => {
  return request({
    url: `/community/message/detail/${conversationId}`,
    method: 'get',
    params: page
  })
}

export {getMessageList, queryLetterDetail}
