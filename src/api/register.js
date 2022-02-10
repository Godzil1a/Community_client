import request from '../utils/request'

const registerUser = (user) => {
  return request({
    url: '/api/register',
    method: 'post',
    data: user
  })
}

export {registerUser}
