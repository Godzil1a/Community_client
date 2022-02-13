import request from '../utils/request'

const registerUser = (user) => {
  return request({
    url: '/community/register',
    method: 'post',
    data: user
  })
}

const acvitateUser = (userId, code) => {
  return request({
    url: '/community/activation/' + userId + '/' + code,
    method: 'get'
  })
}

export {registerUser, acvitateUser}
