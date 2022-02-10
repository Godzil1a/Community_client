import request from '../utils/request'

const registerUser = (user) => {
  return request({
    url: '/api/register',
    method: 'post',
    data: user
  })
}

const acvitateUser = (userId, code) => {
  return request({
    url: '/api/activation/' + userId + '/' + code,
    method: 'get'
  })
}

export {registerUser, acvitateUser}
