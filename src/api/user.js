import request from '../utils/request'

const uploadHeader = (header) => {
  return request({
    url: '/community/user/uploadHeader',
    method: 'post',
    data: header,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const updatePassword = (data) => {
  return request({
    url: '/community/user/updatePassword',
    method: 'post',
    data: data
  })
}

const getProfile = (userId) => {
  return request({
    url: `/community/user/profile/${userId}`,
    method: 'get'
  })
}

const changeFollowStatus = (data) => {
  return request({
    url: '/community/changeFollowStatus',
    method: 'post',
    data: data
  })
}

const queryFollowee = (userId, page) => {
  return request({
    url: `/community/followee/${userId}`,
    method: 'get',
    params: page
  })
}

const queryFollower = (userId, page) => {
  return request({
    url: `/community/follower/${userId}`,
    method: 'get',
    params: page
  })
}

export {uploadHeader, updatePassword, getProfile, changeFollowStatus, queryFollowee, queryFollower}
