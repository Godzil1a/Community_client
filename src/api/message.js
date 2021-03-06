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

const insertMessage = (message) => {
  return request({
    url: '/community/message/send',
    method: 'post',
    data: message
  })
}

const queryNoticeList = () => {
  return request({
    url: '/community/message/notice/list',
    method: 'get'
  })
}

const queryNoticeDetail = (topic, page) => {
  return request({
    url: `/community/message/notice/detail/${topic}`,
    method: 'get',
    params: page
  })
}

const queryUnreadCnt = (userId) => {
  return request({
    url: '/community/message/unreadCnt',
    method: 'get',
    params: {userId: userId}
  })
}

export {getMessageList, queryLetterDetail, insertMessage, queryNoticeList, queryNoticeDetail, queryUnreadCnt}
